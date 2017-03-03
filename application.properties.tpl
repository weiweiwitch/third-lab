server.port=8080
spring.resources.staticLocations=classpath:/react/static/dist/

server.tomcat.basedir=accesslog
server.tomcat.accesslog.enabled=true
server.tomcat.accesslog.pattern=%t %a "%r" %s (%D ms)

thirdlab.hibernateDialect=org.hibernate.dialect.MySQL5InnoDBDialect
thirdlab.hibernateAutohbm2ddl=0

thirdlab.jdbcUrl=jdbc:mysql://127.0.0.1:3306/thirdlab?useUnicode=true&characterEncoding=utf8
thirdlab.jdbcUsername=root
thirdlab.jdbcPassword=