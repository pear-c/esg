package com.portal.common;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

public class DateUtil {

	public static String DateToString(Date date, String format) {

		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
		String DateStr = simpleDateFormat.format(date);
		return DateStr;
	}

	//포탈 전용 시간 비교
	// startDate == endDate -> 0
	// startDate > endDate -> 1
	// startDate < endDate -> -1
	public static int  dateCompareTo(String startDate, String endDate) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");

		Date today = Date.from(Instant.parse(startDate));

		Date end = Date.from(Instant.parse(endDate));

		return today.compareTo(end);
	}

	// 년도를 념겨받아 윤년/ 편년을 판단해 윤년이면 true , 평년이면 false를 리턴
	public static boolean isLeapYear(int year) {
		return (year % 4 ==0) && (year % 100 !=0) || (year % 400 == 0);
	}

	// 년, 월을 념겨받아 그 달의 마지막 날짜를 리턴
	public static int lastDay(int year, int month) {
		int[] m = {31,28,31,30,31,30,31,31,30,31,30,31};
		m[1] = isLeapYear(year) ? 29:28;
		return m[month-1];
	}

	// 년, 월, 일을 념겨받아 1년 1월 1일부터 지나온 날짜의 함계를 리턴
	public static int totalDay(int year, int month, int day) {
		int sum = (year-1) * 365 + (year-1)/4 - (year-1)/100 + (year-1)/400;
		for(int i=1;i<month;i++) {
			sum += lastDay(year,i);
		}
		return sum + day;
	}

	// 년, 월, 일을 념겨받아 요일을 숫자로 리턴
	// 일요일(0), 월요일(1)....토요일(6)
	public static int weekDay(int year, int month, int day) {
		return totalDay(year,month,day) % 7;
	}

	public static String DateFormat(Object date) {
		String result = "";

		if(date != null) {

			try{

	            if(date instanceof String) {

	            	//현재 날짜의 타입
	            	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
	            	//Date로 파싱
	            	Date birth = dateFormat.parse((String)date);
	            	//변경할 타입으로의 형 변환
	            	result = new SimpleDateFormat("yyyy-MM-dd").format(birth);

	            }
	        }catch (Exception e){
	           	e.printStackTrace();
	        }
		}

		return result;
	}
}
