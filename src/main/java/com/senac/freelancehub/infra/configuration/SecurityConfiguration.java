package com.senac.freelancehub.infra.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http.cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        // rotas livres (sem login)
                        // MUDANÇA: liberei o cadastro de freelancer e a área pública de projetos
                        // MUDANÇA: liberei a criação do admin (o desktop usa, ela se protege com a secretKey)
                        .requestMatchers("/auth/login",
                                "/auth/registrar",
                                "/usuarios/admin",
                                "/publico/**",
                                "/swagger-ui/**",
                                "/webjars/**",
                                "/swagger-resources/**",
                                "/v3/api-docs/**",
                                "/error"
                        ).permitAll()
                        // MUDANÇA: liberei só o POST de categorias (o desktop usa)
                        .requestMatchers(HttpMethod.POST, "/categorias").permitAll()
                        // usuário logado: qualquer perfil (o login usa para guardar o usuário no Redux)
                        .requestMatchers("/usuarios/buscarusuariologado").authenticated()
                        // usuários e clientes: só admin
                        .requestMatchers("/usuarios/**", "/clientes/**").hasRole("ADMIN")
                        // projetos: só a empresa cria, admin e empresa mexem nos projetos
                        .requestMatchers(HttpMethod.POST, "/projetos").hasRole("EMPRESA")
                        .requestMatchers("/projetos/**").hasAnyRole("ADMIN", "EMPRESA")
                        // propostas: só o freelancer cria, admin e empresa veem as propostas de um projeto
                        .requestMatchers(HttpMethod.POST, "/propostas").hasRole("FREELANCER")
                        .requestMatchers("/propostas/projeto/**").hasAnyRole("ADMIN", "EMPRESA")
                        // categorias: todo mundo logado consulta, só o admin altera
                        .requestMatchers(HttpMethod.GET, "/categorias/**").authenticated()
                        .requestMatchers("/categorias/**").hasRole("ADMIN")
                        // freelancer: habilidades e projetos que combinam com elas
                        .requestMatchers("/freelancer/**").hasRole("FREELANCER")
                        // propostas: só admin e empresa aceitam ou recusam, o freelancer edita as dele
                        .requestMatchers(HttpMethod.PATCH, "/propostas/*/status").hasAnyRole("ADMIN", "EMPRESA")
                        .requestMatchers(HttpMethod.PUT, "/propostas/**").hasRole("FREELANCER")
                        // o resto: qualquer usuário logado
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}