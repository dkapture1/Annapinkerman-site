# 📚 Histórico de Desenvolvimento - Anna Pinkerman Site

## 🎯 Visão Geral do Projeto

**Projeto**: Site oficial de Anna Pinkerman - Sweet Fifteen Celebration  
**Tecnologia**: Next.js 15.5.2 com TypeScript  
**Deploy**: Vercel  
**CDN de Imagens**: Cloudinary  
**Data**: 19 de Setembro de 2025  

---

## 🗓️ 04 de Dezembro de 2025 - Nova Galeria "Prélude à Paris" e Atualizações de Conteúdo

### Funcionalidades Adicionadas
1.  **Nova Galeria de Fotos**: Adicionada a seção "Prélude à Paris" (`prelude-a-paris`) para exibir fotos do ensaio pré-aniversário.
2.  **Atualização de Conteúdo**: Textos da seção "Sobre Mim" (`AboutMe.tsx`) foram atualizados com novas informações sobre a família, hobbies e história.
3.  **Migração de Mídia**:
    - Criados scripts Python (`scripts/migrate_local_photos.py` e `scripts/migrate_local_videos.py`) para facilitar o upload de arquivos locais para o Cloudinary.
    - Implementada compressão automática de imagens para respeitar os limites do plano gratuito do Cloudinary.
4.  **Otimização de Performance**:
    - O componente `MasonryGrid` foi atualizado para solicitar imagens otimizadas (`w_800,q_auto,f_auto`) do Cloudinary, resolvendo problemas de carregamento e renderização de imagens grandes.

### Arquivos Modificados
- `src/lib/photo-data.ts`: Configuração da nova galeria.
- `src/components/AboutMe.tsx`: Atualização de textos.
- `src/components/MasonryGrid.tsx`: Fix de otimização de imagens.
- `scripts/`: Novos scripts de migração.

---

## 🗓️ 21 de Setembro de 2025 - Debug de Responsividade Mobile

### Problema
O site não estava se adaptando corretamente em dispositivos móveis (especificamente iPhone 15 Pro), exibindo a versão de desktop.

### Diagnóstico e Solução

1.  **Análise Inicial**: Verificado o `layout.tsx` e confirmado que a meta tag `viewport` estava configurada corretamente para Next.js.
2.  **Teste de Media Query**: Um teste visual foi adicionado diretamente em `src/app/layout.tsx` para isolar o problema. Este teste adicionou uma barra vermelha no topo da tela em viewports menores que 430px.
    ```html
    <style>
      {`
        @media (max-width: 430px) {
          .mobile-test {
            display: block !important;
            background: red;
            /* ... outros estilos de teste ... */
          }
        }
      `}
    </style>
    <div class="mobile-test" style="display: none;">Mobile CSS Test</div>
    ```
3.  **Confirmação**: O teste visual funcionou, indicando que as media queries estavam sendo processadas corretamente, mas algo no CSS global estava impedindo a responsividade.
4.  **Causa Raiz**: Foi identificado que a regra `* { max-width: 100vw; }` em `globals.css` estava causando um conflito e impedindo o layout de se ajustar corretamente em telas menores.
5.  **Solução**: A regra problemática foi removida de `globals.css`.
6.  **Limpeza**: Após a confirmação de que a responsividade estava funcionando, o código de teste (barra vermelha) foi removido de `src/app/layout.tsx`.

### Commits Relevantes

- `f83ff53` - refactor: remove mobile debug test code (2025-09-21 11:48:05 -0600)
- `189c99a` - feat: add robust media query test for mobile debugging (2025-09-21 11:40:49 -0600)
- `5b3b9a1` - fix(css): Remove aggressive max-width from universal selector (2025-09-21 11:08:28 -0600)

---

## 🚨 Problemas Identificados e Soluções (Histórico Anterior)

### **Problema Principal**: Fotos não aparecem em produção (Resolvido)

#### **Sintomas**:
- ✅ Desenvolvimento: Fotos funcionam perfeitamente.
- ❌ Produção: A API retornava erro `500` e as fotos não carregavam.

#### **Investigação e Solução (Passo a Passo)**:

1.  **Diagnóstico Inicial**:
    *   **Suspeita**: Problema com as variáveis de ambiente (`CLOUDINARY_...`) na Vercel.
    *   **Ação**: Adicionados logs detalhados na API Route (`src/app/api/photos/[tag]/route.ts`) para inspecionar as variáveis e os erros em produção.

2.  **Análise dos Logs da Vercel**:
    *   **Descoberta**: Os logs de erro mostraram a mensagem `unknown api_key` e revelaram que as variáveis de ambiente estavam sendo lidas com caracteres de quebra de linha (`\n` e `%0A`) no final.
    *   **Causa Raiz**: Copiar e colar as variáveis no painel da Vercel incluiu caracteres ocultos, tornando-as inválidas.

3.  **Correção Aplicada**:
    *   **Solução**: As variáveis de ambiente no painel da Vercel foram apagadas e **digitadas manualmente** para garantir que não havia espaços ou caracteres ocultos.
    *   **Resultado**: A API passou a retornar status `200`, indicando que a conexão com o Cloudinary foi bem-sucedida.

4.  **Problema Secundário (Frontend)**:
    *   **Sintoma**: Mesmo com a API funcionando, as fotos ainda não apareciam.
    *   **Suspeita**: Problema de cache no navegador ou na CDN da Vercel.
    *   **Ação**: Adicionados `console.log` no componente `PhotoGallery.tsx` para verificar os dados recebidos no lado do cliente.
    *   **Solução Final**: Forçar a limpeza do cache do navegador (`Cmd/Ctrl + Shift + R`) e fazer um novo deploy na Vercel com a opção de limpar o cache de build resolveu o problema de exibição.

#### **Conclusão**:
O problema foi resolvido em duas etapas:
1.  **Correção das variáveis de ambiente na Vercel**, eliminando caracteres ocultos.
2.  **Limpeza de cache** para garantir que o frontend buscasse e exibisse os dados mais recentes.

---

*Documento criado em: 19 de Setembro de 2025*  
*Última atualização: 21 de Setembro de 2025*