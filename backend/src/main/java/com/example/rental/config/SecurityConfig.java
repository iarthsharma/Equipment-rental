package com.example.rental.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Disable CSRF for APIs; enable if using with browser clients
            .authorizeHttpRequests()
                .requestMatchers("/api/catalog/equipment/**").permitAll() // Allow public access to view equipment
                .requestMatchers("/api/catalog/equipment", "/api/catalog/equipment/*")
                    .hasRole("ADMIN") // Restrict add, update, delete to admins
                .requestMatchers("/api/booking/**").authenticated() // Authenticated users can book
                .requestMatchers("/api/admin/**").hasRole("ADMIN") // Admin endpoints
                .anyRequest().authenticated()
            .and()
            .httpBasic(); // For demo; replace with JWT or OAuth2 in production
        return http.build();
    }
}
