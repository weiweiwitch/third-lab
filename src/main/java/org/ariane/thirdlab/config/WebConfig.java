package org.ariane.thirdlab.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "org.ariane.thirdlab.controller")
public class WebConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/ap/**").addResourceLocations("/app/", "/.tmp/").setCachePeriod(0);
		registry.addResourceHandler("/p/**").addResourceLocations("/dist/").setCachePeriod(0);
		registry.addResourceHandler("/bower_components/**").addResourceLocations("/bower_components/")
				.setCachePeriod(0);
	}

}
