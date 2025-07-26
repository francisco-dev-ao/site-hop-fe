import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const PricingPlans = () => {
  const plans = [
    {
      name: "Básico",
      price: "9,90",
      description: "Ideal para sites pessoais",
      features: [
        "1 Site",
        "5GB de Armazenamento",
        "Transferência Ilimitada",
        "SSL Grátis",
        "Suporte por Email"
      ],
      popular: false
    },
    {
      name: "Profissional",
      price: "19,90",
      description: "Perfeito para pequenas empresas",
      features: [
        "5 Sites",
        "20GB de Armazenamento",
        "Transferência Ilimitada",
        "SSL Grátis",
        "Backup Diário",
        "Suporte 24/7"
      ],
      popular: true
    },
    {
      name: "Empresarial",
      price: "39,90",
      description: "Para projetos de grande escala",
      features: [
        "Sites Ilimitados",
        "100GB de Armazenamento",
        "Transferência Ilimitada",
        "SSL Grátis",
        "Backup Diário",
        "Suporte Prioritário",
        "CDN Grátis"
      ],
      popular: false
    }
  ];

  const handlePlanSelect = (planName: string) => {
    // Aqui você enviaria os dados para o WiseCP
    console.log("Plano selecionado:", planName);
  };

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Escolha o Plano Ideal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Planos flexíveis que crescem com seu negócio. Todos incluem recursos essenciais
            para manter seu site online e performático.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-gradient-card shadow-card-hosting border-0 ${
                plan.popular ? 'scale-105 shadow-hosting' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white border-0">
                  <Star className="w-3 h-3 mr-1" />
                  Mais Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-hosting-blue">
                    R$ {plan.price}
                  </span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-hosting-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-primary hover:opacity-90' 
                      : 'variant-outline hover:bg-primary hover:text-primary-foreground'
                  }`}
                  onClick={() => handlePlanSelect(plan.name)}
                >
                  Escolher Plano
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Todos os planos incluem 30 dias de garantia
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <span>✓ Setup Gratuito</span>
            <span>✓ Migração Gratuita</span>
            <span>✓ Sem Taxa de Cancelamento</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;