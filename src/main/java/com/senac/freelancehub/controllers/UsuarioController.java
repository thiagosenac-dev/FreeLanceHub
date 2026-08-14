package com.senac.freelancehub.controllers;
import com.senac.freelancehub.entities.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @GetMapping
    public ResponseEntity<?> ListarTodos() {

        List<Usuario> usuarios =
                List.of (new Usuario(1L, "Thiago", "092.958.392-95", "123456", "thiago@gmail.com"));

        return ResponseEntity.ok(usuarios);
    }

}
