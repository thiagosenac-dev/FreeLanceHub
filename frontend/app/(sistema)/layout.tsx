import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AuthGuard from "../components/AuthGuard"; // MUDANÇA: só entra quem fez login

export default function SistemaLayout({children}){
    return (
        <div className="flex min-h-screen bg-[#030712]">
           <Sidebar/>
            <div className="flex-1 flex flex-col min-w-0 ">
                <Header />
                <main className="flex-1 overflow-y-auto bg-[#030712] text-gray-100">
                    <AuthGuard>{children}</AuthGuard>
                </main>
                <Footer />
            </div>
        </div>
    );
}