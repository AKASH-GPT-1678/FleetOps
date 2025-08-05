package com.gupta.fleetops.config;


import com.gupta.fleetops.filter.JwtAuthFilter;
import com.gupta.fleetops.service.JwtService;
import com.gupta.fleetops.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter, @Lazy UserDetailsService userDetailsService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
    }





    @Bean
 public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity)  throws  Exception{
     httpSecurity
             .cors()
             .and()
             .csrf(csrf -> csrf.disable())

             .authorizeHttpRequests(auth -> auth
                     .requestMatchers("/kafka/**", "/auth/**" , "/origin/**" ,"/kafka/**").permitAll()
                     .requestMatchers("/vehicle/**" , "origin/add", "/kafka/**", "delivery/*").authenticated()

                     // Role-based endpoints
                     .requestMatchers("/auth/user/**").hasAuthority("ROLE_DRIVER")
                     .requestMatchers("/auth/admin/**").hasAuthority("ROLE_ADMIN")



                     .anyRequest().authenticated()
             )
             .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
             .authenticationProvider(authenticationProvider())
             .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

     return httpSecurity.build();




 }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
