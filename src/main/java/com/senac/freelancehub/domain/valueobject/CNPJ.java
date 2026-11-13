package com.senac.freelancehub.domain.valueobject;

// MUDANÇA (novo): igual ao CPF, mas para o CNPJ da empresa
public class CNPJ {

    private String cnpj;

    public CNPJ(){
        this.cnpj = "";
    }

    public CNPJ(String cnpj){

        if(!isValidCnpj(cnpj)){
            throw new IllegalArgumentException("CNPJ Invalido!");
        }

        this.cnpj = cnpj;
    }

    public static boolean isValidCnpj(String cnpj) {
        if (cnpj == null) {
            return false;
        }

        // Remove tudo o que não for dígito
        cnpj = cnpj.replaceAll("\\D", "");

        // Verifica se tem 14 dígitos
        if (cnpj.length() != 14) {
            return false;
        }

        // Descarta CNPJs com todos os dígitos iguais (ex: 00.000.000/0000-00)
        if (cnpj.matches("(\\d)\\1{13}")) {
            return false;
        }

        try {
            // Cálculo do 1º dígito verificador (pesos 5,4,3,2,9,8,7,6,5,4,3,2)
            int[] pesos1 = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
            int soma = 0;
            for (int i = 0; i < 12; i++) {
                soma += Character.getNumericValue(cnpj.charAt(i)) * pesos1[i];
            }
            int digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

            if (digito1 != Character.getNumericValue(cnpj.charAt(12))) {
                return false;
            }

            // Cálculo do 2º dígito verificador (pesos 6,5,4,3,2,9,8,7,6,5,4,3,2)
            int[] pesos2 = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
            soma = 0;
            for (int i = 0; i < 13; i++) {
                soma += Character.getNumericValue(cnpj.charAt(i)) * pesos2[i];
            }
            int digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

            return digito2 == Character.getNumericValue(cnpj.charAt(13));

        } catch (NumberFormatException e) {
            return false;
        }
    }

    @Override
    public String toString(){
        return cnpj.replaceAll("\\D","")
                .replaceAll("(\\d{2})(\\d{3})(\\d{3})(\\d{4})(\\d{2})","$1.$2.$3/$4-$5");
    }

}
