package edu.gatech.scheduler.config;

import org.springframework.stereotype.Component;
import org.springframework.security.web.AuthenticationEntryPoint;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import java.io.IOException;
import javax.servlet.ServletException;
import com.google.gson.Gson;
import edu.gatech.scheduler.exceptions.InvalidLoginResponse;

@Component
public class ImplAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest httpServletRequest,
                         HttpServletResponse httpServletResponse,
                         AuthenticationException e) throws IOException, ServletException {
        httpServletResponse.setContentType("application/json");
        // SC_UNAUTHORIZED is a static int 401 indicating that the request requires HTTP authentication.
        httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        Gson gson = new Gson();
        String response = gson.toJson(new InvalidLoginResponse());
        httpServletResponse.getWriter().print(response);
    }
}
