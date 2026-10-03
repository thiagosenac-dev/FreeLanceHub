package com.senac.freelancehub.presentation;

import com.senac.freelancehub.application.DTOs.EsqueciSenhaRequest;
import com.senac.freelancehub.application.DTOs.EsqueciSenhaResponse;
import com.senac.freelancehub.application.DTOs.LoginRequest;
import com.senac.freelancehub.application.DTOs.LoginResponse;
import com.senac.freelancehub.application.DTOs.RedefinirSenhaRequest;
import com.senac.freelancehub.application.services.UsuarioService;
import com.senac.freelancehub.domain.entities.Usuario;
import com.senac.freelancehub.application.services.TokenService;
import com.auth0.jwt.exceptions.JWTVerificationException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.HttpURLConnection;


@RestController
@RequestMapping("/auth")
@Tag(name = "Authenticador Controler 'Login'", description = "grupo de API responsável por controlar a estrutura de criação e consulta de usuários do sistema")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    @Operation(summary = "Autenticação de organizadores", description = "Método de login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        var resultadoAutenticacaoeRetorno = usuarioService.validarUsuarioAutenticadoRetornaToken(loginRequest);

        if (resultadoAutenticacaoeRetorno != null) {
            return ResponseEntity.ok(new LoginResponse(resultadoAutenticacaoeRetorno.token()));
        }

        return ResponseEntity.status(HttpURLConnection.HTTP_UNAUTHORIZED).body("Usuário ou senha inválidos!");
    }

//    @PostMapping("/esqueci-senha")
//    @Operation(summary = "Solicitar recuperação de senha", description = "Método responsável por gerar um token de redefinição de senha a partir do e-mail informado. Em um cenário de produção esse token seria enviado por e-mail ao usuário")
//    public ResponseEntity<?> esqueciSenha(@RequestBody EsqueciSenhaRequest request){
//
//        Usuario usuarioBanco = usuarioRepository.findByEmail(request.email()).orElse(null);
//
//        if (usuarioBanco == null){
//            return ResponseEntity.notFound().build();
//        }
//
//        var tokenRecuperacao = tokenService.gerarToken(usuarioBanco.getEmail());
//
//        return ResponseEntity.ok(new EsqueciSenhaResponse(tokenRecuperacao));
//    }
//
//    @PatchMapping("/redefinir-senha")
//    @Operation(summary = "Redefinir senha esquecida", description = "Método responsável por trocar a senha do usuário a partir do token gerado em /auth/esqueci-senha")
//    public ResponseEntity<?> redefinirSenha(@RequestBody RedefinirSenhaRequest request){
//
//        try {
//            var jwtValidado = tokenService.verificarToken(request.token());
//            String email = jwtValidado.getSubject();
//
//            Usuario usuarioBanco = usuarioRepository.findByEmail(email).orElse(null);
//
//            if (usuarioBanco == null){
//                return ResponseEntity.notFound().build();
//            }
//
//            usuarioBanco.setSenha(request.novaSenha());
//            usuarioRepository.save(usuarioBanco);
//
//            return ResponseEntity.ok().build();
//
//        } catch (JWTVerificationException e){
//            return ResponseEntity.status(HttpURLConnection.HTTP_UNAUTHORIZED).body("Token inválido ou expirado!");
//        }
//    }
}
