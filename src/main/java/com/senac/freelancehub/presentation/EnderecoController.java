package com.senac.freelancehub.presentation;

import com.senac.freelancehub.application.ports.EnderecoServicePort;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/endereco")
@Tag(name = "Endereço", description = "grupo de API responsável pela consulta de endereço por CEP (ViaCEP)")
public class EnderecoController {

    @Autowired
    private EnderecoServicePort enderecoService;

    @GetMapping("/{cep}")
    @Operation(summary = "Método de consulta de endereço POR CEP", description = "Método responsável por consultar o endereço de um CEP no ViaCEP")
    public ResponseEntity<?> buscarEndereco(@PathVariable String cep) {
        try {
            return ResponseEntity.ok(enderecoService.BuscarEndereco(cep));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(e.getMessage());
        }
    }
}
