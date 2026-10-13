package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.AtualizarStatusCategoriaRequest;
import com.senac.freelancehub.application.DTOs.CategoriaResponse;
import com.senac.freelancehub.domain.entities.Categoria;
import com.senac.freelancehub.domain.entities.EnumStatus;
import com.senac.freelancehub.domain.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    // busca a categoria pelo id, devolve vazio se não existir
    public Optional<Categoria> buscarPorId(Long id) {
        return categoriaRepository.findById(id);
    }

    // salva uma nova categoria no banco e devolve ela já com o id
    public Categoria criar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    // altera o status da categoria, devolve false se ela não existir
    public boolean atualizarStatus(Long id, AtualizarStatusCategoriaRequest statusRequest) {

        Categoria categoriaBanco = categoriaRepository.findById(id).orElse(null);

        if (categoriaBanco == null) {
            return false;
        }

        categoriaBanco.setStatus(statusRequest.status());
        categoriaRepository.save(categoriaBanco);
        return true;
    }

    // altera os dados da categoria, devolve false se ela não existir
    public boolean atualizarCategoria(Long id, Categoria categoria) {

        Categoria categoriaBanco = categoriaRepository.findById(id).orElse(null);

        if (categoriaBanco == null) {
            return false;
        }

        categoriaBanco.setNome(categoria.getNome());
        categoriaBanco.setDescricao(categoria.getDescricao());
        categoriaBanco.setStatus(categoria.getStatus());
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
