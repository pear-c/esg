package com.portal.common;
/*
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import java.net.InetAddress;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
*/
public class security {
	/*
	private static String key = "jwhongsecurity12";

	private static String pernr;

	public static String decrypt(String input) {
		byte[] output = null;
		try {
			InetAddress local = InetAddress.getLocalHost();
			String ip = local.getHostAddress();
			long checkTime = System.currentTimeMillis() / 1000L;
			SecretKeySpec skey = new SecretKeySpec(key.getBytes(), "AES");
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
			cipher.init(2, skey);
			output = cipher.doFinal(Base64.decode(input));
			String[] arrVal = (new String(output)).split("[||]");
			if (!ip.equals(arrVal[0]))
				return "ipDiff";
			long startTime = Long.parseLong(arrVal[1]);
			long times = checkTime - startTime;
			if (times >= 480L)
				return "timeOut";
			pernr = arrVal[2];
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		return pernr;
	}
	*/
}