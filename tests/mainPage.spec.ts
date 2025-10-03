import { test, expect, Page, Locator } from '@playwright/test';

interface Elements{
  locator: (page:Page)=> Locator,
  name: string,
  text?: string,
  attribute?: {
    type: string,
    value: string
  };
}


const elements: Elements[]=[
  {
    locator: (page:Page): Locator=>page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name:'Playwright logo',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/'
    }
  },
  {
    locator: (page:Page): Locator=>page.getByRole('link', { name: 'Docs' }),
    name:'Docs link',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro'
    }
  },
  {
    locator: (page:Page): Locator=>page.getByRole('link', { name: 'API' }),
    name:'API link',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright'
    }
  },
  {
    locator: (page:Page): Locator=>page.getByRole('button', { name: 'Node.js' }),
    name:'Node.js button',
    text: 'Node.js'
  },
  {
    locator: (page:Page): Locator=>page.getByRole('link', { name: 'Community' }),
    name:'Community link',
    text: 'Community',
    attribute: {
      type: 'href',
      value: '/community/welcome'
    }
  },
  {
    locator: (page:Page): Locator=>page.getByRole('link', { name: 'GitHub repository' }),
    name:'Github icon',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright'
    }
  },
  {
    locator: (page:Page): Locator=>page.getByRole('link', { name: 'Discord server' }),
    name:'Discord icon',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord'
    }
  },
  {
    locator: (page:Page): Locator=>page.getByRole('button', { name: 'Switch between dark and light' }),
    name:'Light-mode icon'
  },
  {
    locator: (page:Page): Locator=>page.getByRole('button', { name: 'Search (Command+K)' }),
    name:'Search input'
  },
  {
    locator: (page:Page): Locator=>page.getByRole('heading', { name: 'Playwright enables reliable' }),
    name:'Title',
    text: 'Playwright enables reliable end-to-end testing for modern web apps.'
  },
  {
    locator: (page:Page): Locator=>page.getByRole('link', { name: 'Get started' }),
    name:'Get Started',
    text:'Get started',
    attribute: {
      type: 'href',
      value: '/docs/intro'
    }
  }
]


test.describe('Tests of the Main Page', ()=>{
  test.beforeEach(async({page})=>{
    await page.goto('https://playwright.dev/');
  })
  test('Checking navigation elements of the header', async ({ page }) => {
    elements.forEach(({locator, name})=>{
      test.step(`Checking Playwright ${name}`, async()=>{
        await expect(locator(page)).toBeVisible();   
      })
    })
});



test('Checking elements name of the header', async ({ page }) => {
  elements.forEach(({locator, name, text})=>{
    if(text){
      test.step(`Checking headers ${text}`, async()=>{
      await expect(locator(page)).toContainText(text);
      })
    }
  });
    });

test('Checking attributes href of the header', async ({ page }) => {
  elements.forEach(({locator, name, attribute})=>{
    if(attribute){
      test.step(`Checking attributes ${name}`, async()=>{
        await expect(locator(page)).toHaveAttribute(attribute.type, attribute.value);
      })
    }
  });
  });


test('Checking light mode transition', async ({ page }) => {
  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
});





})

