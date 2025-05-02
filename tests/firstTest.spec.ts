import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('http://localhost:4200/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click() 
})

test('Locator syntax rules', async({page}) => {
  //* by Tag name
  await page.locator('input')
 

  //*by Id
  await page.locator('#inputEmail1')

  //*by value
  await page.locator('.shape-rectangle')

  //*by attribuite
  await page.locator('[placeholder=Email"]')

  //*by Class value
  await page.locator('[input-full-width size-medium status-basic shape-rectangle nb-transition]')

  //*combine differet selectiors (full)
  await page.locator('input[placeholder=Email"][nbinput]')

    //*by Xpath (NOT RECOMMMENDED)
  await page.locator('//*[@id="inputEmail1"]')

    //*by partial text match
   await page.locator(':text("Using")')

   //* byt exact match
   page.locator(':text-("Using the Grid")')

})

test('User facing locators', async({page}) => {
await page.getByRole('textbox', {name: "Email"}).first().click()
await page.getByRole('button', {name: "Sign in"}).first().click()

await page.getByLabel('Email').first().click()

await page.getByPlaceholder('Jane Doe').click()

await page.getByText('Using the Grid').click()

await page.getByTestId('SignIn')

await page.getByTitle('IoT Dashboard').click()


})

test('Locating child elements', async({page}) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

  await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

  await page.locator('nb-card').nth(3)  
  })
  