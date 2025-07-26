// Utility functions for WiseCP integration

interface WiseCPConfig {
  baseUrl: string;
  apiKey?: string;
}

// Configure your WiseCP backend URL here
const config: WiseCPConfig = {
  baseUrl: process.env.VITE_WISECP_URL || 'https://your-wisecp-backend.com',
  // API key would be stored in Supabase secrets in production
};

export interface DomainCheckResponse {
  available: boolean;
  price?: number;
  suggestions?: string[];
}

export interface HostingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface OrderData {
  planId: string;
  domain?: string;
  billingCycle: 'monthly' | 'yearly';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

// Check domain availability
export async function checkDomainAvailability(domain: string): Promise<DomainCheckResponse> {
  try {
    const response = await fetch(`${config.baseUrl}/api/domains/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` }),
      },
      body: JSON.stringify({ domain }),
    });

    if (!response.ok) {
      throw new Error('Failed to check domain availability');
    }

    return await response.json();
  } catch (error) {
    console.error('Domain check error:', error);
    throw error;
  }
}

// Get hosting plans
export async function getHostingPlans(): Promise<HostingPlan[]> {
  try {
    const response = await fetch(`${config.baseUrl}/api/hosting/plans`, {
      headers: {
        ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` }),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch hosting plans');
    }

    return await response.json();
  } catch (error) {
    console.error('Plans fetch error:', error);
    throw error;
  }
}

// Create order
export async function createOrder(orderData: OrderData): Promise<{ orderId: string; redirectUrl: string }> {
  try {
    const response = await fetch(`${config.baseUrl}/api/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` }),
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Order creation error:', error);
    throw error;
  }
}

// Customer login
export async function customerLogin(email: string, password: string): Promise<{ token: string; customer: any }> {
  try {
    const response = await fetch(`${config.baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Customer registration
export async function customerRegister(customerData: {
  name: string;
  email: string;
  password: string;
  phone: string;
}): Promise<{ token: string; customer: any }> {
  try {
    const response = await fetch(`${config.baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}