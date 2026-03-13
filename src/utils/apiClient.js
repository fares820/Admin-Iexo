const API_BASE = '/.netlify/functions'

class ApiClient {
  async makeRequest(endpoint, data = {}, customHeaders = {}) {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...customHeaders },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async getProducts() { return this.makeRequest('products', { action: 'getProducts' }) }
  async createOrder(orderData) { return this.makeRequest('orders', { action: 'createOrder', data: { orderData } }) }
  async createPayPalOrder(amount, currency, orderDetails) { return this.makeRequest('paypal-create-order', { amount, currency, orderDetails }) }
  async capturePayPalOrder(orderId, orderDetails) { return this.makeRequest('paypal-capture-order', { orderId, orderDetails }) }
}

export const apiClient = new ApiClient();