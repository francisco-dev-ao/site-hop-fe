// WiseCP API Integration for AngoHost

interface WiseCPConfig {
  baseUrl: string;
  apiKey: string;
}

// Configure your WiseCP backend
const config: WiseCPConfig = {
  baseUrl: 'https://angohost.co.ao/api',
  apiKey: '43b23b127314fce4676cfa2677b12346f6242f156624523f18a284254811c02d',
};

// Base API request function
async function makeRequest(endpoint: string, method: 'GET' | 'POST' = 'GET', data?: any) {
  try {
    const url = `${config.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      ...(data && { body: JSON.stringify(data) }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('WiseCP API Error:', error);
    throw error;
  }
}

// Types baseados na documentação WiseCP
export interface DomainCheckResponse {
  status: string;
  data: {
    domain: string;
    available: boolean;
    price?: number;
    currency?: string;
  };
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  group_id: number;
  type: string;
}

export interface OrderRequest {
  product_id: number;
  domain?: string;
  billing_cycle: string;
  addons?: number[];
  customer_id?: number;
  customer_data?: {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    password: string;
  };
}

// 1. Verificar disponibilidade de domínio
export async function checkDomainAvailability(domain: string, tld: string = 'com'): Promise<DomainCheckResponse> {
  return await makeRequest('/domains/check', 'POST', {
    domain: `${domain}.${tld}`,
  });
}

// 2. Listar produtos/planos de hospedagem
export async function getProducts(group_id?: number): Promise<{ status: string; data: Product[] }> {
  const endpoint = group_id ? `/products?group_id=${group_id}` : '/products';
  return await makeRequest(endpoint);
}

// 3. Obter detalhes de um produto específico
export async function getProduct(productId: number): Promise<{ status: string; data: Product }> {
  return await makeRequest(`/products/${productId}`);
}

// 4. Criar pedido
export async function createOrder(orderData: OrderRequest): Promise<{ status: string; data: any }> {
  return await makeRequest('/orders', 'POST', orderData);
}

// 5. Login do cliente
export async function clientLogin(email: string, password: string): Promise<{ status: string; data: any }> {
  return await makeRequest('/clients/login', 'POST', {
    email,
    password,
  });
}

// 6. Registro do cliente
export async function clientRegister(clientData: {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  password: string;
  country?: string;
  city?: string;
  address?: string;
}): Promise<{ status: string; data: any }> {
  return await makeRequest('/clients/register', 'POST', clientData);
}

// 7. Obter detalhes do cliente
export async function getClientDetails(clientId: number): Promise<{ status: string; data: any }> {
  return await makeRequest(`/clients/${clientId}`);
}

// 8. Listar pedidos do cliente
export async function getClientOrders(clientId: number): Promise<{ status: string; data: any[] }> {
  return await makeRequest(`/clients/${clientId}/orders`);
}

// 9. Obter fatura específica
export async function getInvoice(invoiceId: number): Promise<{ status: string; data: any }> {
  return await makeRequest(`/invoices/${invoiceId}`);
}

// 10. Listar faturas do cliente
export async function getClientInvoices(clientId: number): Promise<{ status: string; data: any[] }> {
  return await makeRequest(`/clients/${clientId}/invoices`);
}

// 11. Obter configurações da moeda
export async function getCurrencies(): Promise<{ status: string; data: any[] }> {
  return await makeRequest('/currencies');
}

// 12. Obter grupos de produtos
export async function getProductGroups(): Promise<{ status: string; data: any[] }> {
  return await makeRequest('/product-groups');
}

// 13. Verificar status do serviço
export async function getServiceStatus(serviceId: number): Promise<{ status: string; data: any }> {
  return await makeRequest(`/services/${serviceId}`);
}

// 14. Solicitar redefinição de senha
export async function requestPasswordReset(email: string): Promise<{ status: string; data: any }> {
  return await makeRequest('/clients/password-reset', 'POST', { email });
}

// 15. Confirmar redefinição de senha
export async function confirmPasswordReset(token: string, newPassword: string): Promise<{ status: string; data: any }> {
  return await makeRequest('/clients/password-reset/confirm', 'POST', {
    token,
    password: newPassword,
  });
}