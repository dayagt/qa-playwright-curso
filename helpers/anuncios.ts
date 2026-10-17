import { Page } from '@playwright/test';

// Dominios de anuncios y analítica que carga practice.expandtesting.com.
// No forman parte de lo que se prueba y, con varias recargas, llegaban a
// bloquear el cierre del navegador (timeout en el teardown del contexto).
// jQuery y las librerías de CDN (code.jquery.com, cdn.jsdelivr.net,
// cdnjs.cloudflare.com) NO se bloquean: el sitio las necesita.
const DOMINIOS_ANUNCIOS =
  /(googlesyndication|googletagmanager|google-analytics|doubleclick|googleadservices|adtrafficquality|fundingchoicesmessages|adservice\.google)/;

export async function bloquearAnuncios(page: Page) {
  await page.route(
    (url) => DOMINIOS_ANUNCIOS.test(url.hostname),
    (route) => route.abort()
  );
}
