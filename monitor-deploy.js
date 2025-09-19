#!/usr/bin/env node

/**
 * Script de Monitoramento de Deploy
 * Verifica quando a API estiver funcionando em produção
 */

const https = require('https');

const PRODUCTION_URL = 'https://annapinkerman-site.vercel.app';

// Função para fazer requisições HTTP
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
            data: jsonData,
            rawData: data
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
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

// Função para testar um endpoint específico
async function testEndpoint(endpoint, description) {
  try {
    const response = await makeRequest(`${PRODUCTION_URL}${endpoint}`);
    
    if (response.statusCode === 200) {
      console.log(`✅ ${description}: Status 200`);
      
      if (endpoint.includes('/api/photos/')) {
        const photoCount = Array.isArray(response.data) ? response.data.length : 0;
        console.log(`   📸 Fotos encontradas: ${photoCount}`);
        
        if (photoCount > 0) {
          const firstPhoto = response.data[0];
          console.log(`   🔗 Primeira foto: ${firstPhoto.public_id}`);
          console.log(`   🌐 URL válida: ${firstPhoto.secure_url ? '✅' : '❌'}`);
        }
      } else if (endpoint.includes('/api/health')) {
        console.log(`   🏥 Cloudinary configurado: ${response.data.cloudinary?.configured ? '✅' : '❌'}`);
        console.log(`   🌍 Ambiente: ${response.data.environment}`);
      }
      
      return true;
    } else {
      console.log(`❌ ${description}: Status ${response.statusCode}`);
      if (response.statusCode === 500) {
        console.log(`   📄 Erro: ${response.data.error || 'Unknown error'}`);
        console.log(`   💡 Ainda precisa do redeploy`);
      }
      return false;
    }
    
  } catch (error) {
    console.log(`💥 ${description}: ${error.message}`);
    return false;
  }
}

// Função principal de monitoramento
async function monitorDeploy() {
  console.log('🔍 Monitorando Deploy em Produção');
  console.log('='.repeat(50));
  console.log(`🌐 URL: ${PRODUCTION_URL}`);
  console.log(`⏰ Iniciado em: ${new Date().toISOString()}`);
  console.log('\n💡 Aguardando redeploy...');
  
  let attempts = 0;
  const maxAttempts = 20; // 10 minutos máximo
  
  while (attempts < maxAttempts) {
    attempts++;
    console.log(`\n🔄 Tentativa ${attempts}/${maxAttempts}`);
    console.log('-'.repeat(30));
    
    // Testar endpoint de saúde (se existir)
    const healthOk = await testEndpoint('/api/health', 'Endpoint de Saúde');
    
    // Testar endpoint de fotos
    const photosOk = await testEndpoint('/api/photos/behind-the-scenes-details', 'API de Fotos');
    
    if (photosOk) {
      console.log('\n🎉 SUCESSO! Deploy funcionando!');
      console.log('='.repeat(50));
      
      // Testar todas as categorias
      console.log('\n📸 Testando todas as categorias:');
      const categories = [
        'behind-the-scenes-details',
        'guests-arriving',
        'ceremony-tributes',
        'waltz',
        'the-party-vibes'
      ];
      
      for (const category of categories) {
        await testEndpoint(`/api/photos/${category}`, `Categoria: ${category}`);
      }
      
      console.log('\n✅ Deploy completo e funcionando!');
      console.log('🚀 Site pronto para uso!');
      return true;
    }
    
    if (attempts < maxAttempts) {
      console.log('\n⏳ Aguardando 30 segundos...');
      await new Promise(resolve => setTimeout(resolve, 30000));
    }
  }
  
  console.log('\n⏰ Tempo limite atingido');
  console.log('💡 Verifique se o redeploy foi feito no Vercel');
  return false;
}

// Executar monitoramento
if (require.main === module) {
  monitorDeploy().catch(console.error);
}

module.exports = { monitorDeploy, testEndpoint };
