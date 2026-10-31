package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.AtualizarStatusRequest;
import com.senac.freelancehub.application.DTOs.CategoriaRequest;
import com.senac.freelancehub.application.DTOs.CategoriaResponse;
import com.senac.freelancehub.domain.entities.Categoria;
import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // busca todas as categorias, devolve lista vazia se não existir nenhuma
    public List<CategoriaResponse> listarTodasCategoriasGrid() {

        return categoriaRepository
                .findAll()
                .stream()
                .map(CategoriaResponse::new)
                .toList();
    }

    // lista pública: só as categorias ativas (sem login)
    public List<CategoriaResponse> listarCategoriasPublicas() {

        return categoriaRepository
                .findByStatus(EnumStatus.ATIVO)
                .orElse(new ArrayList<>())
                .stream()
                .map(CategoriaResponse::new)
                .toList();
    }

    // busca a categoria pelo id, devolve null se não existir
    public CategoriaResponse buscarPorId(Long id) {

        var categoria = categoriaRepository.findById(id).orElse(null);
        if (categoria == null) {
            return null;
        }

        return new CategoriaResponse(categoria);
    }

    // id 0 cria uma categoria nova, qualquer outro id atualiza a existente (null se não achar)
    public CategoriaResponse salvarCategoria(CategoriaRequest request, Long id) {

        // o nome é obrigatório
        if (request.nome() == null || request.nome().isBlank()) {
            throw new IllegalArgumentException("Nome inválido!");
        }

        Categoria categoria;

        if (id == 0L) {
            // nova categoria
            categoria = new Categoria();
            categoria.setStatus(EnumStatus.ATIVO);
        } else {
            // categoria existente
            categoria = categoriaRepository.findById(id).orElse(null);
            if (categoria == null) {
                return null;
            }
        }

        categoria.setNome(request.nome());
        categoria.setDescricao(request.descricao());
        if (request.status() != null) {
            categoria.setStatus(request.status());
        }

        categoriaRepository.save(categoria);
        return new CategoriaResponse(categoria);
    }

    // altera o status da categoria, devolve false se ela não existir
    public boolean atualizarStatus(Long id, AtualizarStatusRequest statusRequest) {

        Categoria categoriaBanco = categoriaRepository.findById(id).orElse(null);
        if (categoriaBanco == null) {
            return false;
        }
        categoriaBanco.setStatus(statusRequest.status());
        categoriaRepository.save(categoriaBanco);
        return true;
    }

    // inativa a categoria (status EXCLUIDO), devolve false se ela não existir
    public boolean excluir(Long id) {

        Categoria categoriaBanco = categoriaRepository.findById(id).orElse(null);
        if (categoriaBanco == null) {
            return false;
        }

        categoriaBanco.setStatus(EnumStatus.EXCLUIDO);
        categoriaRepository.save(categoriaBanco);
        return true;
    }
}
