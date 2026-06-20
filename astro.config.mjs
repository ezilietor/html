import { defineConfig } from 'astro/config';

// --------------------------------------------------------------------------
// GitHub Pages config
// --------------------------------------------------------------------------
// Opción A (recomendada): crear un repositorio llamado EXACTAMENTE
//   ezilietor.github.io
// y subir este proyecto ahí. GitHub Pages lo publicará en la raíz:
//   https://ezilietor.github.io/
// En ese caso, deja "site" y "base" como están abajo.
//
// Opción B: subirlo a un repositorio con OTRO nombre, por ejemplo
//   portafolio
// Entonces GitHub Pages lo publica en una subcarpeta:
//   https://ezilietor.github.io/portafolio/
// En ese caso cambia las dos líneas de abajo a:
//   site: 'https://ezilietor.github.io',
//   base: '/portafolio/',
// (sustituye "portafolio" por el nombre real de tu repositorio)
// --------------------------------------------------------------------------

export default defineConfig({
  site: 'https://ezilietor.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'ignore',
});
