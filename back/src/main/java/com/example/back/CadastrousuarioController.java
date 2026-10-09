package com.example.back;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.io.IOException;

public class CadastrousuarioController {

    @FXML
    private TextField txtUsuario;

    @FXML
    private TextField txtCpf;

    @FXML
    private TextField txtEmail;

    @FXML
    private PasswordField txtSenha;

    // Chamado ao clicar no botão Salvar
    @FXML
    protected void onSalvarButtonClick() {
        String usuario = txtUsuario.getText();
        String cpf = txtCpf.getText();
        String email = txtEmail.getText();
        String senha = txtSenha.getText();

        // Valida se todos os campos foram preenchidos
        if (usuario.trim().isEmpty() || cpf.trim().isEmpty() || email.trim().isEmpty() || senha.trim().isEmpty()) {
            showMessage(Alert.AlertType.ERROR, "Preencha todos os campos!");
            return;
        }

        // Aqui entra o salvamento (banco, lista, API...)
        System.out.println("Usuário salvo: " + usuario + " | " + email);

        showMessage(Alert.AlertType.INFORMATION, "Usuário cadastrado com sucesso!");

        // Limpa os campos
        txtUsuario.clear();
        txtCpf.clear();
        txtEmail.clear();
        txtSenha.clear();
    }

    // volta ao menu principal da tela de login
    @FXML
    protected void voltarMenu(ActionEvent event) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/com/example/back/menu-view.fxml"));
        Scene scene = new Scene(loader.load());
        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        stage.setScene(scene);
    }

    private void showMessage(Alert.AlertType type, String msg) {
        Alert alerta = new Alert(type);
        alerta.setTitle("Mensagem do sistema.");
        alerta.setHeaderText(null);
        alerta.setContentText(msg);
        alerta.showAndWait();
    }
}