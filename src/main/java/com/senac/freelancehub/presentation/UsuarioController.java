package com.senac.freelancehub.presentation;

import com.senac.freelancehub.application.DTOs.AtualizarStatusRequest;
import com.senac.freelancehub.application.DTOs.CriarAdminRequest;
import com.senac.freelancehub.application.DTOs.CriarAdminResponse;
import com.senac.freelancehub.application.DTOs.UsuarioRequest;
import com.senac.freelancehub.application.DTOs.UsuarioResponse;
import com.senac.freelancehub.application.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuarios", description = "grupo de API responsável por controlar a estrutura de criação e consulta de usuários do sistema")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // lista todos os usuários
    @GetMapping
    @Operation(summary = "Método de consulta de lista de usuários!", description = "Método responsável pela consulta de todos os usuários sem filtro")
    public ResponseEntity<List<UsuarioResponse>> listarTodos() {

        return ResponseEntity.ok(usuarioService.listarTodosUsuariosGrid());
    }

    // busca um usuário pelo id, 404 se não existir
    @GetMapping("/{id}")
    @Operation(summary = "Método de consulta de usuário POR ID", description = "Método responsável pela consulta de usuários por ID")
    public ResponseEntity<UsuarioResponse> buscarPorId(@PathVariable Long id) {

        UsuarioResponse usuarioBanco = usuarioService.buscarPorId(id);
        if (usuarioBanco != null) {
            return ResponseEntity.ok(usuarioBanco);
        }

        return ResponseEntity.notFound().build();
    }

    // cria um admin (precisa da secretKey)
    @PostMapping("/admin")
    @Operation(summary = "Método de criar admin", description = "Método responsável pela criação de admin com secretKey")
    public ResponseEntity<CriarAdminResponse> criarAdmin(@RequestBody CriarAdminRequest criarAdminRequest) {

        try {
            CriarAdminResponse respostaSalvar = usuarioService.criarAdmin(criarAdminRequest);
            return ResponseEntity.ok(respostaSalvar);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // cria um usuário novo (id 0 no service)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criar novos usuários!", description = "Método responsável pela criação de usuários")
    public ResponseEntity<?> criar(@RequestBody UsuarioRequest usuario) {

        try {
            UsuarioResponse usuarioBanco = usuarioService.salvarUsuario(usuario, 0L);
            return ResponseEntity.ok(usuarioBanco);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // altera só o status do usuário
    @PatchMapping("/{id}/status")
    @Operation(summary = "Método de alterar status", description = "Método responsável pela alteração dos status dos usuários")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest) {

        if (usuarioService.atualizarStatus(id, statusRequest)) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

    // atualiza os dados do usuário (id existente no service)
    @PutMapping("/{id}")
    @Operation(summary = "Método de alterar informações do usuário", description = "Método responsável pela alteração de usuários")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody UsuarioRequest usuario) {

        try {
            UsuarioResponse usuarioBanco = usuarioService.salvarUsuario(usuario, id);
            if (usuarioBanco == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(usuarioBanco);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // inativa o usuário (status EXCLUIDO)
    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método de inativação de cadastro", description = "Método responsável pela inativação do cadastro do usuário")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        if (usuarioService.excluir(id)) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}