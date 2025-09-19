const https = require('https');

// Substitua pela URL do seu site em produção
const PRODUCTION_URL = 'https://www.annapinkerman.com';

async function testProductionAPI() {
  console.log('🔍 Testando API em produção...');
  console.log('URL:', PRODUCTION_URL);
  
  try {
    // Test 1: Debug endpoint
    console.log('\n📋 Teste 1: Verificando variáveis de ambiente...');
    const debugResponse = await fetch(`${PRODUCTION_URL}/api/debug`);
    const debugData = await debugResponse.json();
    
    console.log('✅ Debug Response:');
    console.log(JSON.stringify(debugData, null, 2));
    
    // Test 2: Photos API
    console.log('\n📸 Teste 2: Testando API de fotos...');
    const photosResponse = await fetch(`${PRODUCTION_URL}/api/photos/behind-the-scenes-details`);
    
    if (photosResponse.ok) {
      const photosData = await photosResponse.json();
      console.log('✅ Photos API funcionando!');
      console.log(`📊 Encontradas ${photosData.length} fotos`);
      if (photosData.length > 0) {
        console.log('🖼️ Primeira foto:', photosData[0].public_id);
      }
    } else {
      const errorData = await photosResponse.json();
      console.log('❌ Erro na Photos API:');
      console.log(JSON.stringify(errorData, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Erro ao testar API:', error.message);
  }
}

// Função fetch para Node.js (se não estiver disponível)
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

testProductionAPI();
