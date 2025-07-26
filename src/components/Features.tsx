import { Shield, Zap, Headphones, Globe, Database, Lock } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Extrema",
      description: "Servidores SSD NVMe e CDN global para carregamento ultra-rápido"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Segurança Avançada",
      description: "Firewall, anti-malware e SSL gratuito para proteger seu site"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Suporte 24/7",
      description: "Equipe especializada disponível a qualquer hora do dia"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "99.9% Uptime",
      description: "Garantia de disponibilidade com SLA e monitoramento constante"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Backup Automático",
      description: "Backups diários automáticos para nunca perder seus dados"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "SSL Gratuito",
      description: "Certificado SSL incluído para criptografar e proteger dados"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por que Escolher Nossa Hospedagem?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Oferecemos a melhor infraestrutura e suporte para garantir que seu site
            esteja sempre online e funcionando perfeitamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-card-hosting transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;