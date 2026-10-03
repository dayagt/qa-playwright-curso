import {test, test as base, expect } from '@playwright/test';


type TimerFixtures = {
  cronometro: void;
};

const testCronometro = base.extend<TimerFixtures>({
  cronometro: async ({}, use, testInfo) => {
    
    const inicio = Date.now();

    console.log(`Cronómetro iniciado: ${testInfo.title}`);

    try {
      // Ejecuta el test
      await use();
    } finally {
      
      const duracion = Date.now() - inicio;

      console.log(
        `Teardown: "${testInfo.title}" tardó ${duracion} ms`
      );
    }
  },
});

testCronometro(
  'Reto 1 - Fixture con teardown real',
  async ({ page, cronometro }) => {
    await page.goto('https://www.saucedemo.com');

    
    await expect(page.locator('#login-button')).toBeVisible();
  }
);




type WorkerFixtures = {
  contadorWorker: {
    valor: number;
  };
};

const testWorker = base.extend<{}, WorkerFixtures>({
  contadorWorker: [
    async ({}, use) => {
      
      const contador = {
        valor: 0,
      };

      console.log('Fixture worker iniciado');

      await use(contador);

      console.log(
        `Fixture worker finalizado con contador: ${contador.valor}`
      );
    },
    { scope: 'worker' },
  ],
});

testWorker.describe('Reto 2 - Fixture de alcance worker', () => {
  
  testWorker.describe.configure({ mode: 'serial' });

  testWorker(
    'Reto 2.1 - El contador inicia en 1',
    async ({ contadorWorker }) => {
      contadorWorker.valor++;

      expect(contadorWorker.valor).toBe(1);
    }
  );

  testWorker(
    'Reto 2.2 - El contador aumenta a 2',
    async ({ contadorWorker }) => {
      contadorWorker.valor++;

      expect(contadorWorker.valor).toBe(2);
    }
  );
});



const viewports = [
  {
    nombre: 'móvil',
    viewport: {
      width: 375,
      height: 812,
    },
  },
  {
    nombre: 'escritorio',
    viewport: {
      width: 1366,
      height: 768,
    },
  },
];

for (const escenario of viewports) {
  test.describe(
    `Reto 3 - Prueba en ${escenario.nombre}`,
    () => {
      test.use({
        viewport: escenario.viewport,
      });

      test(
        `Reto 3 - Login visible en ${escenario.nombre}`,
        async ({ page }) => {
          await page.goto('https://www.saucedemo.com');

          await expect(
            page.locator('#login-button')
          ).toBeVisible();
        }
      );
    }
  );
}