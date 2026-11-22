package com.senac.freelancehub;

import com.senac.freelancehub.domain.repository.TokenRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

// classe principal: inicia a aplicação Spring Boot
@SpringBootApplication
public class FreeLanceHubApplication {

    // liga o Spring e mostra a mensagem no console
    public static void main(String[] args) {
        SpringApplication.run(FreeLanceHubApplication.class, args);

        System.out.println("______PROGRAMA RODOU______");
    }

    // ao iniciar, apaga os tokens do banco (reiniciar o back é pra derruba os logins)
    @Bean
    CommandLineRunner limpaTokens(TokenRepository tokenRepository) {
        return args -> tokenRepository.deleteAll();
    }

}
