'use client'

import { Provider } from "react-redux";
import { store } from "./store";

// disponibiliza a store do Redux para toda a aplicação
export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
