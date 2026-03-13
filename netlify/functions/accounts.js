const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing');
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    const { action, user_id, data } = JSON.parse(event.body || '{}');
    let result;

    switch (action) {
      case 'getAccount':
        const { data: account, error: getError } = await supabaseAdmin
          .from('Accounts')
          .select(`id, Name, email, phone, Orders, profile_completed, favorites, created_at`)
          .eq('user_id', user_id)
          .single();
        if (getError && getError.code !== 'PGRST116') throw getError;
        result = { success: true, data: account };
        break;
      // ... (other cases omitted for brevity in thought, but included in actual push)
    }

    return { statusCode: 200, headers, body: JSON.stringify(result) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ success: false, error: error.message }) };
  }
};