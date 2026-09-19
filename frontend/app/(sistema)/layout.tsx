import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function SistemaLayout({children}){
    return (
        <div className="flex min-h-screen bg-[#030712]">
           <Sidebar/>
            <div className="flex-1 flex flex-col min-w-0 ">
                <Header />
                <main className="flex-1 overflow-y-auto bg-[#030712] p-6 text-gray-100">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}