import { Page, BrowserContext, Locator } from '@playwright/test';
import { Helper } from "../../../utils/helper";
import { BasePage } from '../base.page';

let helper: Helper;

export class QvPage extends BasePage {

    constructor(page: Page) {
        super(page);
        helper = new Helper(this.page);
    }
    private readonly NTH_QV_CARD_OF_HOMEPAGE_HEADER_WITH_NAME: string = `xpath=(//div[text() = '<param1>']//parent::div//preceding::div[contains(@id, 'sn-section-content')]//div[@data-testid='category-card-test-id'])[<param2>]`
    async hoverOnNthQVCardUnderHeadingName(text: string, index: string): Promise<void> {
        await this.helper.hoverOnElement(this.NTH_QV_CARD_OF_HOMEPAGE_HEADER_WITH_NAME.replace("<param1>", text).replace("<param2>", index));
    }
    async clickOnNthQVCardUnderHeadingName(text: string, index: string): Promise<void> {
        await this.helper.clickOnElement(this.NTH_QV_CARD_OF_HOMEPAGE_HEADER_WITH_NAME.replace("<param1>", text).replace("<param2>", index));
    }
    private readonly NTH_QV_PIN_CIRCLE: string = `xpath=((//div[@data-testid='category-card-test-id'])[<param1>]//div[@data-pin-id])[<param2>]`
    async clickOnNthQVPinOnCard(productCardIndex: string, pinIndex: string): Promise<void> {
        await this.helper.clickOnElement(this.NTH_QV_PIN_CIRCLE.replace("<param1>", productCardIndex).replace("<param2>", pinIndex));
    }


    private readonly PRODUCTS_IN_THIS_IMAGE_WITH_NAME: string = `xpath=//div[@data-testid='product-listitem-test-id']//div[text()='<param1>']`
    async clickProductsInThisImageWithName(productName: string): Promise<void> {
        await this.helper.clickOnElement(this.PRODUCTS_IN_THIS_IMAGE_WITH_NAME.replace("<param1>", productName));
    }

    async productsInThisImageWithNameIsVisible(productName: string): Promise<void> {
        await this.helper.toBeVisible(this.PRODUCTS_IN_THIS_IMAGE_WITH_NAME.replace("<param1>", productName));
    }

    private readonly PRODUCTS_TITLE_ON_QV_PAGE_TEXT: string = `xpath=//div[@data-testid='pdp-product-title' and text()='<param1>']`
    async clickOnTitleOfProductInQVPage(productName: string): Promise<void> {
        await this.helper.clickOnElement(this.PRODUCTS_TITLE_ON_QV_PAGE_TEXT.replace("<param1>", productName));
    }
    private readonly GET_PRODUCT_TITLE_ON_QV_PAGE_TEXT: string = `xpath=//div[@data-testid='pdp-product-title']`
    async getTitleOfProductInQVPage(): Promise<string> {
        return await this.helper.getTextOfAnElement(this.GET_PRODUCT_TITLE_ON_QV_PAGE_TEXT);
    }

    private readonly QV_ADD_TO_CART_BUTTON: string = `xpath=(//div[@data-testid='open-link-label' and text()='Add to Cart'])[1]`
    async clickOnQVAddToCartButton(): Promise<void> {
        await this.helper.forceClickOnElement(this.QV_ADD_TO_CART_BUTTON);
    }

    private readonly EXTERNAL_ADD_TO_CART_POPUP: string = `xpath=//*[text()='Add to cart function was called with these arguments:']`
    async externalAddToCartPopUpVisible(): Promise<void> {
        await this.helper.toBeVisible(this.EXTERNAL_ADD_TO_CART_POPUP);
    }

    private readonly SIZE_ERROR: string = `xpath=//div[@data-testid='pdp-size-error']`
    async verifySizeNotSelectedErrorIsVisible(): Promise<void> {
        await this.helper.toBeVisible(this.SIZE_ERROR);
    }
    private readonly VIEW_DETAILS_BUTTON_ON_PDP: string = `xpath=//div[@data-section-id="cta buttons"]//div[@data-testid="pdp-button-open-link"]`
    async clickOnViewDetailsButton(): Promise<void> {
        await helper.clickOnElement(this.VIEW_DETAILS_BUTTON_ON_PDP)
    }
    async verifyViewDetailsButtonIsPrimaryOrSecondary(): Promise<string> {
        return await this.helper.getAttributeValue(this.VIEW_DETAILS_BUTTON_ON_PDP, 'data-id');
    }

    // private readonly PDP_ADD_TO_CART_BUTTON: string = `xpath=//div[@data-testid="pdp-button-add-to-cart"]`
    // async verifyAddToCartButtonIsPrimaryOrSecondary(): Promise<string> {
    //     return await this.helper.getAttributeValue(this.PDP_ADD_TO_CART_BUTTON, 'data-id');
    // }
    private readonly INCREASE_QUANTITIY_PLUS_BUTTON: string = `xpath=//div[@role='button' and text()='+']`
    async clickOnIncreaseQuantityPlusButton(): Promise<void> {
        await helper.clickOnElement(this.INCREASE_QUANTITIY_PLUS_BUTTON)
    }

    private readonly INFO_ON_PDP: string = `xpath=//div[@data-testid="pdp"]//p[text()='<param>']`
    async validateInfoOnPdp(info: string): Promise<void> {
        await helper.toBeVisible(this.INFO_ON_PDP.replace('<param>', info))
    }

    private readonly MOBILE_INFO_ON_QV_PDP: string = `xpath=//div[@data-testid="pull-down-modal"]//p[text()='<param>']`
    async validateInfoOnPdpMobile(info: string): Promise<void> {
        await helper.toBeVisible(this.MOBILE_INFO_ON_QV_PDP.replace('<param>', info))
    }

    private readonly VIEW_PRODUCT_ON_QV_CARD: string = `xpath=(//div[@data-testid="category-card-test-id"])[<param>]//div[text()='View Products']`
    async verifyViewProductOnQVCardIsNotVisible(index: string): Promise<void> {
        await helper.toBeNotVisible(this.VIEW_PRODUCT_ON_QV_CARD.replace('<param>', index), 10000)
    }
    async verifyViewProductOnQVCardIsVisible(index: string): Promise<void> {
        await helper.toBeVisible(this.VIEW_PRODUCT_ON_QV_CARD.replace('<param>', index))
    }
    async clickViewProductOnQVCard(index: string): Promise<void> {
        await helper.clickOnElement(this.VIEW_PRODUCT_ON_QV_CARD.replace('<param>', index))
    }

    private readonly PIN_WITH_INDEX: string = `xpath=(//div[@data-testid='qv-pin'])[<param>]`
    async clickOnPinIndex(index: string): Promise<void> {
        await helper.clickOnElement(this.PIN_WITH_INDEX.replace('<param>', index))
    }
    async hoverOnPinIndex(index: string): Promise<void> {
        await helper.hoverOnElement(this.PIN_WITH_INDEX.replace('<param>', index))
    }
    private readonly PRODUCT_STACK_WITH_INDEX: string = `xpath=(//div[@data-testid="qv-product-stack-item"])[<param>]`
    async hoverOnProductStackOnQV(index: string): Promise<void> {
        await helper.hoverOnElement(this.PRODUCT_STACK_WITH_INDEX.replace('<param>', index))
    }
    async clickOnProductStackOnQV(index: string): Promise<void> {
        await helper.clickOnElement(this.PRODUCT_STACK_WITH_INDEX.replace('<param>', index))
    }

    private readonly PRODUCTNAME_FROM_PRODUCT_STACKONCLP: string = `xpath=((//div[@data-testid='category-card-test-id'])[<param1>]//div[@data-testid='qv-product-stack-item'])[<param2>]`
    async productCardWithIndexHasStackWithIndex(productIndex: string, stackIndex: string): Promise<void> {
        await helper.toBeVisible(this.PRODUCTNAME_FROM_PRODUCT_STACKONCLP.replace('<param1>', productIndex).replace('<param2>', stackIndex))
    }

    private readonly PRODUCTNAME_FROM_PRODUCT_STACK: string = `xpath=//div[@data-testid='qv-product-stack-item']//div[@data-testid="product-listitem-title" and text()='<param>']`
    async productWithNameFromProductStackIsVisible(name: string): Promise<void> {
        await helper.toBeVisible(this.PRODUCTNAME_FROM_PRODUCT_STACK.replace('<param>', name))
    }
    private readonly QV_COLLAPSE_PANEL_BUTTON: string = `xpath=//div[@data-testid='qv-collapse-panel-button']`
    async clickOnQVCollapsePanelButton(): Promise<void> {
        await helper.clickOnElement(this.QV_COLLAPSE_PANEL_BUTTON)
    }

    async qVCollapsePanelButtonIsHidden(): Promise<void> {
        await helper.toBeNotVisible(this.QV_COLLAPSE_PANEL_BUTTON)
    }

    private readonly TAP_TO_START_BUTTON: string = `xpath=//div[@data-testid="pdp2-button-tap-to-start"]`
    async clickOnTapToStartButton(): Promise<void> {
        await this.helper.clickOnElement(this.TAP_TO_START_BUTTON);
    }


    private readonly LEARN_MORE_BUTTON: string = `xpath=//div[@data-testid="qv-expand-panel-button"]`
    async clickOnLearnMoreLinkOnQV(): Promise<void> {
        await this.helper.clickOnElement(this.LEARN_MORE_BUTTON);
    }

    private readonly LEARN_MORE_BUTTON_ON_CARD: string = `xpath=//div[@data-testid="qv-expand-media-button"]//div[text()='Learn More']`
    async clickOnLearnMoreLinkOnCLP(): Promise<void> {
        await this.helper.clickOnElement(this.LEARN_MORE_BUTTON_ON_CARD);
    }

    private readonly LEARN_MORE_BUTTON_ON_PRODUCT_LIST_QV: string = `xpath=//a//div[text()= 'Learn More']`
    async clickOnLearnMoreLinkOnProductListOnQV(): Promise<void> {
        await this.helper.clickOnElement(this.LEARN_MORE_BUTTON_ON_PRODUCT_LIST_QV);
    }

    private readonly LEARN_MORE_BUTTON_MOBILE_ON_CARD: string = `xpath=(//div[@data-testid='category-card-test-id'])[<param>]//div[@data-testid="qv-expand-media-button"]`
    async clickOnLearnMoreLinkOfNthCard(index: string): Promise<void> {
        await this.helper.clickOnElement(this.LEARN_MORE_BUTTON_MOBILE_ON_CARD.replace('<param>', index));
    }

    async learnMoreLinkOnCLPIsVisible(): Promise<void> {
        await this.helper.toBeVisible(this.LEARN_MORE_BUTTON_ON_CARD);
    }

    private readonly VIEWPRODUCT_ON_CARD: string = `xpath=(//div[@data-testid='category-card-test-id'])[1]//div[@data-testid="qv-expand-media-button"]`
    async clickOnProductLinkOnCLPForNthCard(postIndex: string): Promise<void> {
        await this.helper.clickOnElement(this.VIEWPRODUCT_ON_CARD.replace('<param>', postIndex));
    }
    async productLinkOnCLPIsVisibleForNthCard(postIndex: string): Promise<void> {
        await this.helper.toBeVisible(this.VIEWPRODUCT_ON_CARD.replace('<param>', postIndex));
    }

    private readonly QV_CLOSE_BUTTON: string = `xpath=//div[@data-testid='qv-close-button']`

    async QVCloseButtonIsVisible(): Promise<void> {
        await this.helper.toBeVisible(this.QV_CLOSE_BUTTON);
    }

    private readonly QV_TAB_WITH_INDEX: string = `xpath=(//div[@data-testid="qv-tab-item"])[<param>]`
    async clickOnNthTabOnQV(index: string): Promise<void> {
        await this.helper.clickOnElement(this.QV_TAB_WITH_INDEX.replace('<param>', index));
    }

    private readonly MEDIA_DESCRIPTION_TEXT: string = `xpath=//div[@data-testid="qv-media-description"]//div`
    async getMediaDescriptionOnQVPage(): Promise<string> {
        return await this.helper.getTextOfAnElement(this.MEDIA_DESCRIPTION_TEXT);
    }

    private readonly PRODUCT_DETAILS_BUTTON: string = `xpath=(//button[@data-testid='pdp-button-product-details'])[1]//span`
    async clickOnProductDetailsOnQVPage(): Promise<void> {
        await this.helper.clickOnElement(this.PRODUCT_DETAILS_BUTTON);
        await this.helper.waitFor(3000)
    }
    private readonly PDP_BUY_NOW_BUTTON: string = `xpath=(//button[text()='Buy Now'])[1]`
    async clickOnBuyNowButtonOnQV(): Promise<void> {
        await this.helper.forceClickOnElement(this.PDP_BUY_NOW_BUTTON);
        await this.helper.waitFor(3000)
    }
    private readonly PDP_BUY_NOW_BUTTON2: string = `xpath=(//button[text()='Buy Now'])[2]`
    async clickOnBuyNowButtonOnQV2(): Promise<void> {
        await this.helper.forceClickOnElement(this.PDP_BUY_NOW_BUTTON2);
        await this.helper.waitFor(3000)
    }
    private readonly PRODUCT_CARD_ON_HOVER: string = `xpath=//div[@data-testid="qv-pin-card"]//div[@data-testid='product-listitem-title' and text()='<param>']`
    async cardWithProductNameVisible(productName: string): Promise<void> {
        await this.helper.toBeVisible(this.PRODUCT_CARD_ON_HOVER.replace('<param>', productName));
    }

    private readonly NTH_HIGHLIGHT: string = `xpath=(//div[@data-testid='category-card-test-id'])[<param>]`
    async clickOnNthHighlight(index: string): Promise<void> {
        await this.helper.clickOnElement(this.NTH_HIGHLIGHT.replace('<param>', index));
    }


    private readonly MEDIA_IN_HIGHLIGHT: string = `xpath=//div[@data-testid="qv-mediabox-slider"]//video`
    async mediaIsVisibleForHighlights(): Promise<void> {
        await this.helper.toBeVisible(this.MEDIA_IN_HIGHLIGHT);
    }

    private readonly NEXT_ARROW_PRODUCT_IN_HIGHLIGHT: string = `xpath=//div[@data-testid="qv-album-next"]/div/div`
    async clickOnNextArrowToChangeProductInHighlights(): Promise<void> {
        await this.helper.clickOnElement(this.NEXT_ARROW_PRODUCT_IN_HIGHLIGHT);
    }

    private readonly PREVIOUS_ARROW_PRODUCT_IN_HIGHLIGHT: string = `xpath=//div[@data-testid="qv-album-previous"]/div/div`
    async clickOnPreviousArrowToChangeProductInHighlights(): Promise<void> {
        await this.helper.clickOnElement(this.PREVIOUS_ARROW_PRODUCT_IN_HIGHLIGHT);
    }

    private readonly NEXT_ARROW_IN_HIGHLIGHT: string = `xpath=//div[@data-testid="qv-mediabox-slider"]//div[@class="swiper-button-next"]`
    async clickOnNextArrowToChangeHighlight(): Promise<void> {
        await this.helper.clickOnElement(this.NEXT_ARROW_IN_HIGHLIGHT);
    }

    private readonly PREVIOUS_ARROW_IN_HIGHLIGHT: string = `xpath=//div[@data-testid="qv-mediabox-slider"]//div[@class="swiper-button-prev"]`
    async clickOnPreviousArrowToChangeHighlight(): Promise<void> {
        await this.helper.clickOnElement(this.PREVIOUS_ARROW_IN_HIGHLIGHT);
    }

    private readonly SIZE_IN_QV: string = `xpath=//div[@data-testid="pdp-size-button" and @data-id='<param>']`
    async verifySizeAreNotSelected(size: string): Promise<string> {
        await this.helper.hoverOnElement(this.SIZE_IN_QV.replace("<param>", size))
        return await this.helper.getAttributeValue(this.SIZE_IN_QV.replace("<param>", size), 'data-active');
    }

}

