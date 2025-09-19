#!/usr/bin/env node

/**
 * Teste de Prontidão para Produção
 * Este script valida se tudo está funcionando antes do deploy
 */

const https = require('https');
const http = require('http');

// Configurações
const LOCAL_URL = 'http://localhost:3001';
const PRODUCTION_URL = 'https://annapinkerman-site.vercel.app';

// Credenciais que serão usadas em produção
const PRODUCTION_CREDENTIALS = {
  CLOUDINARY_CLOUD_NAME: 'daoxy15hl',
  CLOUDINARY_API_KEY: '327819649288239',
  CLOUDINARY_API_SECRET: '9pNa77zquytcLjFUbjiGR-9q27Y'
};

// Função para fazer requisições HTTP
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
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

// Função para testar endpoint de saúde
async function testHealthEndpoint(url, environment) {
  console.log(`\n🏥 Testando endpoint de saúde (${environment})`);
  console.log('='.repeat(50));
  
  try {
    const response = await makeRequest(`${url}/api/health`);
    
    if (response.statusCode === 200) {
      console.log(`✅ Status: ${response.statusCode}`);
      console.log(`📊 Cloudinary configurado: ${response.data.cloudinary?.configured ? '✅' : '❌'}`);
      console.log(`🌍 Ambiente: ${response.data.environment}`);
      console.log(`⏰ Timestamp: ${response.data.timestamp}`);
      
      if (response.data.cloudinary?.configured) {
        console.log(`🔧 Detalhes da configuração:`);
        console.log(`   - Cloud Name: ${response.data.cloudinary.details?.cloud_name ? '✅' : '❌'}`);
        console.log(`   - API Key: ${response.data.cloudinary.details?.api_key ? '✅' : '❌'}`);
        console.log(`   - API Secret: ${response.data.cloudinary.details?.api_secret ? '✅' : '❌'}`);
      }
      
      return true;
    } else {
      console.log(`❌ Status: ${response.statusCode}`);
      console.log(`📄 Resposta:`, response.rawData);
      return false;
    }
    
  } catch (error) {
    console.log(`💥 Erro: ${error.message}`);
    return false;
  }
}

// Função para testar todas as categorias de fotos
async function testPhotoCategories(url, environment) {
  console.log(`\n📸 Testando categorias de fotos (${environment})`);
  console.log('='.repeat(50));
  
  const categories = [
    'behind-the-scenes-details',
    'guests-arriving',
    'ceremony-tributes',
    'waltz',
    'the-party-vibes'
  ];
  
  const results = [];
  
  for (const category of categories) {
    try {
      console.log(`\n🔍 Testando: ${category}`);
      const response = await makeRequest(`${url}/api/photos/${category}`);
      
      if (response.statusCode === 200) {
        const photoCount = Array.isArray(response.data) ? response.data.length : 0;
        console.log(`   ✅ Status: ${response.statusCode}`);
        console.log(`   📊 Fotos encontradas: ${photoCount}`);
        
        if (photoCount > 0) {
          const firstPhoto = response.data[0];
          console.log(`   📸 Primeira foto: ${firstPhoto.public_id}`);
          console.log(`   🔗 URL válida: ${firstPhoto.secure_url ? '✅' : '❌'}`);
          console.log(`   📐 Dimensões: ${firstPhoto.width}x${firstPhoto.height}`);
          
          // Verificar se a URL é válida
          if (firstPhoto.secure_url && firstPhoto.secure_url.includes('cloudinary.com')) {
            console.log(`   🌐 URL do Cloudinary: ✅`);
          } else {
            console.log(`   🌐 URL do Cloudinary: ❌`);
          }
        } else {
          console.log(`   ⚠️  Nenhuma foto encontrada para esta categoria`);
        }
        
        results.push({ category, success: true, count: photoCount });
      } else {
        console.log(`   ❌ Status: ${response.statusCode}`);
        console.log(`   📄 Erro:`, response.data);
        results.push({ category, success: false, error: response.data });
      }
      
    } catch (error) {
      console.log(`   💥 Erro: ${error.message}`);
      results.push({ category, success: false, error: error.message });
    }
  }
  
  return results;
}

// Função para testar tags inválidas
async function testInvalidTags(url, environment) {
  console.log(`\n🚫 Testando tags inválidas (${environment})`);
  console.log('='.repeat(50));
  
  const invalidTags = ['invalid-tag', 'test', 'nonexistent', 'random'];
  
  for (const tag of invalidTags) {
    try {
      const response = await makeRequest(`${url}/api/photos/${tag}`);
      
      if (response.statusCode === 404) {
        console.log(`   ✅ Tag "${tag}": Status 404 (comportamento correto)`);
      } else {
        console.log(`   ❌ Tag "${tag}": Status ${response.statusCode} (comportamento inesperado)`);
        console.log(`   📄 Resposta:`, response.data);
      }
      
    } catch (error) {
      console.log(`   💥 Erro testando tag "${tag}": ${error.message}`);
    }
  }
}

// Função para comparar local vs produção
async function compareEnvironments() {
  console.log(`\n🔄 Comparando Local vs Produção`);
  console.log('='.repeat(50));
  
  try {
    // Testar saúde local
    const localHealth = await testHealthEndpoint(LOCAL_URL, 'LOCAL');
    
    // Testar saúde produção
    const prodHealth = await testProductionReadiness();
    
    if (localHealth && prodHealth) {
      console.log(`\n🎉 Ambientes funcionando!`);
    } else if (localHealth && !prodHealth) {
      console.log(`\n⚠️  Local OK, Produção com problemas`);
    } else if (!localHealth && prodHealth) {
      console.log(`\n⚠️  Produção OK, Local com problemas`);
    } else {
      console.log(`\n❌ Ambientes com problemas`);
    }
    
  } catch (error) {
    console.log(`💥 Erro na comparação: ${error.message}`);
  }
}

// Função principal para testar prontidão de produção
async function testProductionReadiness() {
  console.log(`\n🚀 Teste de Prontidão para Produção`);
  console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
  console.log(`🔧 Credenciais que serão usadas:`);
  console.log(`   Cloud Name: ${PRODUCTION_CREDENTIALS.CLOUDINARY_CLOUD_NAME}`);
  console.log(`   API Key: ${PRODUCTION_CREDENTIALS.CLOUDINARY_API_KEY}`);
  console.log(`   API Secret: ***${PRODUCTION_CREDENTIALS.CLOUDINARY_API_SECRET.slice(-4)}`);
  
  // Testar ambiente local primeiro
  console.log(`\n🏠 TESTANDO AMBIENTE LOCAL`);
  console.log('='.repeat(60));
  
  const localHealth = await testHealthEndpoint(LOCAL_URL, 'LOCAL');
  if (!localHealth) {
    console.log(`\n❌ Ambiente local com problemas. Corrija antes de prosseguir.`);
    return false;
  }
  
  const localPhotos = await testPhotoCategories(LOCAL_URL, 'LOCAL');
  await testInvalidTags(LOCAL_URL, 'LOCAL');
  
  // Verificar se todas as categorias locais funcionam
  const localSuccess = localPhotos.every(result => result.success);
  if (!localSuccess) {
    console.log(`\n❌ Algumas categorias locais com problemas. Corrija antes de prosseguir.`);
    return false;
  }
  
  // Testar ambiente de produção
  console.log(`\n🌐 TESTANDO AMBIENTE DE PRODUÇÃO`);
  console.log('='.repeat(60));
  
  const prodHealth = await testHealthEndpoint(PRODUCTION_URL, 'PRODUCTION');
  if (!prodHealth) {
    console.log(`\n⚠️  Produção com problemas - provavelmente variáveis não configuradas`);
    console.log(`💡 Configure as variáveis no Vercel e faça redeploy`);
    return false;
  }
  
  const prodPhotos = await testPhotoCategories(PRODUCTION_URL, 'PRODUCTION');
  await testInvalidTags(PRODUCTION_URL, 'PRODUCTION');
  
  // Resumo final
  console.log(`\n📊 RESUMO DOS TESTES`);
  console.log('='.repeat(60));
  
  const localPhotoCount = localPhotos.reduce((sum, result) => sum + (result.count || 0), 0);
  const prodPhotoCount = prodPhotos.reduce((sum, result) => sum + (result.count || 0), 0);
  
  console.log(`🏠 Local:`);
  console.log(`   - Saúde: ${localHealth ? '✅' : '❌'}`);
  console.log(`   - Categorias funcionando: ${localPhotos.filter(r => r.success).length}/${localPhotos.length}`);
  console.log(`   - Total de fotos: ${localPhotoCount}`);
  
  console.log(`🌐 Produção:`);
  console.log(`   - Saúde: ${prodHealth ? '✅' : '❌'}`);
  console.log(`   - Categorias funcionando: ${prodPhotos.filter(r => r.success).length}/${prodPhotos.length}`);
  console.log(`   - Total de fotos: ${prodPhotoCount}`);
  
  if (localHealth && prodHealth && localPhotoCount > 0 && prodPhotoCount > 0) {
    console.log(`\n🎉 PRONTO PARA PRODUÇÃO!`);
    console.log(`✅ Ambientes funcionando`);
    console.log(`✅ Fotos carregando`);
    console.log(`✅ API respondendo corretamente`);
    return true;
  } else {
    console.log(`\n⚠️  NECESSÁRIO AJUSTES ANTES DA PRODUÇÃO`);
    return false;
  }
}

// Executar testes
if (require.main === module) {
  testProductionReadiness().catch(console.error);
}

module.exports = { testProductionReadiness, testHealthEndpoint, testPhotoCategories };
