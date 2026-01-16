import { test, expect } from '@playwright/test';
import { NavigationPage } from '..//page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects//formLayoutsPage'
//import { DatepickerPage } from '../page-objects/datepickerPage';
import { PageManager } from '../page-objects/pageManager';
//import { Faker } from '@faker-js/faker/.';
import { faker } from '@faker-js/faker/locale/af_ZA';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('navigation to form page', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async ({ page }) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', ' ')}${faker.number.int(1000)}@test.com`    
    

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutPage().submitUsinmgTheGridFormWithCredentialAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})
    const buffer =  await page.screenshot()
    console.log(buffer.toString('base64'))
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
    await page.locator('nb-card', { hasText: "Inline form" }).screenshot({path:'screenshots/inlineForm.png'})
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10)
    //await pm.onDatepickerPage().selecDatepickerWithRangeFromToday(6, 15)
})  

test.only('testing with argos ci', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
   
})