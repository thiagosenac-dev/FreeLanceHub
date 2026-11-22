package com.senac.freelancehub.application.ports;

import com.senac.freelancehub.application.DTOs.EnderecoResponse;

// porta do serviço de endereço (consulta de CEP)
public interface EnderecoServicePort {

    // busca o endereço de um CEP no ViaCEP
    EnderecoResponse BuscarEndereco(String cep);
}
