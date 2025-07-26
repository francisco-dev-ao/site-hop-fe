import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Check } from "lucide-react";
import { useState } from "react";
import { checkDomainAvailability } from "@/lib/wisecp";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const [domain, setDomain] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const handleDomainCheck = async () => {
    if (!domain) {
      toast({
        title: "Erro",
        description: "Por favor, digite um domínio válido",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    try {
      const result = await checkDomainAvailability(domain, 'com');
      
      if (result.status === 'success') {
        if (result.data.available) {
          toast({
            title: "Domínio Disponível! 🎉",
            description: `${result.data.domain} está disponível para registro`,
          });
        } else {
          toast({
            title: "Domínio Indisponível",
            description: `${result.data.domain} não está disponível`,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erro na consulta",
        description: "Não foi possível verificar o domínio. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.1) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-hosting-blue to-hosting-cyan bg-clip-text text-transparent">
            Hospedagem de Sites
            <br />
            Rápida e Confiável
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tenha o melhor desempenho para seu site com nossa infraestrutura de alta qualidade. 
            Suporte 24/7 e 99.9% de uptime garantido.
          </p>

          {/* Domain Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Digite seu domínio..."
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="pr-10 h-12 text-base"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              <Button 
                onClick={handleDomainCheck}
                disabled={isChecking}
                className="h-12 px-6 bg-gradient-primary hover:opacity-90"
              >
                {isChecking ? "Verificando..." : "Verificar"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              .com a partir de R$ 39,90/ano
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Check className="w-4 h-4 text-hosting-success" />
              <span>SSL Grátis</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Check className="w-4 h-4 text-hosting-success" />
              <span>Suporte 24/7</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Check className="w-4 h-4 text-hosting-success" />
              <span>Backup Diário</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;