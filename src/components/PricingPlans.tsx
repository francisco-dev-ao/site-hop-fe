import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { getProducts, Product } from "@/lib/wisecp";
import { useToast } from "@/hooks/use-toast";

const PricingPlans = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response.status === 'success') {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        // Fallback para planos estáticos se a API falhar
        setProducts([
          {
            id: 1,
            name: "Básico",
            description: "Ideal para sites pessoais",
            price: 9.90,
            currency: "BRL",
            group_id: 1,
            type: "hosting"
          },
          {
            id: 2,
            name: "Profissional", 
            description: "Perfeito para pequenas empresas",
            price: 19.90,
            currency: "BRL",
            group_id: 1,
            type: "hosting"
          },
          {
            id: 3,
            name: "Empresarial",
            description: "Para projetos de grande escala", 
            price: 39.90,
            currency: "BRL",
            group_id: 1,
            type: "hosting"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePlanSelect = (product: Product) => {
    // Redirecionar para página de checkout ou abrir modal
    toast({
      title: "Plano Selecionado",
      description: `Você escolheu o plano ${product.name}. Redirecionando para checkout...`,
    });
    
    // Aqui você pode redirecionar para uma página de checkout
    // ou abrir um modal para coletar dados do cliente
    console.log("Produto selecionado:", product);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl">Carregando planos...</div>
        </div>
      </section>
    );
  }

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
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className={`relative bg-gradient-card shadow-card-hosting border-0 ${
                index === 1 ? 'scale-105 shadow-hosting' : ''
              }`}
            >
              {index === 1 && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white border-0">
                  <Star className="w-3 h-3 mr-1" />
                  Mais Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{product.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {product.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-hosting-blue">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {/* Features básicos para todos os planos */}
                  <li className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-hosting-success flex-shrink-0" />
                    <span className="text-sm">SSL Grátis</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-hosting-success flex-shrink-0" />
                    <span className="text-sm">Suporte 24/7</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-hosting-success flex-shrink-0" />
                    <span className="text-sm">Backup Diário</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-hosting-success flex-shrink-0" />
                    <span className="text-sm">Transferência Ilimitada</span>
                  </li>
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className={`w-full ${
                    index === 1
                      ? 'bg-gradient-primary hover:opacity-90' 
                      : 'variant-outline hover:bg-primary hover:text-primary-foreground'
                  }`}
                  onClick={() => handlePlanSelect(product)}
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