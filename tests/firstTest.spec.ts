import { test, expect } from '@playwright/test';
import { emit } from 'process';

test.beforeEach(async({page}) => {
  await page.goto('/')
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

  await page.locator('nb-card').nth(3).getByRole('button').click()
  })
  
  test('Locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: ("Sign In")}).getByRole('textbox', {name: "Email"}).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
  })
    
  test('Reusing locators', async({page}) => {
    const basicForm = await page.locator('nb-card').filter({hasText: "Basic Form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')

  })

  test('Extracting values', async({page}) => {
    //*single test value
    const basicForm = await page.locator('nb-card').filter({hasText: "Basic Form"})
    const buttonText = await basicForm.locator('button').textContent()

    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
  })

  test('Assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: ("Basic Form")}).locator('button')
    //General assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft assertion
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()
  
  })

  