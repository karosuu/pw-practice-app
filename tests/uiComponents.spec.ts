import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')   
  })

  test.describe('Form Layouts page', () => {
    test.beforeEach( async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click() 
    })

    test("Input fields",  async({page}) => { 
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Usign the grid"}).getByRole('textbox', {name: "Email"})

        await usingTheGridEmailInput.fill('test@tets.com')
        await usingTheGridEmailInput.clear()
    
    })

})
   
   

