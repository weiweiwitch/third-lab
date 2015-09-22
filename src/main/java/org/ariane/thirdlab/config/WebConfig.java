package org.ariane.thirdlab.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "org.ariane.thirdlab.controller")
public class WebConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/ap/**").addResourceLocations("/.tmp/serve/", "/app/").setCachePeriod(0);
		registry.addResourceHandler("/p/**").addResourceLocations("/dist/").setCachePeriod(0);
		registry.addResourceHandler("/bower_components/**").addResourceLocations("/bower_components/")
				.setCachePeriod(0);

		// registry.addResourceHandler("/**").addResourceLocations("/").setCachePeriod(0);
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		CheckInterceptors checkInterceptors = new CheckInterceptors();
		registry.addInterceptor(checkInterceptors);
	}

	// @Bean
	// public MultipartResolver multipartResolver() {
	// org.springframework.web.multipart.commons.CommonsMultipartResolver
	// multipartResolver = new
	// org.springframework.web.multipart.commons.CommonsMultipartResolver();
	// multipartResolver.setMaxUploadSize(1000000);
	// return multipartResolver;
	// }

	@Bean
	public StandardServletMultipartResolver multipartResolver() {
		StandardServletMultipartResolver standardServletMultipartResolver = new StandardServletMultipartResolver();
		return standardServletMultipartResolver;
	}
}
