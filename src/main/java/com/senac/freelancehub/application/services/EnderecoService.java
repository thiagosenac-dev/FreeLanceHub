package com.senac.freelancehub.application.services;

import com.senac.freelancehub.application.DTOs.EnderecoResponse;
import com.senac.freelancehub.application.ports.EnderecoServicePort;
import com.senac.freelancehub.domain.interfaces.IViaCepExternalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService implements EnderecoServicePort {

    @Autowired
    private IViaCepExternalRepository viaCepExternalRepository;

    // busca o endereço do CEP no ViaCEP
    public EnderecoResponse BuscarEndereco(String cep) {

        var enderecoCompleto = viaCepExternalRepository.buscarEnderecoViaCepPorCep(cep);

        return new EnderecoResponse(
                enderecoCompleto.getCep(),
                enderecoCompleto.getLogradouro(),
                enderecoCompleto.getBairro(),
                enderecoCompleto.getLocalidade(),
                enderecoCompleto.getUf());
    }
}
