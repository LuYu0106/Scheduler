package edu.gatech.scheduler.config;

import org.springframework.beans.factory.annotation.Autowired;
import edu.gatech.scheduler.service.ImplUserDetailsService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import java.io.IOException;
import edu.gatech.scheduler.domain.User;
import org.springframework.util.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import java.util.Collections;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.bson.types.ObjectId;

public class JWTFilter extends OncePerRequestFilter {
    @Autowired
    private JWTProvider jwtProvider;

    @Autowired
    private ImplUserDetailsService implUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jsonWebToken = getJsonWebToken(httpServletRequest);

            if(StringUtils.hasText(jsonWebToken) && jwtProvider.validateToken(jsonWebToken)){
                // Get userId
                String userId = jwtProvider.getUserIdFromJWT(jsonWebToken);
                // Get userDetails
                User userDetails = implUserDetailsService.loadUserById(userId);

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new
                        UsernamePasswordAuthenticationToken(userDetails, null, Collections.emptyList());

                usernamePasswordAuthenticationToken.setDetails(new
                        WebAuthenticationDetailsSource().buildDetails(httpServletRequest));

                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        // Catch exception
        catch (Exception exception){
              httpServletResponse.sendError(httpServletResponse.SC_UNAUTHORIZED, exception.getMessage());
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private String getJsonWebToken(HttpServletRequest request) {
        String authenticationToken = request.getHeader("Authorization");
        String jasonWebToken = null;

        if(StringUtils.hasText(authenticationToken) && authenticationToken.startsWith("Bearer ")) {
            // The length of "Bearer " is 7, so the start index should be 7.
            jasonWebToken = authenticationToken.substring(7, authenticationToken.length());
        }

        return jasonWebToken;
    }
}

