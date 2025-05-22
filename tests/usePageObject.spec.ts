import { test, expect } from '@playwright/test';
import { NavigationPage } from '..//page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects//formLayoutsPage'
import { DatepickerPage } from '../page-objects/datepickerPage';
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
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

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutPage().submitUsinmgTheGridFormWithCredentialAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox('john Smith', 'john@test.com', true)
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10)
   // await pm.onDatepickerPage().selecDatepickerWithRangeFromToday(6, 15)
})