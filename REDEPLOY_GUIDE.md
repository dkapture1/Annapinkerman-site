# 🚀 Guia de Redeploy - Vercel

## ⚠️ **PROBLEMA ATUAL**
- ✅ Variáveis configuradas no Vercel
- ❌ API ainda retornando erro 500
- 🔄 **NECESSÁRIO: Redeploy**

## 📋 **PASSOS PARA REDEPLOY**

### 1. Acessar Vercel Dashboard
1. Vá para [vercel.com/dashboard](https://vercel.com/dashboard)
2. Faça login na sua conta
3. Selecione o projeto `annapinkerman-site`

### 2. Fazer Redeploy
1. Clique na aba **"Deployments"** (Deployments)
2. Você verá uma lista de deployments
3. Clique nos **três pontos** (⋮) do último deployment
4. Selecione **"Redeploy"** no menu
5. Confirme o redeploy

### 3. Aguardar Deploy
- ⏱️ **Tempo estimado**: 2-5 minutos
- 📊 **Status**: Aparecerá "Building" → "Ready"
- ✅ **Sucesso**: Status ficará verde

## 🔍 **COMO VERIFICAR SE FUNCIONOU**

### Opção 1: Teste Manual
```bash
curl https://annapinkerman-site.vercel.app/api/photos/behind-the-scenes-details
```

**Resultado esperado**: Array de fotos (não erro 500)

### Opção 2: Monitoramento Automático
```bash
node monitor-deploy.js
```

Este script verificará automaticamente quando o deploy estiver funcionando.

## 🎯 **RESULTADO ESPERADO APÓS REDEPLOY**

✅ **API funcionando**:
```json
[
  {
    "public_id": "annapinkerman-site-photos/Anna15years-274_tcmrru",
    "secure_url": "https://res.cloudinary.com/daoxy15hl/image/upload/...",
    "width": 1024,
    "height": 683,
    "tags": []
  }
]
```

❌ **Se ainda der erro**:
```json
{
  "error": "Internal server error",
  "message": "Unknown error"
}
```

## 🆘 **SE AINDA NÃO FUNCIONAR**

1. **Verifique se as variáveis estão marcadas como "Production"**
2. **Confirme que o redeploy foi feito após configurar as variáveis**
3. **Aguarde alguns minutos para propagação**
4. **Verifique os logs do Vercel para erros**

## 📞 **PRÓXIMOS PASSOS**

Após o redeploy bem-sucedido:
1. ✅ API funcionará perfeitamente
2. ✅ Site carregará todas as fotos
3. ✅ Galeria funcionará normalmente

---

**💡 Lembre-se**: As variáveis estão configuradas corretamente. Só precisa do redeploy! 🚀
