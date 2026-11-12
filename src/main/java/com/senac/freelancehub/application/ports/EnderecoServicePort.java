package com.senac.freelancehub.application.ports;

import com.senac.freelancehub.application.DTOs.EnderecoResponse;

public interface EnderecoServicePort {

    EnderecoResponse BuscarEndereco(String cep);
}
