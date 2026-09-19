export default function Footer(){
    const anoAtual = new Date().getFullYear();
    
    const footerClasses = "h-16 bg-[#030712] flex items-center justify-center px-6 text-xs text-gray-400";
    const containerClasses = "w-full max-w-7xl flex items-center justify-between";
    const textClasses = "flex items-center gap-1.5 text-gray-400";
    const brandClasses = "text-[#3b82f6] font-medium";

    return(
        <footer className={footerClasses}>
            <div className={containerClasses}>
                <div>
                    <p className={textClasses}>
                        &copy; {anoAtual} 
                        <span className={brandClasses}>Sei la</span> - 
                        Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}