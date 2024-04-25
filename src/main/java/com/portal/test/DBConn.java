package com.portal.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConn {
	// DB관련 jar 파일을 build하여 import 시킨 다음
	//		DB와 연결해야 한다ㅣ. 
	//		connection 관련 객체를 담는 static 변수를 private로 담는다. 
	private static Connection conn;
	//		해당 변수를 실행 시 dbconnection이 되도록 한다.
	public static Connection getConnection() {
		if(conn == null) {
			//	conn 객체에 접근하지 않는 경우 아래의 코드를 실행한다.
			try {
				// 데이터베이스에 접근하는 드라이브를 실행
				Class.forName("org.postgresql.Driver");
//				System.out.println("드라이버 로딩성공!");
				
				String url = "jdbc:postgresql://114.108.146.153:64302/esg";
				String user = "esg";
				String password = "Rz3z8FS4W3UL7ty8";
				// 드라이브메니저의 내장메소드를 이용해 우리가 사용할 dbms정보를 넘겨주고 있다.
				conn = DriverManager.getConnection(url, user, password);
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}catch(SQLException sqle) {
					System.out.println("실패");
			}
		}
		return conn;
	}
}
