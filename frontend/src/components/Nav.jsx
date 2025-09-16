import Logo from '../assets/logo-futbolinas-branco.png'

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-800 to-purple-400 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center h-20 space-x-3">
          {/* Logo */}
          <img
            src={Logo}
            alt="Logo FutBolinhas"
            className="h-10 w-auto object-contain"
          />

          {/* Texto */}
          <h1 className="text-white font-extrabold text-2xl tracking-wide">
            FutBolinas
          </h1>
        </div>
      </div>
    </nav>
  );
}
