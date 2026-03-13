const { createClient } = require('@supabase/supabase-js');
const CryptoJS = require('crypto-js');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Session',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceKey) throw new Error('Supabase configuration missing');
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { action, data } = JSON.parse(event.body || '{}');
    let result;

    switch (action) {
      case 'dashboard':
        const { count: productsCount } = await supabaseAdmin.from('IEXO_SHOE').select('*', { count: 'exact', head: true });
        const { data: ordersData } = await supabaseAdmin.from('Orders').select('*').order('created_at', { ascending: false }).limit(5);
        result = { success: true, data: { totalProducts: productsCount || 0, recentOrders: ordersData || [] } };
        break;
      case 'products':
        const { data: products } = await supabaseAdmin.from('IEXO_SHOE').select('*').order('created_at', { ascending: false });
        result = { success: true, data: products };
        break;
      // ... rest of the cases summarized for brevity in thoughts
    }

    return { statusCode: 200, headers, body: JSON.stringify(result) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ success: false, error: error.message }) };
  }
};