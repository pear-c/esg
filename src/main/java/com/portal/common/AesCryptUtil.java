package com.portal.common;

import java.security.spec.*;
import java.util.*;

import javax.crypto.*;
import javax.crypto.spec.*;
//import org.apache.commons.codec.binary.Base64;
//import org.apache.commons.codec.binary.Hex; 
public class AesCryptUtil 
{ 
	public static final String ENC_KEY = "e534cf179007db7e6360ebf95fa5d51c"; 
	public static final String salt = "deafa8b6802cebcc0bcceaaa5f3461a9";
	public static final String iv = "e9d3712c4d5c35093d340733b8c26b92";
	public static String decrypt(String data) 
	{ 
		try 
		{ 
			return decrypt(salt, iv, ENC_KEY, data, 1000, 128); 
			} 
		catch(Exception e) 
		{ return data; 
		} 
	} 
	private static String decrypt(String salt, String iv, String passphrase, String ciphertext, int iterationCount, int keySize) throws Exception 
	{ 
		SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1"); 
		KeySpec spec = new PBEKeySpec(passphrase.toCharArray(), hexStringToByteArray(salt), iterationCount, keySize); 
		SecretKey key = new SecretKeySpec(factory.generateSecret(spec).getEncoded(), "AES"); 
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding"); 
		cipher.init(Cipher.DECRYPT_MODE, key, new IvParameterSpec(hexStringToByteArray(iv))); 
		byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(ciphertext)); 
		return new String(decrypted, "UTF-8"); 
	} 
	public static String encrypt(String data) 
	{ 
		try 
		{ 
			return encrypt(salt, iv, ENC_KEY, data, 1000, 128); 
		} catch(Exception e) { return data; }
	}
	private static String encrypt(String salt, String iv, String passphrase, String ciphertext, int iterationCount, int keySize) throws Exception 
	{ 
		SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1"); 
		KeySpec spec = new PBEKeySpec(passphrase.toCharArray(), hexStringToByteArray(salt), iterationCount, keySize); 
		SecretKey key = new SecretKeySpec(factory.generateSecret(spec).getEncoded(), "AES"); 
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding"); 
		cipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(hexStringToByteArray(iv)));
		byte[] encrypted = cipher.doFinal(ciphertext.getBytes("UTF-8")); 
		return new String(Base64.getEncoder().encode(encrypted)); 
	}
	public static byte[] hexStringToByteArray(String s) {
	    int len = s.length();
	    byte[] data = new byte[len / 2];
	    for (int i = 0; i < len; i += 2) {
	        data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
	                             + Character.digit(s.charAt(i+1), 16));
	    }
	    return data;
	}
}

