package com.senac.freelancehub.presentation;
import com.senac.freelancehub.application.DTOs.AtualizarStatusUsuarioRequest;
import com.senac.freelancehub.application.DTOs.UsuarioResponse;
import com.senac.freelancehub.application.services.UsuarioService;
import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.entities.Usuario;
import com.senac.freelancehub.domain.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuarios", description = "grupo de API responsável por controlar a estrutura de criação e consulta de usuários do sistema")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de usuários!", description = "Método responsável pela colsulta de todas os usuários sem filtro")
    public ResponseEntity<List<UsuarioResponse>> ListarTodos() {

        return ResponseEntity.ok(usuarioService.ListarTodosUsuariosGrid());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método de consulta de lista de usuários POR ID", description = "Método responsável pela colsulta de usuários por ID")
    public ResponseEntity<Usuario> BuscarPorId(@PathVariable Long id){

        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criar novos usuários!", description = "Método responsável pela criação de. usuários")
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {

        return ResponseEntity.ok(usuarioService.criar(usuario));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método de aletrar Status", description = "Método responsável aletração dos status dos usuários")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusUsuarioRequest statusRequest){

        if (usuarioService.atualizarStatus(id, statusRequest)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método de alterar iformações do usuário", description = "Método responsável pela alteração de usuários")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario){

        if (usuarioService.atualizarUsuario(id, usuario)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método de inativação de cadastro", description = "Método responsável inativação do cadastro do usuários")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        if (usuarioService.excluir(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}


