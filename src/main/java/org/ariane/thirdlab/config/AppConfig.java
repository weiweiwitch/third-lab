package org.ariane.thirdlab.config;

import java.util.Properties;

import org.ariane.thirdlab.dao.PostDao;
import org.ariane.thirdlab.dao.impl.PostDaoImpl;
import org.ariane.thirdlab.service.PostService;
import org.ariane.thirdlab.service.impl.PostServiceImpl;
import org.hibernate.SessionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBuilder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.alibaba.druid.pool.DruidDataSource;

@Configuration
@ComponentScan
@EnableTransactionManagement
public class AppConfig {

	@Bean(initMethod = "init", destroyMethod = "close")
	public DruidDataSource getDataSource() {
		DruidDataSource dataSource = new DruidDataSource();
		dataSource.setUrl("jdbc:mysql://localhost:3306/thirdlab");
		dataSource.setUsername("thirdlab");
		dataSource.setPassword("123456");
		dataSource.setInitialSize(1);
		dataSource.setMaxActive(20);

		return dataSource;
	}

	@Bean
	public SessionFactory getSessionFactory() {
		LocalSessionFactoryBuilder localSessionFactoryBuilder = new LocalSessionFactoryBuilder(getDataSource());
		localSessionFactoryBuilder.scanPackages("org.ariane.thirdlab.domain");

		Properties properties = new Properties();
//		properties.put("hibernate.hbm2ddl.auto", "create");
		properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
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

	@Bean
	public PostDao getPostDao() {
		PostDaoImpl postDaoImpl = new PostDaoImpl();
		postDaoImpl.setSessionFactory(getSessionFactory());
		return postDaoImpl;
	}

	@Bean
	public PostService getPostService() {
		PostServiceImpl postServiceImpl = new PostServiceImpl();
		postServiceImpl.setPostDao(getPostDao());
		return postServiceImpl;
	}
	
}
