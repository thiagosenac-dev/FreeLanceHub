package com.senac.freelancehub.infra.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// libera o front (CORS) para chamar a API
@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    // aplica o CORS em todas as rotas
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET","POST","PUT","DELETE","PATCH","OPTIONS","HEAD");
    }
}
