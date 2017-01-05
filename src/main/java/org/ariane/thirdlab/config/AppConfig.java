package org.ariane.thirdlab.config;

import java.util.Properties;

import org.ariane.thirdlab.cfg.AppProperties;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBuilder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.alibaba.druid.pool.DruidDataSource;

@Configuration
@ComponentScan(basePackages = "org.ariane.thirdlab.cfg,org.ariane.thirdlab.controller,org.ariane.thirdlab.service,org.ariane.thirdlab.dao")
@EnableTransactionManagement
public class AppConfig {

	@Autowired
	private AppProperties appProperties;

	@Bean(initMethod = "init", destroyMethod = "close")
	public DruidDataSource getDataSource() {
		DruidDataSource dataSource = new DruidDataSource();
		dataSource.setUrl(appProperties.getJdbcUrl());
		dataSource.setUsername(appProperties.getJdbcUsername());
		dataSource.setPassword(appProperties.getJdbcPassword());
		dataSource.setInitialSize(1);
		dataSource.setMaxActive(20);

		return dataSource;
	}

	@Bean
	public SessionFactory getSessionFactory() {
		LocalSessionFactoryBuilder localSessionFactoryBuilder = new LocalSessionFactoryBuilder(getDataSource());
		localSessionFactoryBuilder.scanPackages("org.ariane.thirdlab.domain");

		Properties properties = new Properties();
		Integer autoDdl = appProperties.getHibernateAutohbm2ddl();
		if (autoDdl != 0) {
			System.out.println("autoDbl=" + autoDdl);
			properties.put("hibernate.hbm2ddl.auto", "create");
		}
		properties.put("hibernate.dialect", appProperties.getHibernateDialect());
		properties.put("hibernate.show_sql", true);
		properties.put("hibernate.format_sql", false);
		properties.put("hibernate.use_sql_comments", false);
		properties.put("hibernate.cache.use_second_level_cache", false);

		localSessionFactoryBuilder.addProperties(properties);
		return localSessionFactoryBuilder.buildSessionFactory();
	}

	@Bean
	public HibernateTransactionManager getTransactionManager() {
		HibernateTransactionManager hibernateTransactionManager = new HibernateTransactionManager();
		SessionFactory ss = getSessionFactory();
		hibernateTransactionManager.setSessionFactory(ss);
		return hibernateTransactionManager;
	}

}
