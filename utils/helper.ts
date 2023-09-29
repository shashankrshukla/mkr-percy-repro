import { BrowserContext, Page, Locator, expect } from "@playwright/test";


export class Helper {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async clickOnElement(selector: string) {
        const el: Locator = await this.page.locator(selector);
        await el.waitFor({ state: "visible" })
        await el.scrollIntoViewIfNeeded()
        await el.click();
    }


    async toBeVisible(selector: string) {
        const el: Locator = await this.page.locator(selector);
        await expect(el).toBeVisible();
    }

    async toBeNotVisible(selector: string, defaultTimeout = 5000) {
        const el: Locator = await this.page.locator(selector);
        await expect(el).toBeHidden({ timeout: defaultTimeout });
    }

    async setViewport(w: number, h: number) {
        await this.page.setViewportSize({ width: w, height: h });
    }

    async forceClickOnElement(selector: string) {
        const el: Locator = await this.page.locator(selector);
        await el.waitFor({ state: "visible" })
        await el.scrollIntoViewIfNeeded()
        await el.click({ force: true });
    }

    async waitForNavigation(timeout: number = 7000) {
        const timeoutPromise = new Promise((resolve) => setTimeout(resolve, timeout));
        const navigationPromise = this.page.waitForLoadState("networkidle");
        await Promise.race([timeoutPromise, navigationPromise]);
    }

    async waitForDomContentToLoad(timeout: number = 7000) {
        const timeoutPromise = new Promise((resolve) => setTimeout(resolve, timeout));
        const navigationPromise = this.page.waitForLoadState("domcontentloaded");
        await Promise.race([timeoutPromise, navigationPromise]);
    }

    async waitForPageLoad(timeout: number = 7000) {
        const timeoutPromise = new Promise((resolve) => setTimeout(resolve, timeout));
        const navigationPromise = this.page.waitForLoadState("load");
        await Promise.race([timeoutPromise, navigationPromise]);
    }

    async getTextOfAnElement(selector: string) {
        const el: Locator = await this.page.locator(selector);
        await el.waitFor({ state: "visible" })
        await el.scrollIntoViewIfNeeded()
        return await el.textContent();
    }
    async getTextOfElements(selector: string) {
        const textArray: string[] = [];
        let element: Locator = await this.page.locator(selector);
        for (const el of await element.elementHandles()) {
            let textOfElements: any = await el.textContent();
            textArray.push(textOfElements);
        }
        return textArray.toString();
    }

    async waitForAttribute(selector: string, iframe?: any) {
        if (iframe == undefined) {
            await this.page.waitForSelector(selector, {
                state: "visible",
                timeout: 10000,
            });
        } else {
            const frame = await this.page.frame(iframe);
            await frame?.waitForSelector(selector);
        }

    };

    async waitForElementToBeDisplayed(selector: string, defaultTimeout = 5000) {
        const el: Locator = this.page.locator(selector);
        await el.waitFor({ state: "visible", timeout: defaultTimeout });
    }

    async waitForElementToNotBeDisplayed(selector: string) {
        const el: Locator = await this.page.locator(selector);
        await el.waitFor({ state: "hidden" });
    }
    async waitForElementToBePresent(selector: string, defaultTimeout = 5000) {
        const el: Locator = this.page.locator(selector);
        await el.waitFor({ state: "attached", timeout: defaultTimeout });
    }

    async waitForElementToNotBePresent(selector: string) {
        const el: Locator = await this.page.locator(selector);
        await el.waitFor({ state: "attached" });
    }

    async takeScreenshot() {
        const screenshot = await this.page.screenshot({ path: "screenshot.png" });
        return screenshot;
    }

    async closeBrowser() {
        await this.page.close();
    }

    async refreshBrowser() {
        await this.page.reload();
    }

    async isAttributePresent(selector: string, attribute: string) {
        const el: Locator = await this.page.locator(selector);
        await this.page.waitForSelector(selector);
        let attrValue: any = await el.getAttribute(attribute);
        if (attrValue !== null) {
            return true;
        } else {
            return false;
        }
    }

    async waitFor(milliseconds: number = 5000): Promise<void> {
        await this.page.waitForTimeout(milliseconds);
    }

    async hoverOnElement(selector: string) {
        const el: Locator = await this.page.locator(selector);
        await el.waitFor({ state: "visible" })
        await el.scrollIntoViewIfNeeded()
        await el.hover();
    }

    async scrollToElement(selector: string) {
        const el: Locator = await this.page.locator(selector);
        await el.waitFor()
        await el.scrollIntoViewIfNeeded();
    }

    async scrollToElementSlow(selector: string) {
        const el: Locator = await this.page.locator(selector);
        el.scrollIntoViewIfNeeded();
    }

    async lazyScrollToBottomOfWebpage() {
        await this.page.evaluate(async () => {
            const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            for (let i = 0; i < document.body.scrollHeight; i += 100) {
                window.scrollTo(0, i);
                await delay(100);
            }
        });
    }
    async lazyScrollToBottomOfWebpageEnhanced() {
        for (let i = 0; i < 10; i++) {
            await this.page.mouse.wheel(0, 500); // Adjust the deltaY value as needed
            await this.page.waitForTimeout(100); // Wait for 100ms before scrolling again
        }
    }

    async scrollOnLazyLoadWebPage(selector: Locator) {
        while (await selector.isVisible()) {
            this.page.mouse.wheel(0, 100)
        }
    }

    async lazyScrollToBottomOfDiv() {
        const targetXPath = '//div[@data-testid="section-content-grid"]/ancestor::div[contains(@class, "QVTW__scroll-smooth")]';
        await this.waitForElementToBeDisplayed(targetXPath);
        await this.page.evaluate(async (xpath) => {
            const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            const targetElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (!(targetElement instanceof HTMLElement)) {
                throw new Error('Element with the specified XPath not found or not an HTMLElement.');
            }
            for (let i = 0; i < targetElement.scrollHeight; i += 100) {
                targetElement.scrollTo(0, i);
                await delay(100);
            }
        }, targetXPath);
    }
    async lazyScrollToBottomOfDivCLP() {
        const targetXPath = '//div[@data-testid="smartnav-drawer"]//div[contains(@class, "QVTW__scroll-smooth")]';
        await this.waitForElementToBeDisplayed(targetXPath);
        await this.page.evaluate(async (xpath) => {
            const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            const targetElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (!(targetElement instanceof HTMLElement)) {
                throw new Error('Element with the specified XPath not found or not an HTMLElement.');
            }
            for (let i = 0; i < targetElement.scrollHeight; i += 100) {
                targetElement.scrollTo(0, i);
                await delay(100);
            }
        }, targetXPath);
    }
    async isEnabled(selector: string) {
        const element: Locator = await this.page.locator(selector);
        return await element.isEnabled();
    }
    async isFocused(selector: string) {
        const element: Locator = await this.page.locator(selector);
        return await element.evaluate(
            (element) => document.activeElement === element
        );
    }
    async isSelected(selector: string) {
        const element: Locator = await this.page.locator(selector);
        return await element.isChecked();
    }
    async getAttributeValue(selector: string, attributeName: string) {
        const el: Locator = await this.page.locator(selector);
        await el.waitFor({ state: "visible" })
        await el.scrollIntoViewIfNeeded()
        return await el.getAttribute(attributeName);
    }

    async getAttributeValues(
        selector: string,
        attributeName: string,
        iframe?: any
    ) {
        const attributeArray: string[] = [];
        if (iframe == undefined) {
            let element: Locator = await this.page.locator(selector);
            for (const el of await element.elementHandles()) {
                let attributeOfElement: any = await el.getAttribute(attributeName);
                attributeArray.push(attributeOfElement);
            }
        } else {
            const element = await this.page.frameLocator(iframe).locator(selector);
            for (const el of await element.elementHandles()) {
                let attributeOfElement: any = await el.getAttribute(attributeName);
                attributeArray.push(attributeOfElement);
            }
        }
        return attributeArray.toString();
    }

    async getCountOfElements(selector: string) {
        const elements: Locator = await this.page.locator(selector);
        return elements.count();
    }


    async keyboardOps(operation) {
        const keyboard = this.page.keyboard;
        if (operation === "down") {
            await keyboard.press("ArrowDown");
        } else if (operation === "up") {
            await keyboard.press("ArrowUp");
        } else if (operation === "enter") {
            await keyboard.press("Enter");
        } else if (operation === "escape") {
            await keyboard.press("Escape");
        }
    }
    async navigateBack() {
        await this.page.goBack();
    }
    async navigateForward() {
        await this.page.goForward();
    }
    async generateRandomNumber() {
        return Math.floor(Math.random() * 1000 + 100).toString();
    }
    async openNewTab(url: string) {
        const context = await this.page.context();
        const newPage = await context.newPage();
        await newPage.goto(url);
    }
    async OpenANewTab() {
        const context = await this.page.context();
        const pagePromise = context.waitForEvent("page");
        await this.page.getByText("open new tab").click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
    }
    async switchToIframe(iframeSelector: string, selector: string) {
        const elements: Locator = await this.page
            .frameLocator(iframeSelector)
            .locator(selector);
        return elements.last();
    }
    async getTextOfAnElementOnIFrame(selector) {
        //await this.page.waitForSelector(selector)
        const el: Locator = await this.page.locator(selector);
        return await el.textContent();
    }
    async enterText(selector: string, text: string) {
        const element = await this.page.waitForSelector(selector);
        await element.type(text);
    }

    async fillText(selector: string, text: string) {
        const element = await this.page.waitForSelector(selector);
        await element.fill(text);
    }

    async clearTextBox(selector: string, replaceValue: string = "") {
        const el: Locator = await this.page.locator(selector);
        await el.fill(replaceValue);
    }

    async manuallyClearTextBox(selector: string, replaceValue: string = "") {
        const el: Locator = await this.page.locator(selector);
        await el.click();
        await el.dblclick();
        await this.page.keyboard.press("Backspace");

    }




    async appendText(selector: string, text: string) {
        const el: Locator = await this.page.locator(selector);
        await this.page.waitForSelector(selector);
        await this.page.keyboard.press("End");
        await el.type(text);
    }

    async getCurrentURL(currentPage: Page) {
        return currentPage.url();
    }

    async getCurrentTitle(currentPage: Page) {
        return currentPage.title();
    }

    async isPresent(selector: string, iframe?: any) {
        if (iframe == undefined) {
            const el = await this.page.$(selector);
            return await el?.isVisible();
        } else {
            const element: Locator = await this.page
                .frameLocator(iframe)
                .locator(selector);
            return await element.isVisible();
        }
    }

    async isDisplayed(selector: Locator) {
        return selector.isVisible();
    }

    async switchBrowserTab(tabIndex: number) {
        // await this.page.context().waitForEvent('page');
        await this.page.waitForTimeout(2000);
        const browserTabs = await this.page.context().pages();
        if (browserTabs.length > tabIndex) {
            await browserTabs[tabIndex].bringToFront();
        } else {
            console.error(
                `There are only ${browserTabs.length} tabs, cannot switch to tab ${tabIndex}`
            );
        }
    }

    async getCSSPropertyValue(
        selector: string,
        propertyName: string,
        iframe?: any
    ) {
        const element: Locator = await this.page
            .frameLocator(iframe)
            .locator(selector);
        const cssPropertyValue = await element.evaluate(
            (el, prop) => window.getComputedStyle(el).getPropertyValue(prop),
            propertyName
        );
        return cssPropertyValue;
    }
    // async closeCurrentTab() {
    //     const context = await this.page.context();
    //     const [currentPage] = await context.pages();
    //     await currentPage.close();
    // }
}