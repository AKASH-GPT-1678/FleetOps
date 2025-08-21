package com.gupta.fleetops;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@SpringBootApplication
public class FleetopsApplication {

	public static void main(String[] args) {
		SpringApplication.run(FleetopsApplication.class, args);
	}

}
