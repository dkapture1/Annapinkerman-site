# 🎨 Instruções para Substituir as Imagens

## 📁 Estrutura de Imagens

Para usar suas imagens reais, substitua os arquivos na pasta `public/images/`:

### 🔄 **Substituições Necessárias:**

1. **`floral-pattern.png`** → **Sua imagem floralnovo** (da pasta download)
   - Formato: PNG (já configurado)
   - Tamanho: 1680KB (imagem de alta qualidade)
   - Status: ✅ **ATUALIZADA** - Nova imagem floral aplicada

2. **`eiffel-tower.svg`** → **Sua imagem Paris1** (da pasta download)
   - Formato recomendado: PNG com transparência
   - Tamanho: 300x600px ou similar
   - Posição: Aparecerá no canto inferior direito como marca d'água

3. **`petal.svg`** → **Sua imagem de pétala** (da pasta download)
   - Formato recomendado: PNG com transparência
   - Tamanho: 25x25px ou similar
   - Uso: Pétalas flutuantes animadas por toda a tela

### 📝 **Como Fazer a Substituição:**

1. **Copie suas imagens** da pasta `download` para `public/images/`
2. **Renomeie-as** para:
   - `floral-pattern.png` (ou .jpg)
   - `paris1.png` (ou .jpg)

3. **Atualize o CSS** em `src/app/globals.css`:

```css
/* Para o fundo principal */
background-image:
  url('/images/paris1.png'), /* Sua imagem Paris1 */
  url('/images/floral-pattern.png'); /* Sua imagem floral */

/* Para as pétalas flutuantes (já está configurado) */
background-image: url('/images/petal.png'); /* Sua imagem de pétala */
```

### 🎯 **Efeitos Aplicados:**

- **Gradiente base**: Rosa Pastel → Lavanda → Dourado Suave
- **Padrão floral**: Repetido por toda a tela (sutil)
- **Torre Eiffel**: Posicionada no canto inferior direito
- **Efeito Parallax**: Fundo fixo durante o scroll
- **Transparência**: Componentes com fundo semi-transparente
- **Tipografia elegante**: Great Vibes (script) + Georgia (serif) + Inter (sans)

### ✨ **Resultado Final:**

Um design romântico e elegante com:
- Fundo gradiente suave
- Padrão floral sutil
- Marca d'água da Torre Eiffel
- Efeito parallax elegante
- Componentes com transparência

---

**💡 Dica:** Se suas imagens tiverem fundo branco, considere removê-lo para melhor integração com o gradiente! 