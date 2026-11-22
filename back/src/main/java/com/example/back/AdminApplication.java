package com.example.back;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

// aplicação desktop (JavaFX) para criar o primeiro admin e as categorias
public class AdminApplication extends Application {
    // abre a janela de login do desktop
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(AdminApplication.class.getResource("login-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 320, 240);
        stage.setTitle("Admin FreelAnce!");
        stage.setScene(scene);
        stage.show();
    }
}

