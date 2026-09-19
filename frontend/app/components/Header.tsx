export default function Header(){
    const headerClasses = "w-full bg-[#030712]/70 backdrop-blur-lg shadow-sm";
    const containerClasses = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between";
    const userWrapperClasses = "flex items-center space-x-3";
    const avatarClasses = "w-10 h-10 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-[#06b6d4] shadow-inner";
    const nameClasses = "text-gray-200 font-medium text-sm sm:text-base";
    const buttonClasses = "px-4 py-2 bg-[#3b82f6]/20 hover:bg-[#3b82f6]/30 text-[#06b6d4] border border-[#3b82f6]/30 font-medium text-sm rounded-lg transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#06b6d4]";

    return (
        <header className={headerClasses}>
            <div className={containerClasses}>
                <div className={userWrapperClasses}>
                    <div className={avatarClasses}>
                        <svg xmlns="http://www.w3.org/200/svg" 
                        className="w-6 h-6" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                    </div>
                    <span className={nameClasses}>
                        Usuário Thiago
                    </span>
                </div>
                <button className={buttonClasses}>
                    Sair
                </button>
            </div>
        </header>
    );
}