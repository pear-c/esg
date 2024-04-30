package com.portal.common;

import org.apache.commons.collections.map.ListOrderedMap;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.support.JdbcUtils;
import org.springmodules.validation.valang.functions.LowerCaseFunction;



public class ParamMap extends ListOrderedMap{

	private static final long serialVersionUID = 1L;

	public Object put(Object key, Object value) {
		return super.put((Object)StringUtils.upperCase((String) key), value);
	}
}
