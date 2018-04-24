spring.datasource.url=jdbc:mysql://192.168.11.160/thirdlab?useUnicode=true&characterEncoding=utf8
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.jdbc.Driver

# 是否显示sql语句
spring.jpa.show-sql=true

spring.jpa.open-in-view=false

# 可选的值有：create、create-drop、update、validate、none
spring.jpa.hibernate.ddl-auto=none
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL57Dialect

# 修改默认页面位置
spring.resources.static-locations=classpath:/react/static/dist/