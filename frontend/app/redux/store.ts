import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoriasReducer from "./slices/categoriasSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categorias: categoriasReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
