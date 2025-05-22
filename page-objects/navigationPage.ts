import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase"

// to add the helper base we use "etedns HelperBase"
export class NavigationPage extends HelperBase {

    // Delete the readonly and add "Super(page) to use the helper base
    //readonly page: Page

    constructor(page: Page) {
        super(page)
    }

    async formLayoutsPage() {
        await this.seletGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSeconds(2)
    }

    async datepickerPage() {
        await this.seletGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage() {
        await this.seletGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage() {
        await this.seletGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage() {
        await this.seletGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async seletGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == "false")
            await groupMenuItem.click()
    }
}