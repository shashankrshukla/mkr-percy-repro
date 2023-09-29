import { Page, BrowserContext, Locator, Expect } from '@playwright/test';
import { Helper } from "../../../utils/helper";
import { BasePage } from '../base.page';

let helper: Helper;

export class ClpPage extends BasePage {
    constructor(page: Page) {
        super(page);
        helper = new Helper(this.page);
    }

    //###########################################MOBILE###########################################
    //#############################################################################################
    async navigateToURL(): Promise<void> {
        await this.page.goto("https://showside.maker.co/test/product/index.html?id=-0dCu7-_D&QNConfigId=-0dCu7-_D&QNTabId=navigation");
    }


    private readonly NTH_L1_NAV_HEADER_WITH_TEXT: string = `xpath=(//div[@data-testid="clp-sectionheader-title"])[<param>]`
    async getTextOfLevelOneNthBreadCrumbHeader(index: string): Promise<string> {
        return await this.helper.getTextOfAnElement(this.NTH_L1_NAV_HEADER_WITH_TEXT.replace("<param>", index));
    }
    async clickOnLevelOneNthBreadCrumbHeader(index: string): Promise<void> {
        await this.helper.clickOnElement(this.NTH_L1_NAV_HEADER_WITH_TEXT.replace("<param>", index));
    }

    private readonly SEEALL_LINK_SECTIONHEADER: string = `xpath=//div[text()='<param>']//ancestor::div[@data-testid='clp-sectionheader']//*[@data-testid='clp-sectionheader-link']`
    async clickOnSeeAllLinkOfSectionHeader(text: string): Promise<void> {
        await this.helper.clickOnElement(this.SEEALL_LINK_SECTIONHEADER.replace("<param>", text));
    }

    private readonly LAST_PRODUCT_OF_PLP_PAGE: string = `xpath=(//div[@data-testid='product-card-test-id'])[100]`
    async lazyScrollToEndOfPLPPage(): Promise<void> {
        await this.helper.scrollToElementSlow(this.LAST_PRODUCT_OF_PLP_PAGE)
    }
    private readonly CLP_SECTION1_HEADER_WITH_NAME: string = `xpath=//div[@data-testid = "clp-sectionheader-title"]//div[text()="<param>"]`
    async hoverOnClpSectionHeader(text: string): Promise<void> {
        await this.helper.hoverOnElement(this.CLP_SECTION1_HEADER_WITH_NAME.replace("<param>", text));
    }
    async scrollOnClpSectionHeader(text: string): Promise<void> {
        await this.helper.scrollToElement(this.CLP_SECTION1_HEADER_WITH_NAME.replace("<param>", text));
    }

    private readonly CATEGORY_SECTION_HEADER: string = `xpath=//div[text() = '<param>']//ancestor::div[contains(@id, 'sn-section-container')]//descendant::div[@class='swiper-button-next']`
    async clickOnCategorySectionSliderRight(text: string): Promise<void> {
        await this.helper.clickOnElement(this.CATEGORY_SECTION_HEADER.replace("<param>", text))
    }

}