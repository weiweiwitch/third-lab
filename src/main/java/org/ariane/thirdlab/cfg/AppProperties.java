package org.ariane.thirdlab.cfg;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="thirdlab")
public class AppProperties {

	private int port;

	private String hibernateDialect;

	private int hibernateAutohbm2ddl;

	private String jdbcUrl;

	private String jdbcUsername;
	private String jdbcPassword;


	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getHibernateDialect() {
		return hibernateDialect;
	}

	public void setHibernateDialect(String hibernateDialect) {
		this.hibernateDialect = hibernateDialect;
	}

	public int getHibernateAutohbm2ddl() {
		return hibernateAutohbm2ddl;
	}

	public void setHibernateAutohbm2ddl(int hibernateAutohbm2ddl) {
		this.hibernateAutohbm2ddl = hibernateAutohbm2ddl;
	}

	public String getJdbcUrl() {
		return jdbcUrl;
	}

	public void setJdbcUrl(String jdbcUrl) {
		this.jdbcUrl = jdbcUrl;
	}

	public String getJdbcUsername() {
		return jdbcUsername;
	}

	public void setJdbcUsername(String jdbcUsername) {
		this.jdbcUsername = jdbcUsername;
	}

	public String getJdbcPassword() {
		return jdbcPassword;
	}

	public void setJdbcPassword(String jdbcPassword) {
		this.jdbcPassword = jdbcPassword;
	}
}
