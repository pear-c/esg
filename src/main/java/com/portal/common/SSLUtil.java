package com.portal.common;

import javax.net.ssl.*;
import java.security.*;
import java.security.cert.X509Certificate;

public final class SSLUtil{
	
	private static final TrustManager[] UNQUESTIONING_TRUST_MANAGER = new TrustManager[] {
			new X509TrustManager() {
				public java.security.cert.X509Certificate[] getAcceptedIssuers(){
					return null;
				}
			public void checkClientTrusted(X509Certificate[] certs, String authType) {}
			public void checkServerTrusted(X509Certificate[] certs, String authType) {}
		}
	};
	
	public static void turnOffSslChecking() throws NoSuchAlgorithmException, KeyManagementException{
		final SSLContext sc = SSLContext.getInstance("SSL");
		sc.init(null, UNQUESTIONING_TRUST_MANAGER, null);
		HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
	}
	public static void urnOnSslChecking() throws KeyManagementException, NoSuchAlgorithmException{
		SSLContext.getInstance("SSL").init(null, null, null);
	}
	private SSLUtil() {
		throw new UnsupportedOperationException("Do not instantiate libraries.");
	}
	
	// ssl security Exception 방지
	public static void disableSslVerification(){
		// TODO Auto-generated method stub
		try
	    {
	        // Create a trust manager that does not validate certificate chains
	        TrustManager[] trustAllCerts = new TrustManager[] {new X509TrustManager() {
	            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
	                return null;
	            }
	            public void checkClientTrusted(X509Certificate[] certs, String authType){
	            }
	            public void checkServerTrusted(X509Certificate[] certs, String authType){
	            }
	        }
	        };
	
	        // Install the all-trusting trust manager
	        SSLContext sc = SSLContext.getInstance("SSL");
	        sc.init(null, trustAllCerts, new java.security.SecureRandom());
	        HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
	
	        // Create all-trusting host name verifier
	        HostnameVerifier allHostsValid = new HostnameVerifier() {
	            public boolean verify(String hostname, SSLSession session){
	                return true;
	            }
	        };
	
	        // Install the all-trusting host verifier
	        HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
	    } catch (NoSuchAlgorithmException e) {
	        e.printStackTrace();
	    } catch (KeyManagementException e) {
	        e.printStackTrace();
	    }
	}
}
