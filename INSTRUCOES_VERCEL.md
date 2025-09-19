# 🚀 Instruções para Configurar no Vercel

## ✅ Status Atual
- **Local**: API funcionando perfeitamente ✅
- **Produção**: Erro 500 - Variáveis não configuradas ❌

## 🔧 Solução: Configurar Variáveis no Vercel

### Passo 1: Acessar o Vercel Dashboard
1. Vá para [vercel.com/dashboard](https://vercel.com/dashboard)
2. Faça login na sua conta
3. Selecione o projeto `annapinkerman-site`

### Passo 2: Configurar Environment Variables
1. Clique em **Settings** (Configurações)
2. No menu lateral, clique em **Environment Variables**
3. Adicione as seguintes variáveis:

#### Variável 1:
- **Name**: `CLOUDINARY_CLOUD_NAME`
- **Value**: `daoxy15hl`
- **Environment**: ✅ Production

#### Variável 2:
- **Name**: `CLOUDINARY_API_KEY`
- **Value**: `327819649288239`
- **Environment**: ✅ Production

#### Variável 3:
- **Name**: `CLOUDINARY_API_SECRET`
- **Value**: `9pNa77zquytcLjFUbjiGR-9q27Y`
- **Environment**: ✅ Production

### Passo 3: Salvar e Fazer Redeploy
1. Clique em **Save** para salvar as variáveis
2. Vá para a aba **Deployments**
3. Clique nos três pontos do último deployment
4. Selecione **Redeploy**
5. Aguarde o deploy completar

### Passo 4: Testar
Após o redeploy, teste os endpoints:

```bash
# Teste de saúde
curl https://annapinkerman-site.vercel.app/api/health

# Teste de fotos
curl https://annapinkerman-site.vercel.app/api/photos/behind-the-scenes-details
```

## 🎯 Resultado Esperado

Após configurar as variáveis e fazer o redeploy:

- ✅ `/api/health` deve retornar `{"status":"ok","cloudinary":{"configured":true}}`
- ✅ `/api/photos/[tag]` deve retornar array de fotos
- ✅ Site funcionando normalmente em produção

## 📋 Checklist

- [ ] Configurar `CLOUDINARY_CLOUD_NAME=daoxy15hl`
- [ ] Configurar `CLOUDINARY_API_KEY=327819649288239`
- [ ] Configurar `CLOUDINARY_API_SECRET=9pNa77zquytcLjFUbjiGR-9q27Y`
- [ ] Marcar todas como "Production"
- [ ] Salvar configurações
- [ ] Fazer redeploy
- [ ] Testar endpoints

## 🆘 Se Algo Der Errado

1. **Verifique se as variáveis estão marcadas como "Production"**
2. **Confirme que o redeploy foi feito após adicionar as variáveis**
3. **Aguarde alguns minutos para o deploy completar**
4. **Teste o endpoint `/api/health` primeiro**

---

**💡 Dica**: As credenciais já foram testadas localmente e funcionam perfeitamente!
