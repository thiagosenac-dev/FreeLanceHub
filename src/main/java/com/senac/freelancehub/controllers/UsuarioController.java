package com.senac.freelancehub.controllers;
import com.senac.freelancehub.DTOs.AlterarSenhaRequest;
import com.senac.freelancehub.DTOs.AtualizarStatusRequest;
import com.senac.freelancehub.entities.EnumStatusUsuario;
import com.senac.freelancehub.entities.Usuario;
import com.senac.freelancehub.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuarios", description = "grupo de API responsável por controlar a estrutura de criação e consulta de usuários do sistema")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de usuários!", description = "Método responsável pela colsulta de todas os usuários sem filtro")
    public ResponseEntity<?> ListarTodos() {

        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criar novos usuários!", description = "Método responsável pela criação de. usuários")
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {
        var usuarioBanco = usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuarioBanco);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest){

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco != null){
            usuarioBanco.setStatus(statusRequest.status());
            usuarioRepository.save(usuarioBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario){

        try {
            Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);

            if (usuarioBanco != null){
                usuarioBanco.setStatus(usuario.getStatus());
                usuarioBanco.setNome(usuario.getNome());
                usuarioBanco.setEmail(usuario.getEmail());
                usuarioBanco.setCpf(usuario.getCpf());
                usuarioBanco.setSenha(usuario.getSenha());
                usuarioRepository.save(usuarioBanco);

                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco != null){
            usuarioBanco.setStatus(EnumStatusUsuario.EXCLUIDO);
            usuarioRepository.save(usuarioBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

/*
    @PutMapping("/senha")
    @Operation(summary = "alterar senha (esqueci minha senha)", description = "metodo responsável por permitir a alteração da senha do usuário quando esquecida")
    public ResponseEntity<?> AlterarSenha(@RequestBody AlterarSenhaRequest alterarSenhaRequest) {

        var usuarioOptional = usuarioRepository.findByEmail(alterarSenhaRequest.email());

        if (usuarioOptional.isEmpty()){
            return ResponseEntity.status(HttpURLConnection.HTTP_NOT_FOUND).build();
        }

        var usuario = usuarioOptional.get();
        usuario.setSenha(alterarSenhaRequest.novaSenha());
        usuarioRepository.save(usuario);

        return ResponseEntity.ok().build();
    }

}
*/

