import { test, expect } from '@playwright/test';


test.beforeEach(async({page}) => {
    await page.goto('https://uitestingplayground.com/ajax')
    await page.getByText('Forms').click()
    await page.getByText('Button Triggering AJAX Request').click() 
  })

  test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    //await successButton.click()

    //const text = await successButton.textContent()

    await successButton.waitFor({state: "attached"})
    const text = await successButton.allTextContents()

    expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
  })

  test('alternative wait', async({page}) => {
    const successButton = page.locator('.bg-success')

    //wait for elemtn
    //await page.waitForSelector('bg-success')

    //wait for particular responsed
    //await page.waitForResponse('https://uitestingplayground.com/ajax')
     
    // wait for network calls to be completed (not recommended)
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(5000)
    
    const text = await successButton.allTextContents()

    expect(text).toContain('Data loaded with AJAX get request.')    
  })

  test('timeouts', async({page}) => { 
    test.setTimeout(1000)
    const successButton = page.locator('.bg-success')

    await successButton.click({timeout: 16000})



  })