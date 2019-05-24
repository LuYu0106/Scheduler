package edu.gatech.scheduler.config;

import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;
import edu.gatech.scheduler.domain.User;
import io.jsonwebtoken.*;
import java.util.Date;
import java.util.HashMap;

@Component
public class JWTProvider {
    // 1000 milliseconds = 1 seconds
    // 900000 milliseconds = 15 mins
    public static final long VALID_TIME = 900000;

    //Generate the token
    public String generateJWT(Authentication authentication) {
        String jwt = null;

        // Get userId
        User user = (User)authentication.getPrincipal();
        String id = user.getId();

        // Get claims
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("username", user.getUsername());

        // Get current time and expiration time.
        Date currentTime = new Date(System.currentTimeMillis());
        Date expirationTime = new Date(currentTime.getTime() + VALID_TIME);

        jwt = Jwts.builder()
                .setSubject(id)
                .setClaims(claims)
                .setIssuedAt(currentTime)
                .setExpiration(expirationTime)
                .signWith(SignatureAlgorithm.HS512, "SecretKey")
                .compact();

        return jwt;
    }

    //Validate the token
    public boolean validateToken(String token) {
        boolean validation = false;

        try {
            Jwts.parser().setSigningKey("SecretKey").parseClaimsJws(token);
            validation = true;
        }
        // Throw ExpiredJwtException when token expires
        catch (ExpiredJwtException | MalformedJwtException | SignatureException
                | UnsupportedJwtException | IllegalArgumentException exception) {
            System.out.println(exception.getMessage());
        }

        return validation;
    }

    //Get userId from Json Web Token
    public String getUserIdFromJWT(String jwt){
        Claims claims = Jwts.parser()
                .setSigningKey("SecretKey")
                .parseClaimsJws(jwt)
                .getBody();

        String id = (String)claims.get("id");

        return id;
    }
}

