package estg.publictransportmonitoring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy(proxyTargetClass=true)
public class PublicTransportMonitoringApplication {

	public static void main(String[] args) {
		SpringApplication.run(PublicTransportMonitoringApplication.class, args);
	}

}
