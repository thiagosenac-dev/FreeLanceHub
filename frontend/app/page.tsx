import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="antialiased relative min-h-screen flex flex-col font-sans bg-[#030712] text-[#f8fafc] overflow-x-hidden">
      
      {/* Estilos customizados injetados diretamente no componente */}
      <style dangerouslySetInnerHTML={{ __html: `
        .glow-blob {
            position: absolute;
            width: 400px;
            height: 400px;
            background: linear-gradient(to right, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.15));
            border-radius: 50%;
            filter: blur(80px);
            z-index: -1;
            pointer-events: none;
            animation: float 10s infinite ease-in-out alternate;
        }
        .blob-1 { top: -10%; left: -10%; }
        .blob-2 { bottom: 20%; right: -10%; animation-delay: -5s; }

        @keyframes float {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(30px, 50px) scale(1.1); }
        }

        .text-gradient {
            background: linear-gradient(135deg, #60a5fa, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
      `}} />

      {/* Background Glows */}
      <div className="glow-blob blob-1"></div>
      <div className="glow-blob blob-2"></div>

      {/* HEADER / NAVBAR */}
      <header className="fixed w-full top-0 z-50 bg-[#030712]/70 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-80 transition-opacity">
              <svg className="w-8 h-8 text-[#06b6d4] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                FreeLance<span className="text-gradient">Hub</span>
              </span>
            </div>

            {/* Desktop Menu & Login Button */}
            <nav className="hidden md:flex space-x-8 items-center">
              <a href="#inicio" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Início</a>
              <a href="#historia" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Nossa História</a>
              
              <button className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white bg-[#3b82f6] rounded-full group hover:bg-[#06b6d4] transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center gap-2 font-heading text-sm">
                  Entrar
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button className="text-gray-300 hover:text-white focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex items-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 text-[#06b6d4] text-sm font-medium mb-4 backdrop-blur-sm">
                🚀 Nascida em Criciúma para o mundo
              </div>
              
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Trabalho flexível e contratação rápida em <span className="text-gradient">um só lugar.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Ajudamos pessoas a encontrar oportunidades incríveis no tempo livre e conectamos empresas ao talento certo, exatamente quando precisam.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white font-heading font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  Sou Freelancer
                </button>
                <button className="px-8 py-4 rounded-full bg-transparent border border-gray-600 text-white font-heading font-semibold text-lg hover:border-[#06b6d4] hover:text-[#06b6d4] transition-all duration-300">
                  Sou Empresa
                </button>
              </div>
            </div>

            {/* Hero Image/Graphic */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3b82f6]/20 to-[#06b6d4]/20 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Floating Cards */}
                <div className="absolute top-10 left-10 bg-[#0f172a]/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl w-64 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-xl">👩‍💻</span>
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold">Ana S.</h4>
                      <p className="text-xs text-gray-400">Renda extra à noite</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full mb-2"><div className="bg-[#06b6d4] h-2 rounded-full w-3/4"></div></div>
                  <p className="text-xs text-[#06b6d4] font-medium">Projeto Concluído</p>
                </div>

                <div className="absolute bottom-20 right-0 bg-[#0f172a]/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl w-64 transform rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <span className="text-xl">🏢</span>
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold">TechCorp</h4>
                      <p className="text-xs text-gray-400">Buscando Dev Urgente</p>
                    </div>
                  </div>
                  <button className="w-full py-2 mt-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium border border-white/10 transition-colors">
                    Match Realizado ⚡
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (NOSSA HISTÓRIA) */}
      <section id="historia" className="py-24 relative border-t border-white/5 bg-gradient-to-b from-transparent to-[#0f172a]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Graphic Side */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-[#3b82f6]/10 blur-3xl rounded-full"></div>
              <div className="relative bg-[#030712] border border-white/10 rounded-3xl p-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]"></div>
                <h3 className="font-heading text-2xl font-bold mb-6 text-white">Por que o FreeLanceHub?</h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-heading font-semibold text-lg">Horários Flexíveis</h4>
                      <p className="text-sm text-gray-400 mt-1">Trabalhe nos seus próprios horários. Ideal para conciliar com estudos ou outro emprego.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-heading font-semibold text-lg">Agilidade para Empresas</h4>
                      <p className="text-sm text-gray-400 mt-1">Encontre profissionais qualificados em minutos para demandas de curto prazo ou projetos pontuais.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Text Side */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <h2 className="font-heading text-sm uppercase tracking-widest text-[#3b82f6] font-bold">Nossa História</h2>
              <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight">
                De <span className="text-gradient">Criciúma</span> para revolucionar o mercado de trabalho.
              </h3>
              
              <div className="space-y-4 text-gray-300 font-light text-lg leading-relaxed">
                <p>
                  Nascemos em Criciúma com um propósito claro: <strong className="text-white font-medium">revolucionar a forma como profissionais e empresas se conectam.</strong> 
                </p>
                <p>
                  Somos uma startup focada em democratizar o acesso a oportunidades de trabalho flexíveis. Se você busca uma renda extra, quer fazer o seu próprio horário, ou tem rotinas não convencionais, o FreeLanceHub é o seu lugar.
                </p>
                <p>
                  Para as empresas, sabemos que o tempo é valioso. Por isso, oferecemos a agilidade necessária para encontrar o talento certo, exatamente no momento em que precisam de reforço para projetos de curto prazo ou demandas urgentes.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 mt-auto bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <span className="font-heading font-bold text-xl text-white">
              FreeLance<span className="text-[#3b82f6]">Hub</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; 2026 FreeLanceHub. Orgulhosamente de Criciúma/SC.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#06b6d4] transition-colors">Privacidade</a>
            <a href="#" className="hover:text-[#06b6d4] transition-colors">Termos</a>
          </div>
        </div>
      </footer>

      </div>
    </>
  );
}