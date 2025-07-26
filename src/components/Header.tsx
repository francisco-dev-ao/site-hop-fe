import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Search } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-foreground">HostPro</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Hospedagem</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Domínios</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">VPS</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Suporte</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <User className="w-4 h-4 mr-2" />
              Entrar
            </Button>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90">
              Começar Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Hospedagem</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Domínios</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">VPS</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Suporte</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
                <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                  Começar Agora
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;