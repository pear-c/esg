package com.portal.test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

public class DBTest {
	public static void main(String[] args) {
		String sql = "";
		Connection conn;
		PreparedStatement ps;
		
		try {
			sql = "SELECT	\r\n"
					+ "				A.ESG_DOMAIN\r\n"
					+ "		,		FN_CODE_NAME('ESG_DOMAIN', A.ESG_DOMAIN) ESG_DOMAIN_NAME\r\n"
					+ "		,		A.ESG_CTGRY \r\n"
					+ "		,		FN_CODE_NAME('ESG_CTGRY', A.ESG_CTGRY) ESG_CTGRY_NAME\r\n"
					+ "		,		A.ESG_CLASSIFICATION_NO \r\n"
					+ "		,		A.DAGNSS_ITM \r\n"
					+ "		,		A.DAGNSS_ITM_DESC\r\n"
					+ "		,		A.BASIC_ADVANCE \r\n"
					+ "		,		FN_CODE_NAME('BASIC_ADVANCE', A.BASIC_ADVANCE) BASIC_ADVANCE_NAME\r\n"
					+ "		,		A.APLCN_METHOD \r\n"
					+ "		,		FN_CODE_NAME('APLCN_METHOD', A.APLCN_METHOD) APLCN_METHOD_NAME\r\n"
					+ "		,		A.IS_ATTACH_FILES \r\n"
					+ "		,		A.USE_YN \r\n"
					+ "		,		A.SORT_NO\r\n"
					+ "		FROM 	ESG_DAGNSS_ITM A ";
			conn = DBConn.getConnection();
			ps = conn.prepareStatement(sql);
			
			ResultSet rs = ps.executeQuery();
			ResultSetMetaData rsmd = rs.getMetaData();
			
			int colCnt = rsmd.getColumnCount();
//			System.out.println("colCnt => " + colCnt);
			
			String colNm, colType, colLabel, colAlign;
			int colSize;
			String result = "";
			String[] arrColAlign = {"left", "center", "right"};
			
			for (int i = 0; i < colCnt; i++) {
				colNm = rsmd.getColumnName(i+1).toUpperCase();
				colType = rsmd.getColumnTypeName(i+1);
				colSize = rsmd.getColumnDisplaySize(i+1);
				colLabel = rsmd.getColumnLabel(i+1);
				colAlign = colType.contains("varchar") ? arrColAlign[0] : arrColAlign[2];
//				System.out.println("colNm => " + colNm + ", colType => " + colType + ", colSize => " + String.valueOf(colSize) + ", label => " + colLabel);
				result += "{key: \"" + colNm + "\", label: \"" + colNm + "\", width:100, align:\"" + colAlign + "\"}," + "\r\n";
			}
			
			System.out.println(result);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
