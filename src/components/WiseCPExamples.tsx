// Exemplos práticos de uso da API WiseCP

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  checkDomainAvailability, 
  getProducts, 
  createOrder, 
  clientLogin, 
  clientRegister,
  getProductGroups,
  getCurrencies
} from "@/lib/wisecp";

const WiseCPExamples = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runExample = async (exampleName: string, fn: () => Promise<any>) => {
    setLoading(true);
    try {
      const result = await fn();
      setResults({ example: exampleName, data: result });
      console.log(`${exampleName} resultado:`, result);
    } catch (error) {
      setResults({ example: exampleName, error: error.message });
      console.error(`${exampleName} erro:`, error);
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    {
      title: "1. Verificar Domínio",
      description: "Verificar se domínio 'teste.com' está disponível",
      action: () => runExample("Verificar Domínio", () => checkDomainAvailability("teste", "com"))
    },
    {
      title: "2. Listar Produtos",
      description: "Buscar todos os produtos de hospedagem",
      action: () => runExample("Listar Produtos", () => getProducts())
    },
    {
      title: "3. Grupos de Produtos",
      description: "Listar categorias/grupos de produtos",
      action: () => runExample("Grupos de Produtos", () => getProductGroups())
    },
    {
      title: "4. Moedas Disponíveis",
      description: "Listar moedas suportadas pelo sistema",
      action: () => runExample("Moedas", () => getCurrencies())
    },
    {
      title: "5. Registro de Cliente",
      description: "Exemplo de registro de novo cliente",
      action: () => runExample("Registro Cliente", () => clientRegister({
        firstname: "João",
        lastname: "Silva",
        email: `teste${Date.now()}@example.com`,
        phonenumber: "+55119999999",
        password: "senha123",
        country: "BR",
        city: "São Paulo"
      }))
    },
    {
      title: "6. Login de Cliente",
      description: "Teste de login (use credenciais válidas)",
      action: () => runExample("Login Cliente", () => clientLogin("cliente@example.com", "senha123"))
    },
    {
      title: "7. Criar Pedido",
      description: "Exemplo de criação de pedido",
      action: () => runExample("Criar Pedido", () => createOrder({
        product_id: 1,
        billing_cycle: "monthly",
        domain: "meusite.com",
        customer_data: {
          firstname: "Cliente",
          lastname: "Teste",
          email: `pedido${Date.now()}@example.com`,
          phonenumber: "+55119999999",
          password: "senha123"
        }
      }))
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Exemplos WiseCP API - AngoHost
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {examples.map((example, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{example.title}</CardTitle>
              <CardDescription>{example.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={example.action}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Executando..." : "Testar"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Área de Resultados */}
      {results && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Resultado: {results.example}</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-sm">
              {JSON.stringify(results.data || results.error, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Informações da API */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Configuração da API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>URL Base:</strong> https://angohost.co.ao/api</p>
          <p><strong>Documentação:</strong> 
            <a 
              href="https://www.postman.com/wisecp/wisecp/documentation/hcgbjam/wisecp-external-api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-2"
            >
              Postman Collection
            </a>
          </p>
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h4 className="font-semibold mb-2">Endpoints Principais:</h4>
            <ul className="text-sm space-y-1">
              <li>• <code>POST /domains/check</code> - Verificar domínio</li>
              <li>• <code>GET /products</code> - Listar produtos</li>
              <li>• <code>POST /orders</code> - Criar pedido</li>
              <li>• <code>POST /clients/register</code> - Registrar cliente</li>
              <li>• <code>POST /clients/login</code> - Login cliente</li>
              <li>• <code>GET /currencies</code> - Listar moedas</li>
              <li>• <code>GET /product-groups</code> - Grupos de produtos</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WiseCPExamples;