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
                                "/auth/registrar-cliente", // MUDANÇA: cadastro público do cliente
                                "/endereco/**", // MUDANÇA: o ViaCEP é usado no cadastro, antes do login
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
                        // projetos: só o cliente cria, admin e cliente mexem nos projetos
                        .requestMatchers(HttpMethod.POST, "/projetos").hasRole("CLIENTE")
                        .requestMatchers("/projetos/**").hasAnyRole("ADMIN", "CLIENTE")
                        // propostas: só o freelancer (usuário) cria, admin e cliente veem as propostas de um projeto
                        .requestMatchers(HttpMethod.POST, "/propostas").hasRole("USUARIO")
                        .requestMatchers("/propostas/projeto/**").hasAnyRole("ADMIN", "CLIENTE")
                        // categorias: todo mundo logado consulta, só o admin altera
                        .requestMatchers(HttpMethod.GET, "/categorias/**").authenticated()
                        .requestMatchers("/categorias/**").hasRole("ADMIN")
                        // freelancer: habilidades e projetos que combinam com elas
                        .requestMatchers("/freelancer/**").hasRole("USUARIO")
                        // propostas: só admin e cliente aceitam ou recusam, o freelancer (usuário) edita as dele
                        .requestMatchers(HttpMethod.PATCH, "/propostas/*/status").hasAnyRole("ADMIN", "CLIENTE")
                        .requestMatchers(HttpMethod.PUT, "/propostas/**").hasRole("USUARIO")
                        // o resto: qualquer usuário logado
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}