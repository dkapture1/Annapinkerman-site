#!/usr/bin/env node

/**
 * Debug Detalhado de Produção
 * Testa diferentes cenários para identificar o problema exato
 */

const https = require('https');

const PRODUCTION_URL = 'https://annapinkerman-site.vercel.app';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: jsonData,
            rawData: data
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data,
            rawData: data
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function debugProduction() {
  console.log('🔍 Debug Detalhado de Produção');
  console.log('='.repeat(50));
  console.log(`🌐 URL: ${PRODUCTION_URL}`);
  console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
  
  // Teste 1: Verificar se a rota existe
  console.log('\n📡 Teste 1: Verificando rota da API');
  try {
    const response = await makeRequest(`${PRODUCTION_URL}/api/photos/behind-the-scenes-details`);
    console.log(`   Status: ${response.statusCode}`);
    console.log(`   Headers:`, JSON.stringify(response.headers, null, 2));
    
    if (response.statusCode === 500) {
      console.log(`   ❌ Erro 500 - API está sendo executada mas falhando`);
      console.log(`   📄 Resposta:`, response.data);
      
      // Analisar o erro
      if (response.data.error === 'Internal server error') {
        console.log(`   🔍 Análise: Erro interno do servidor`);
        
        if (response.data.message === 'Unknown error') {
          console.log(`   💡 Possível causa: Problema com variáveis de ambiente ou Cloudinary`);
        }
      }
    }
    
  } catch (error) {
    console.log(`   💥 Erro: ${error.message}`);
  }
  
  // Teste 2: Verificar diferentes categorias
  console.log('\n📸 Teste 2: Verificando diferentes categorias');
  const categories = [
    'behind-the-scenes-details',
    'guests-arriving',
    'ceremony-tributes',
    'waltz',
    'the-party-vibes'
  ];
  
  for (const category of categories) {
    try {
      const response = await makeRequest(`${PRODUCTION_URL}/api/photos/${category}`);
      console.log(`   ${category}: Status ${response.statusCode}`);
      
      if (response.statusCode === 500) {
        console.log(`     ❌ Mesmo erro para todas as categorias`);
        break;
      }
    } catch (error) {
      console.log(`   ${category}: Erro ${error.message}`);
    }
  }
  
  // Teste 3: Verificar tags inválidas
  console.log('\n🚫 Teste 3: Verificando tags inválidas');
  try {
    const response = await makeRequest(`${PRODUCTION_URL}/api/photos/invalid-tag`);
    console.log(`   Tag inválida: Status ${response.statusCode}`);
    
    if (response.statusCode === 404) {
      console.log(`   ✅ Tratamento de erro funcionando`);
    } else {
      console.log(`   ❌ Comportamento inesperado: ${response.statusCode}`);
    }
  } catch (error) {
    console.log(`   💥 Erro: ${error.message}`);
  }
  
  // Teste 4: Verificar se é problema de timeout
  console.log('\n⏱️ Teste 4: Verificando timeout');
  try {
    const startTime = Date.now();
    const response = await makeRequest(`${PRODUCTION_URL}/api/photos/behind-the-scenes-details`);
    const endTime = Date.now();
    
    console.log(`   Tempo de resposta: ${endTime - startTime}ms`);
    console.log(`   Status: ${response.statusCode}`);
    
    if (endTime - startTime > 5000) {
      console.log(`   ⚠️ Resposta lenta - possível problema de conectividade`);
    }
  } catch (error) {
    console.log(`   💥 Erro: ${error.message}`);
  }
  
  // Diagnóstico final
  console.log('\n🎯 DIAGNÓSTICO FINAL');
  console.log('='.repeat(50));
  
  console.log('📋 Possíveis causas do erro 500:');
  console.log('   1. ❌ Variáveis de ambiente não configuradas corretamente');
  console.log('   2. ❌ Credenciais do Cloudinary inválidas');
  console.log('   3. ❌ Problema de conectividade com Cloudinary');
  console.log('   4. ❌ Erro no código da API');
  console.log('   5. ❌ Problema de permissões no Cloudinary');
  
  console.log('\n💡 Próximos passos sugeridos:');
  console.log('   1. 🔍 Verificar logs do Vercel para detalhes do erro');
  console.log('   2. 🔧 Verificar se as variáveis estão marcadas como "Production"');
  console.log('   3. 🔑 Confirmar se as credenciais do Cloudinary estão corretas');
  console.log('   4. 🌐 Testar conectividade com Cloudinary diretamente');
  
  console.log('\n🚀 Para resolver:');
  console.log('   - Acesse o Vercel Dashboard');
  console.log('   - Vá em "Functions" ou "Logs"');
  console.log('   - Verifique os logs de erro da API');
  console.log('   - Procure por mensagens específicas do Cloudinary');
}

// Executar debug
if (require.main === module) {
  debugProduction().catch(console.error);
}

module.exports = { debugProduction };
