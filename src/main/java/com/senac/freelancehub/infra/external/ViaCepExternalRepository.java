package com.senac.freelancehub.infra.external;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.senac.freelancehub.domain.interfaces.IViaCepExternalRepository;
import com.senac.freelancehub.infra.dto.ViaCepResponse;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Component
public class ViaCepExternalRepository implements IViaCepExternalRepository {

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10)).build();
    private final ObjectMapper objectMapper = new ObjectMapper();

    // consulta o ViaCEP; CEP que não existe vira IllegalArgumentException, falha na consulta vira IllegalStateException
    public ViaCepResponse buscarEnderecoViaCepPorCep(String cep) {

        var cepNumeros = cep == null ? "" : cep.replaceAll("[^0-9]", "");
        if (cepNumeros.length() != 8) {
            throw new IllegalArgumentException("CEP inválido!");
        }

        var url = "https://viacep.com.br/ws/" + cepNumeros + "/json/";
        try {
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).GET().build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                ViaCepResponse viaCepResponse = objectMapper.readValue(response.body(), ViaCepResponse.class);
                if (viaCepResponse.getErro() != null && viaCepResponse.getErro()) {
                    throw new IllegalArgumentException("CEP inválido!");
                }
                return viaCepResponse;
            }
            throw new IllegalStateException("Erro ao consultar CEP!");

        } catch (IllegalArgumentException | IllegalStateException e) {
            throw e;
        } catch (Exception e) {
            throw new IllegalStateException("Erro ao consultar CEP!", e);
        }
    }
}
