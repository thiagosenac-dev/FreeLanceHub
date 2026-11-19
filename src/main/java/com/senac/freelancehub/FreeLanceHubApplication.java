package com.senac.freelancehub;

import com.senac.freelancehub.domain.repository.TokenRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FreeLanceHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(FreeLanceHubApplication.class, args);

        System.out.println("______PROGRAMA RODOU______");
    }

    // ao iniciar, apaga os tokens do banco (reiniciar o back derruba os logins)
    @Bean
    CommandLineRunner limpaTokens(TokenRepository tokenRepository) {
        return args -> tokenRepository.deleteAll();
    }

}
