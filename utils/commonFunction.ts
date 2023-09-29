import { expect, Locator, Page, request, BrowserContext } from "@playwright/test";
import { Helper } from "./helper";
import percySnapshot from '@percy/playwright';
export class CommonFunction {
    readonly page: Page;
    readonly helper: Helper;
    readonly context: BrowserContext;

    constructor(page: Page) {
        this.page = page;
        this.context = this.context;
        this.helper = new Helper(this.page);
    }

    async takePercySnapshot(testName: string) {
        await this.helper.waitForDomContentToLoad(10000)
        await this.helper.waitForPageLoad(10000)
        await this.helper.waitForNavigation(10000);
        await this.scrollToBottom()
        await this.helper.waitFor(5000);
        await percySnapshot(this.page, `${testName}`);
    }
    async scrollToBottom() {
        await this.helper.lazyScrollToBottomOfWebpageEnhanced();
    }
}