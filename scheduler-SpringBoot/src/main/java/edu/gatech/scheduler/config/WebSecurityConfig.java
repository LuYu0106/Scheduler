package edu.gatech.scheduler.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import edu.gatech.scheduler.service.ImplUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.BeanIds;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;

@Configuration
@EnableWebSecurity
// We need to do authentication.
// WebSecurityConfigurerAdapter is an interface and it gives default web security configurations.
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private ImplAuthenticationEntryPoint implAuthenticationEntryPoint;

    @Autowired
    ImplUserDetailsService implUserDetailsService;

    @Bean
    public JWTFilter jwtFilter() {
        return  new JWTFilter();
    }

    @Override
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    // Encode the password
    @Bean
    public BCryptPasswordEncoder encodePassword() {
        return new BCryptPasswordEncoder();
    }

    // Configure HTTP authentication rules.
    protected void configure(HttpSecurity http) throws Exception {
        // Must disable csrf()
        http.csrf().disable();

        // Add a filter and let this filter deal with all requests.
        http.addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class);

        // Handle the exceptions.
        http.exceptionHandling().authenticationEntryPoint(implAuthenticationEntryPoint)
             .and()
             .sessionManagement()
             // Make SessionCreationPolicy STATELESS so the server won't save sessions.
             .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
             .and()
             // Start to authenticate the requests
             .authorizeRequests()
                 .antMatchers(
                     "/",
                     "/api/user/**"
                 ).permitAll()
                 .anyRequest().authenticated();
    }

    // Configure user-detail service
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(implUserDetailsService)
                .passwordEncoder(encodePassword());
    }
}
