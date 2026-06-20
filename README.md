# Portafolio — Ezequiel Jiménez Rodríguez

Sitio estático construido con [Astro](https://astro.build), pensado para GitHub Pages.
Muestra automáticamente tus repositorios de GitHub y tus videos de YouTube, y tiene
una sección de credenciales (educación + certificaciones) con los datos de tu CV/LinkedIn.
Incluye selector de idioma Español / English sin recargar la página.

## Qué trae

- **GitHub** → `src/lib/github.js` consulta la API pública de GitHub en cada build
  (no requiere API key) y muestra tus 6 repos más recientes (sin forks).
- **YouTube** → `src/lib/youtube.js` lee el feed RSS público de tu canal (tampoco
  requiere API key) y muestra tus últimos videos.
- **LinkedIn** → LinkedIn no tiene una API pública para leer certificados/experiencia
  de un perfil, así que esos datos viven a mano en `src/data/profile.js`. Edítalos
  ahí cuando agregues una certificación nueva.
- **Idioma** → todo el contenido bilingüe vive en el HTML (pares ES/EN) y un botón
  alterna cuál se muestra, guardando tu preferencia en el navegador.
- El sitio se reconstruye solo **todos los días** (vía GitHub Actions) para que los
  repos y videos nuevos aparezcan sin que tengas que hacer nada.

## Requisitos

- Node.js **22.12 o superior** ([nodejs.org](https://nodejs.org))
- Una cuenta de GitHub

## Correrlo en tu computadora

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`. Los cambios en los componentes se ven al instante;
los cambios en `astro.config.mjs` requieren reiniciar `npm run dev`.

> La primera vez que corras `npm install` se generará un archivo `package-lock.json`.
> Súbelo a tu repositorio (no está en `.gitignore`) — así los builds en GitHub
> Actions son más rápidos y reproducibles.

## Personalizar el contenido

Casi todo el texto editable está en **`src/data/profile.js`**: nombre, rol, bio,
ubicación, email, skills, idiomas, educación y certificaciones — cada campo tiene
versión `es` y `en`.

Para agregar una certificación nueva, copia un bloque dentro del arreglo
`certifications` en ese archivo:

```js
{
  title: { es: 'Nombre del curso', en: 'Course name' },
  issuer: 'Quién lo emitió',
},
```

Para cambiar qué repos o videos se muestran, ajusta los filtros en
`src/lib/github.js` (`.slice(0, 6)`) o `src/lib/youtube.js`.

## Publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
   - Si lo llamas **exactamente** `ezilietor.github.io`, tu sitio quedará en la raíz:
     `https://ezilietor.github.io/` — no tienes que tocar nada más.
   - Si le pones otro nombre (por ejemplo `portafolio`), tu sitio quedará en
     `https://ezilietor.github.io/portafolio/` y debes abrir `astro.config.mjs`
     y cambiar `base: '/'` por `base: '/portafolio/'` (con el nombre real de tu repo).
2. Sube este proyecto al repositorio:
   ```bash
   git init
   git add .
   git commit -m "Portafolio inicial"
   git branch -M main
   git remote add origin https://github.com/ezilietor/NOMBRE-DEL-REPO.git
   git push -u origin main
   ```
3. En GitHub, ve a **Settings → Pages** y en "Build and deployment" elige
   **Source: GitHub Actions**. El workflow ya incluido (`.github/workflows/deploy.yml`)
   se encarga del resto: cada `push` a `main` (y también todos los días a las 9am UTC)
   construye el sitio y lo publica.
4. Espera 1–2 minutos y revisa la pestaña **Actions** del repo para ver el progreso.

## Agregar tu foto

El hero actual no usa foto (no tenía una a mano al construirlo). Si quieres añadir una:

1. Pon el archivo de imagen en `public/` (ej. `public/foto.jpg`).
2. En `src/components/Hero.astro`, agrega `<img src="/foto.jpg" alt={profile.name} />`
   dentro de `.hero__inner` y dale estilo en el `<style>` del mismo archivo.

## Por qué LinkedIn no se actualiza solo

LinkedIn no ofrece una API pública para leer el perfil de otra persona (ni el propio
de forma sencilla), y hacer scraping de la página viola sus Términos de Servicio
además de romperse constantemente. Por eso esa sección usa datos a mano en
`src/data/profile.js` — es la única forma estable a largo plazo sin depender de
servicios de terceros no oficiales.

## Estructura del proyecto

```
src/
  components/   componentes de cada sección (Hero, Projects, Videos, etc.)
  data/         profile.js — contenido editable (bio, skills, certificaciones...)
  lib/          github.js y youtube.js — fetch de datos en build-time
  layouts/      Layout.astro — <head>, fuentes, lógica de idioma
  pages/        index.astro — arma la página y dispara los fetch
  styles/       global.css — tokens de diseño (color, tipografía, espaciado)
```

## Problemas comunes

- **El sitio se ve sin estilos en GitHub Pages pero bien en local** → revisa que
  `base` en `astro.config.mjs` coincida con el nombre real de tu repositorio
  (ver paso 1 de "Publicarlo en GitHub Pages").
- **No aparecen repos o videos** → la API de GitHub tiene un límite de 60
  solicitudes/hora sin autenticación; si el build falla por eso, espera y vuelve a
  correr el workflow manualmente desde la pestaña Actions ("Run workflow").
- **Quiero que el toggle de idioma recuerde la preferencia entre visitas** → ya lo
  hace, vía `localStorage` del navegador del visitante.
