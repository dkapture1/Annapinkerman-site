#!/usr/bin/env node

/**
 * Teste de Permissões do Cloudinary
 * Verifica se as credenciais têm as permissões necessárias
 */

const cloudinary = require('cloudinary').v2;

async function testPermissions() {
  console.log('🔐 Testando Permissões do Cloudinary');
  console.log('='.repeat(50));
  
  try {
    // Configurar com as credenciais
    cloudinary.config({
      cloud_name: 'daoxy15hl',
      api_key: '327819649288239',
      api_secret: '9pNa77zquytcLjFUbjiGR-9q27Y',
      secure: true,
    });
    
    console.log('✅ Cloudinary configurado');
    
    // Teste 1: Verificar conectividade básica
    console.log('\n🔍 Teste 1: Conectividade básica');
    try {
      const result = await cloudinary.search
        .expression('*')
        .max_results(1)
        .execute();
      
      console.log('✅ Conectividade OK');
      console.log(`📊 Total de recursos: ${result.total_count}`);
      
    } catch (error) {
      console.log('❌ Erro de conectividade:', error.message);
      
      if (error.message && error.message.includes('Invalid API key')) {
        console.log('💡 Problema: API Key inválida');
      } else if (error.message && error.message.includes('Invalid API secret')) {
        console.log('💡 Problema: API Secret inválido');
      } else if (error.message && error.message.includes('Forbidden')) {
        console.log('💡 Problema: Permissões insuficientes');
      } else if (error.message && error.message.includes('Unauthorized')) {
        console.log('💡 Problema: Não autorizado - verificar permissões');
      } else {
        console.log('💡 Erro inesperado:', error.message || 'Sem mensagem');
      }
      
      return false;
    }
    
    // Teste 2: Busca por tags específicas
    console.log('\n🏷️ Teste 2: Busca por tags');
    const tags = [
      'behind-the-scenes-details',
      'guests-arriving',
      'ceremony-tributes',
      'waltz',
      'the-party-vibes'
    ];
    
    for (const tag of tags) {
      try {
        const result = await cloudinary.search
          .expression(`tags=${tag}`)
          .max_results(5)
          .execute();
        
        console.log(`✅ ${tag}: ${result.total_count} recursos encontrados`);
        
      } catch (error) {
        console.log(`❌ ${tag}: ${error.message}`);
        
        if (error.message.includes('Forbidden') || error.message.includes('Unauthorized')) {
          console.log(`💡 Problema de permissões para tag: ${tag}`);
        }
      }
    }
    
    // Teste 3: Verificar recursos específicos
    console.log('\n📸 Teste 3: Verificar recursos específicos');
    try {
      const result = await cloudinary.search
        .expression('folder:annapinkerman-site-photos')
        .max_results(5)
        .execute();
      
      console.log(`✅ Pasta encontrada: ${result.total_count} recursos`);
      
      if (result.resources && result.resources.length > 0) {
        const firstResource = result.resources[0];
        console.log(`📸 Primeiro recurso: ${firstResource.public_id}`);
        console.log(`🔗 URL: ${firstResource.secure_url}`);
      }
      
    } catch (error) {
      console.log(`❌ Erro verificando pasta: ${error.message}`);
    }
    
    console.log('\n🎉 Teste de permissões concluído!');
    return true;
    
  } catch (error) {
    console.log('\n💥 Erro geral:', error.message);
    console.log('Detalhes:', {
      name: error.name,
      code: error.code,
      status: error.status,
      http_code: error.http_code
    });
    return false;
  }
}

// Executar teste
if (require.main === module) {
  testPermissions().catch(console.error);
}

module.exports = { testPermissions };
