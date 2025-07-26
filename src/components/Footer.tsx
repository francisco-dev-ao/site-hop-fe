import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold">HostPro</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Sua parceira confiável em hospedagem de sites. Oferecemos soluções 
              completas com performance, segurança e suporte excepcionais.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">Hospedagem Compartilhada</a></li>
              <li><a href="#" className="hover:text-white transition-colors">VPS</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Servidor Dedicado</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Registro de Domínio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Email Profissional</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status do Sistema</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4" />
                <span>(11) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4" />
                <span>suporte@hostpro.com.br</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 HostPro. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">
                LGPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;