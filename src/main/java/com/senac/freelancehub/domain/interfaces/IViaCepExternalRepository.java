package com.senac.freelancehub.domain.interfaces;

import com.senac.freelancehub.infra.dto.ViaCepResponse;

// porta: o domínio só conhece essa interface, quem chama o ViaCEP de verdade fica na infra
public interface IViaCepExternalRepository {

    ViaCepResponse buscarEnderecoViaCepPorCep(String cep);
}
