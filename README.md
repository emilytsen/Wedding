# Natã & Emily — 14.11.2026

Site do casamento de **Natã & Emily** · Sítio São Fernando, Vera Cruz - SP.
Tema **tropical & romântico**. Site estático (HTML, CSS e JavaScript), sem
necessidade de build.

## Ver o site no ar (GitHub Pages)

Para publicar gratuitamente em `https://emilytsen.github.io/Wedding/`:

1. Acesse **Settings → Pages** no repositório do GitHub.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Pronto! A cada `git push` na branch `main`, o site é publicado automaticamente
   (veja o progresso na aba **Actions**).

## Estrutura

```
index.html              página principal
css/style.css           estilos (cores, fontes, layout)
js/main.js              contagem regressiva, menu, RSVP, copiar PIX
images/                 suas fotos (veja images/LEIA-ME.txt)
.github/workflows/      deploy automático no GitHub Pages
```

## O que ainda falta personalizar

Procure por `TODO Emily` dentro do `index.html` — cada um marca um ponto a ajustar:

- **Fotos** → adicionar arquivos em `images/` e ativar as `<img>` (veja `images/LEIA-ME.txt`).
- **Nossa História** → trocar o texto pela história de vocês.
- **Cronograma** → conferir os horários em "O Grande Dia".
- **Presentes** → colocar a **chave PIX** real e o **link da lista** de presentes.
- **RSVP** → escolher como receber confirmações:
  - **Formspree** (recebe por e-mail): crie um formulário em https://formspree.io
    e troque `SEU_ID` no atributo `action` do `<form id="rsvpForm">`.
  - **WhatsApp**: troque `55SEUNUMERO` no botão do WhatsApp pelo número real
    (formato: 55 + DDD + número).

## Rodar localmente

Abra o `index.html` no navegador, **ou** rode um servidor simples:

```bash
# Python
python -m http.server 8000
# depois abra http://localhost:8000
```
