package com.senac.freelancehub.presentation;

import com.senac.freelancehub.application.DTOs.AtualizarStatusRequest;
import com.senac.freelancehub.application.DTOs.CategoriaResponse;
import com.senac.freelancehub.application.services.CategoriaService;
import com.senac.freelancehub.domain.entities.Categoria;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@Tag(name = "Categorias", description = "grupo de API responsável por controlar a estrutura de criação e consulta de categorias do sistema")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de categorias!", description = "Método responsável pela consulta de todas as categorias sem filtro")
    public ResponseEntity<List<CategoriaResponse>> listarTodas() {
        return ResponseEntity.ok(categoriaService.listarTodasCategoriasGrid());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método de consulta de categoria POR ID", description = "Método responsável pela consulta de categoria por ID")
    public ResponseEntity<Categoria> buscarPorId(@PathVariable Long id) {
        return categoriaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método criar novas categorias!", description = "Método responsável pela criação de novas categorias")
    public ResponseEntity<Categoria> criar(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.criar(categoria));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método de alterar Status", description = "Método responsável pela alteração do status das categorias")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest) {

        if (categoriaService.atualizarStatus(id, statusRequest)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método de alterar informações da categoria", description = "Método responsável pela alteração de categorias")
    public ResponseEntity<Categoria> atualizarCategoria(@PathVariable Long id, @RequestBody Categoria categoria) {

        if (categoriaService.atualizarCategoria(id, categoria)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método de inativação de cadastro", description = "Método responsável pela inativação do cadastro da categoria")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        if (categoriaService.excluir(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
