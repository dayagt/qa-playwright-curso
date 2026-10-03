import { test as base, expect } from '../fixtures';



type MisFixtures = {
  cronometro: void;
};

const test = base.extend<MisFixtures>({
  cronometro: async ({}, use) => {
    const inicio = Date.now();

    console.log('Cronómetro iniciado');

    
    await use();

    
    const tiempo = Date.now() - inicio;

    console.log(`Tiempo del test: ${tiempo} ms`);
  },
});

test(
  'Reto 1 - Fixture con teardown',
  async ({ page, cronometro }) => {
    await page.goto('https://www.saucedemo.com');

    await expect(
      page.locator('#login-button')
    ).toBeVisible();

    console.log('Reto 1 completado');
  }
);




type WorkerFixtures = {
  contador: number;
};

const testWorker = base.extend<{}, WorkerFixtures>({
  contador: [
    async ({}, use) => {
      let valor = 0;

      await use(valor);

      console.log('Worker finalizado');
    },
    { scope: 'worker' },
  ],
});



const contadorWorker = { valor: 0 };

testWorker.describe(
  'Reto 2 - Fixture worker',
  () => {

    testWorker(
      'Reto 2.1 - contador en 1',
      async () => {

        contadorWorker.valor++;

        expect(contadorWorker.valor).toBe(1);

        console.log(
          `Primer test: contador = ${contadorWorker.valor}`
        );
      }
    );

    testWorker(
      'Reto 2.2 - contador en 2',
      async () => {

        contadorWorker.valor++;

        expect(contadorWorker.valor).toBe(2);

        console.log(
          `Segundo test: contador = ${contadorWorker.valor}`
        );
      }
    );
  }
);




const viewports = [
  {
    nombre: 'móvil',
    width: 375,
    height: 667,
  },
  {
    nombre: 'escritorio',
    width: 1280,
    height: 720,
  },
];

for (const viewport of viewports) {

  test.describe(
    `Reto 3 - ${viewport.nombre}`,
    () => {

      test.use({
        viewport: {
          width: viewport.width,
          height: viewport.height,
        },
      });

      test(
        `Login en ${viewport.nombre}`,
        async ({ page }) => {

          await page.goto(
            'https://www.saucedemo.com'
          );

          await expect(
            page.locator('#login-button')
          ).toBeVisible();

          console.log(
            `Viewport: ${viewport.width}x${viewport.height}`
          );
        }
      );
    }
  );
}