import { Locator, Page } from "@playwright/test";

export class NavigationPage {

    readonly page: Page
    readonly fromLayoutMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page) {
        this.page = page
        this.fromLayoutMenuItem = this.page.getByText('Form Layouts')
        this.datePickerMenuItem = this.page.getByText('Datepicker')
        this.smartTableMenuItem = this.page.getByText('Smart Table')
        this.toastrMenuItem = this.page.getByText('Toastr')
        this.tooltipMenuItem = this.page.getByText('Tooltip')
    }

    async formLayoutsPage() {
        await this.seletGroupMenuItem('Forms')
        await this.fromLayoutMenuItem.click()
    }

    async datepickerPage() {
        await this.seletGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
        await this.datePickerMenuItem.click()
    }

    async smartTablePage() {
        await this.seletGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()
    }

    async toastrPage() {
        await this.seletGroupMenuItem('Modal & Overlays')
        await this.toastrMenuItem.click()
    }

    async tooltipPage() {
        await this.seletGroupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()
    }

    private async seletGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == "false")
            await groupMenuItem.click()
    }
}