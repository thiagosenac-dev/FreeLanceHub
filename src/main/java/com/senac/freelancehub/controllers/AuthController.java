package com.senac.freelancehub.controllers;

import com.senac.freelancehub.DTOs.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.HttpURLConnection;

@RestController
@RequestMapping("/auth")
public class AuthController {

    public ResponseEntity<?> Login(@RequestBody LoginRequest loginRequest){

        if (loginRequest.email().equals("String") && loginRequest.email().equals("String")){
            // gerar um token
            return ResponseEntity.ok("");
        }

        return ResponseEntity.status(HttpURLConnection.HTTP_UNAUTHORIZED).build();
    }
}
