package com.senac.freelancehub.presentation;

import com.senac.freelancehub.application.DTOs.AtualizarStatusPropostaRequest;
import com.senac.freelancehub.application.DTOs.PropostaRequest;
import com.senac.freelancehub.application.DTOs.PropostaResponse;
import com.senac.freelancehub.application.services.PropostaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/propostas")
@Tag(name = "Propostas", description = "grupo de API responsável por controlar a estrutura de criação e edição das propostas para os propostas")
public class PropostaController {

    @Autowired
    private PropostaService propostaService;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de propostas!", description = "Método responsável pela colsulta de todas os propostas sem filtro")
    public ResponseEntity<?> ListarTodos() {

        return ResponseEntity.ok(propostaService.ListarTodasPropostasGrid());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método de consulta de lista de propostas POR ID", description = "Método responsável pela colsulta de propostas por ID")
    public ResponseEntity<PropostaResponse> BuscarPorId(@PathVariable Long id){

        PropostaResponse propostaBanco = propostaService.buscarPorId(id);
        if (propostaBanco != null) {
            return ResponseEntity.ok(propostaBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de consulta de lista de propostas!", description = "Método responsável pela colsulta de todas os propostas sem filtro")
    public ResponseEntity<?> criar(@RequestBody PropostaRequest proposta) {

        try {
            PropostaResponse propostaBanco = propostaService.salvarProposta(proposta, 0L);
            return ResponseEntity.ok(propostaBanco);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método de aletrar Status", description = "Método responsável aletração dos status das propostas")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusPropostaRequest statusRequest){

        if (propostaService.atualizarStatus(id, statusRequest)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método de alterar iformações do propostas", description = "Método responsável pela alteração de propostas")
    public ResponseEntity<?> atualizarProposta(@PathVariable Long id, @RequestBody PropostaRequest proposta){

        try {
            PropostaResponse propostaBanco = propostaService.salvarProposta(proposta, id);
            if (propostaBanco == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(propostaBanco);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método de inativação de cadastro", description = "Método responsável inativação do cadastro da proposta")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        if (propostaService.excluir(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
