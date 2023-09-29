import { Page, BrowserContext, Locator } from '@playwright/test';
import { Helper } from "../../../utils/helper";
import { BasePage } from '../base.page';

let helper: Helper;

export class PdpPage extends BasePage {

    constructor(page: Page) {
        super(page); // Call the super constructor to initialize the page and context properties from the BasePage
        helper = new Helper(this.page);
    }

    private readonly INFO_ON_PDP: string = `xpath=//div[@data-testid="pdp"]//p[text()='<param>']`
    async validateInfoOnPdp(info: string): Promise<void> {
        await helper.toBeVisible(this.INFO_ON_PDP.replace('<param>', info))
    }
    private readonly RETURN_AND_SHIPPING_TAB: string = `xpath=//div[@data-testid="pdp-tabs-tab" and text()='Shipping & Returns']`
    async clickOnReturnAndShippingTab(): Promise<void> {
        await helper.clickOnElement(this.RETURN_AND_SHIPPING_TAB)
    }

    private readonly PRODUCT_INFO: string = `xpath=//div[@data-section-id="description"]//p`
    async validateProductInfoOnPdp(): Promise<string> {
        return await helper.getTextOfAnElement(this.PRODUCT_INFO)
    }
    private readonly PRODUCT_DESCRIPTION_INFO: string = `xpath=//div[@data-section-id="description"]//p//li[text()="<param>"]    `
    async validateProductDescriptionInfoOnPdp(info: string): Promise<void> {
        await helper.toBeVisible(this.PRODUCT_DESCRIPTION_INFO.replace('<param>', info))
    }
    private readonly DESCRIPTION_TAB: string = `xpath=//div[@data-testid="pdp-tabs-tab" and text()='Description']`
    async clickOnDescriptionTab(): Promise<void> {
        await helper.clickOnElement(this.DESCRIPTION_TAB)
    }
    async scrollToDescriptionTab(): Promise<void> {
        await helper.scrollToElement(this.DESCRIPTION_TAB)
    }

    private readonly GET_PRODUCT_SIZE_BUTTON_ON_PULLDOWN_MODAL: string = `xpath=//div[@data-testid="pull-down-modal"]//div[@data-testid="pdp-size-button" and @data-id="<param>"]`
    async selectProductSizeOnPullDownModal(text: string): Promise<void> {
        await this.helper.clickOnElement(this.GET_PRODUCT_SIZE_BUTTON_ON_PULLDOWN_MODAL.replace("<param>", text));
    }

    private readonly ADD_TO_CART_BUTTON_ON_PDP_PULLDOWN_MODAL: string = `xpath=//div[@data-testid="pull-down-modal"]//div[@data-testid="pdp-button-add-to-cart"]`
    async validateAddToCartButtonOnPullDowmModalIsDisplayedOnPdp(): Promise<void> {
        await this.helper.toBeVisible(this.ADD_TO_CART_BUTTON_ON_PDP_PULLDOWN_MODAL);
    }
    async clickOnAddToCartButtonOnPullDowmModalOnPdp(): Promise<void> {
        await this.helper.clickOnElement(this.ADD_TO_CART_BUTTON_ON_PDP_PULLDOWN_MODAL);
    }

    private readonly VIEW_DETAILS_BUTTON_ON_PDP: string = `xpath=//div[@data-section-id="cta buttons"]//div[@data-testid="pdp-button-open-link"]`
    async clickOnViewDetailsButton(): Promise<void> {
        await helper.clickOnElement(this.VIEW_DETAILS_BUTTON_ON_PDP)
    }

    async getCurrentPageUrl() {
        return await helper.getCurrentURL(this.page)
    }

    private readonly SIZE_BUTTONS_ON_PDP: string = `xpath=//div[@data-testid="pdp-size-button" and @data-id="<param>"]`
    async validateFiltersButtonIsInactiveOnPDP(text: string): Promise<string> {
        return await this.helper.getAttributeValue(this.SIZE_BUTTONS_ON_PDP.replace("<param>", text), 'data-disabled');
    }

    private readonly PDP_ADD_TO_CART_CTA_BUTTON_LABEL: string = `xpath=//div[@data-section-id="cta buttons"]//div[@data-testid="pdp-button-add-to-cart"]//div[@data-testid="open-link-label" and text()="<param>"]`
    async validateLabelOnPdpAddToCartButtonCtaButton(text: string): Promise<void> {
        await this.helper.toBeVisible(this.PDP_ADD_TO_CART_CTA_BUTTON_LABEL.replace("<param>", text));
    }

    private readonly PDP_ADD_TO_CART_CTA_BUTTON_WITH_INDEX: string = `xpath=(//div[@data-section-id="cta buttons"]//div[@data-testid="pdp-button-add-to-cart"])[<param>]`
    async validatePdpAddToCartButtonCtaButtonStatus(index: string): Promise<string> {
        return await this.helper.getAttributeValue(this.PDP_ADD_TO_CART_CTA_BUTTON_WITH_INDEX.replace('<param>', index), 'data-disabled');
    }
    async clickOnPdpAddToCartButtonCtaButton(index: string): Promise<void> {
        await this.helper.clickOnElement(this.PDP_ADD_TO_CART_CTA_BUTTON_WITH_INDEX.replace('<param>', index));
    }

    private readonly PDP_ADD_TO_CART_CTA_BUTTON_LABEL_ON_PULLDOWN_MODAL: string = `xpath=//div[@data-testid="pull-down-modal"]//div[@data-testid="pdp-button-add-to-cart"]//div[@data-testid="open-link-label" and text()="<param>"]`
    async validateLabelOnPdpAddToCartButtonCtaButtonOnPullDownModal(text: string): Promise<void> {
        await this.helper.toBeVisible(this.PDP_ADD_TO_CART_CTA_BUTTON_LABEL_ON_PULLDOWN_MODAL.replace("<param>", text));
    }

    private readonly PDP_ADD_TO_CART_CTA_BUTTON_ON_PULLDOWN_MODAL: string = `xpath=//div[@data-testid="pull-down-modal"]//div[@data-section-id="cta buttons"]//div[@data-testid="pdp-button-add-to-cart"]`
    async validatePdpAddToCartButtonCtaButtonStatusOnPullDownModal(): Promise<string> {
        return await this.helper.getAttributeValue(this.PDP_ADD_TO_CART_CTA_BUTTON_ON_PULLDOWN_MODAL, 'data-disabled');
    }

    private readonly PRODUCTS_FROM_THIS_CATEGORY_SECTION_ON_PDP: string = `xpath= //div[@data-section-id="products from this category"]//div[text()="Products from this category"]`
    async scrollToProductsFromThisCategoryTextInPdp(): Promise<void> {
        await this.helper.scrollToElement(this.PRODUCTS_FROM_THIS_CATEGORY_SECTION_ON_PDP);
    }

    private readonly SIZE_BUTTONS_ON_PDP_WITH_INDEX: string = `xpath=(//div[@data-testid="pdp-size-button" and @data-id="<param1>"])[<param2>]`
    async validateSizeOptionIsSelectedOnPdp(text: string, index: string): Promise<boolean> {
        return await this.helper.isAttributePresent(this.SIZE_BUTTONS_ON_PDP_WITH_INDEX.replace("<param1>", text).replace("<param2>", index), 'data-active');
    }
    async clickSizeOptionOnPdpwithIndex(text: string, index: string): Promise<void> {
        await this.helper.clickOnElement(this.SIZE_BUTTONS_ON_PDP_WITH_INDEX.replace("<param1>", text).replace("<param2>", index));
    }

    private readonly SIZE_ERROR_MESSAGE_WITH_INDEX: string = `xpath=(//div[@data-testid="pdp-size-error"][text()="<param1>"])[<param2>]`
    async validateSizeErrorMessageIsDisplayedOnNewPdp(text: string, index: string): Promise<void> {
        await this.helper.toBeVisible(this.SIZE_ERROR_MESSAGE_WITH_INDEX.replace("<param1>", text).replace("<param2>", index));
    }

    private readonly DESCRIPTION_ACCORDION_ON_PDP: string = `xpath=//div[@data-section-id="description"]`
    async clickOnDescriptionAccordionOnPdp(): Promise<void> {
        await helper.clickOnElement(this.DESCRIPTION_ACCORDION_ON_PDP)
    }

    private readonly DESCRIPTION_DETAILS_ON_PDP: string = `xpath=//div[@data-section-id="description"]//p//li[text()='<param>']`
    async validateDescriptionInfoOnPdp(text: string): Promise<void> {
        await helper.toBeVisible(this.DESCRIPTION_DETAILS_ON_PDP.replace("<param>", text))
    }
    private readonly DESCRIPTION_DETAILS_INFO_ON_PDP: string = `xpath=//div[@data-section-id="description"]//p[text()]`
    async validateDescriptionDetailsOnPdp(): Promise<string> {
        return await helper.getTextOfAnElement(this.DESCRIPTION_DETAILS_INFO_ON_PDP)
    }

    private readonly SHIPPING_DETAILS_ACCORDION_ON_PDP: string = `xpath=//div[@data-section-id="shipping"]`
    async clickOnShippingAccordionOnPdp(): Promise<void> {
        await helper.clickOnElement(this.SHIPPING_DETAILS_ACCORDION_ON_PDP)
    }

    private readonly SHIPPING_DETAILS_ON_PDP: string = `xpath=//div[@data-section-id="shipping"]//p[text()]`
    async validateShippingInfoOnPdp(): Promise<string> {
        return await helper.getTextOfAnElement(this.SHIPPING_DETAILS_ON_PDP)
    }

    private readonly SUMMARY_INFO_ON_PDP: string = `xpath=//div[@data-section-id="summary"]//p[text()='<param>']`
    async validateSummaryInfoOnPdp(info: string): Promise<void> {
        await helper.toBeVisible(this.SUMMARY_INFO_ON_PDP.replace('<param>', info))
    }

    private readonly PDP_VIEW_DETAILS_CTA_BUTTON_WITH_INDEX: string = `xpath=(//div[@data-section-id="cta buttons"]//div[@data-testid="pdp-button-open-link"])[<param>]`
    async clickOnPdpViewDetailsCtaButtonWithIndex(index: string): Promise<void> {
        await this.helper.clickOnElement(this.PDP_VIEW_DETAILS_CTA_BUTTON_WITH_INDEX.replace('<param>', index));
    }

    private readonly PDP_BUY_NOW_BUTTON: string = `xpath=(//h1[text()='<param1>']//ancestor::div//button[@data-testid='pdp-button-buy-now'])[<param2>]`
    async clickOnPdpBuyNowButton(title: string, index: string): Promise<void> {
        await this.helper.clickOnElement(this.PDP_BUY_NOW_BUTTON.replace('<param1>', title).replace('<param2>', index));
    }

    private readonly PDP_PRODUCT_DETAILS_BUTTON: string = `xpath=(//h1[text()='<param1>']//ancestor::div//button[@data-testid='pdp-button-product-details'])[<param2>]`
    async clickOnProductDetailsButton(title: string, index: string): Promise<void> {
        await this.helper.clickOnElement(this.PDP_PRODUCT_DETAILS_BUTTON.replace('<param1>', title).replace('<param2>', index));
    }

    private readonly PDP_PRODUCT_AVAILABILITY_STATUS: string = `xpath=//div[@data-testid="pdp-product-availability-summary"]//p[text()="<param>"]`
    async productAvailabilityStatus(status: string): Promise<void> {
        await this.helper.toBeVisible(this.PDP_PRODUCT_AVAILABILITY_STATUS.replace('<param>', status));
    }

    private readonly PDP_PRODUCT_TITLE_HEADING: string = `xpath=//h1[@data-testid="pdp-product-title"][text()="<param>"]`
    async validatePdpProductTitleHeadingIsDisplayed(text: string): Promise<void> {
        await this.helper.toBeVisible(this.PDP_PRODUCT_TITLE_HEADING.replace("<param>", text));
    }

    private readonly TAP_TO_START_BUTTON: string = `xpath=//div[@data-testid="pdp2-button-tap-to-start"]`
    async clickOnTapToStartButton(): Promise<void> {
        await this.helper.clickOnElement(this.TAP_TO_START_BUTTON);
    }

    private readonly ADD_TO_CART_AS_PRIMARY_CTA: string = `xpath=(//div[@data-testid="pdp-button-add-to-cart"][@data-id="primary"])[<param>]`
    async validateAddToCartIsPrimaryCta(index: string): Promise<void> {
        await this.helper.waitForElementToBePresent(this.ADD_TO_CART_AS_PRIMARY_CTA.replace('<param>', index))
    }
    async validateAddToCartSecondaryCtaIsNotDisplayed(index: string): Promise<void> {
        await this.helper.waitForElementToNotBeDisplayed(this.ADD_TO_CART_AS_PRIMARY_CTA.replace('<param>', index))
    }

    private readonly VIEW_DETAILS_AS_PRIMARY_CTA: string = `xpath=(//div[@data-testid="pdp-button-open-link"][@data-id="primary"])[<param>]`
    async validateViewDetailsIsPrimaryCta(index: string): Promise<void> {
        await this.helper.waitForElementToBePresent(this.VIEW_DETAILS_AS_PRIMARY_CTA.replace('<param>', index))
    }

    private readonly VIEW_DETAILS_AS_SECONDARY_CTA: string = `xpath=(//div[@data-testid="pdp-button-open-link"][@data-id="secondary"])[<param>]`
    async validateViewDetailsIsSecondaryCtaIsNotDisplayed(index: string): Promise<void> {
        await this.helper.waitForElementToNotBeDisplayed(this.VIEW_DETAILS_AS_SECONDARY_CTA.replace('<param>', index))
    }

    private readonly PDP_QUANTITY_PICKER_QUANTITY: string = `xpath=//div[@data-testid="product-listitem-test-id"]//div[@data-testid="pdp-quantity-picker"]//input[@data-testid="pdp-quantity-input"]`
    async getProductQuantityOnMiniCart(): Promise<string> {
        return await this.helper.getAttributeValue(this.PDP_QUANTITY_PICKER_QUANTITY, 'value')
    }

    private readonly NEW_PDP_BACK_BUUTON: string = `xpath=//div[@data-testid="pdp2-button-back"]`
    async clickOnNewPdpBackButton(): Promise<void> {
        await this.helper.clickOnElement(this.NEW_PDP_BACK_BUUTON)
    }

    private readonly PDP_BACK_BUUTON_DESKTOP: string = `xpath=//div[@data-testid="pdp-button-back"]`
    async clickOnPdpBackButtonDesktop(): Promise<void> {
        await this.helper.clickOnElement(this.PDP_BACK_BUUTON_DESKTOP)
    }

    private readonly PDP_PHOTO_IMAGES: string = `xpath=(//div[@data-testid="pdp-photo"])[<param>]`
    async clickNthPdpPhotoImage(index: string): Promise<void> {
        await this.helper.clickOnElement(this.PDP_PHOTO_IMAGES.replace('<param>', index))
    }
    async hoverOnkNthPdpPhotoImage(index: string): Promise<void> {
        await this.helper.hoverOnElement(this.PDP_PHOTO_IMAGES.replace('<param>', index))
    }

    private readonly PDP_ZOOM_IMAGE_TABS: string = `xpath=(//div[@data-testid="photo-zoom-tabs"]//div[@data-testid="qv-tab-item"])[<param>]`
    async clickNthPdpZoomImageTabs(index: string): Promise<void> {
        await this.helper.clickOnElement(this.PDP_ZOOM_IMAGE_TABS.replace('<param>', index))
    }
    async validateNthPdpZoomImageTabIsSelected(index: string): Promise<string> {
        return await this.helper.getAttributeValue(this.PDP_ZOOM_IMAGE_TABS.replace('<param>', index), 'data-active')
    }

    private readonly PDP_ZOOM_IMAGE_CLOSE_BUTTON: string = `xpath=//div[@data-testid="photo-zoom-close-button"]`
    async clickPdpZoomImageCloseButton(): Promise<void> {
        await this.helper.clickOnElement(this.PDP_ZOOM_IMAGE_CLOSE_BUTTON)
    }
    async validatePdpZoomImageCloseButtonIsNotDisplayed(): Promise<void> {
        await this.helper.toBeNotVisible(this.PDP_ZOOM_IMAGE_CLOSE_BUTTON)
    }

    private readonly PDP_ZOOM_THUMBNAIL_IMAGE: string = `xpath=(//div[@id="photo-slider-thumbnails-<param1>"])[<param2>]`
    async clickPdpZoomThumbnailImage(image_index: string, index: string): Promise<void> {
        await this.helper.clickOnElement(this.PDP_ZOOM_THUMBNAIL_IMAGE.replace('<param1>', image_index).replace('<param2>', index))
    }
    async validatePdpThumbnailImageIsSelected(image_index: string, index: string): Promise<string> {
        await this.helper.waitFor()
        return await this.helper.getAttributeValue(this.PDP_ZOOM_THUMBNAIL_IMAGE.replace('<param1>', image_index).replace('<param2>', index), 'data-testid')
    }

    private readonly PDP_ZOOM_IMAGE_CLOSE_BUTTON_DESKTOP: string = `xpath=(//div[@data-testid="pdp-button-open-close"])[<param>]`
    async clickPdpZoomImageCloseButtonOnDesktop(index: string): Promise<void> {
        await this.helper.clickOnElement(this.PDP_ZOOM_IMAGE_CLOSE_BUTTON_DESKTOP.replace('<param>', index))
    }

    private readonly NTH_L1_NAV_HEADER_WITH_TEXT: string = `xpath=(//div[@data-testid="clp-sectionheader-title"])[<param>]`
    async getTextOfLevelOneNthBreadCrumbHeader(index: string): Promise<string> {
        return await this.helper.getTextOfAnElement(this.NTH_L1_NAV_HEADER_WITH_TEXT.replace("<param>", index));
    }

    private readonly PDP_HOME_BUUTON_DESKTOP: string = `xpath=//div[@data-testid="pdp-button-home"]`
    async clickOnPdpHomeButtonDesktop(): Promise<void> {
        await this.helper.clickOnElement(this.PDP_HOME_BUUTON_DESKTOP)
    }

    private readonly PDP_QUANTITY_PICKER_WITH_INDEX: string = `xpath=(//div[@data-testid="pdp-quantity-picker"])[<param>]`
    async validatePdpQuantityPickerWithIndexIsDisplayed(index: string): Promise<void> {
        await this.helper.toBeVisible(this.PDP_QUANTITY_PICKER_WITH_INDEX.replace('<param>', index))
    }

    private readonly PDP_SEE_MORE_PHOTOS_BUTTON: string = `xpath=//div[@data-id="primary"]//div[text()='See More Photos']/ancestor::div[@data-id="primary"]`
    async clickOnPdpSeeMorePhotosButton(): Promise<void> {
        await this.helper.clickOnElement(this.PDP_SEE_MORE_PHOTOS_BUTTON)
    }

    private readonly PDP_NEXT_PRODUCT_BUTTON: string = `xpath=//button[text()="NEXT PRODUCT"]`
    async clickOnNextProductButton(): Promise<void> {
        await this.helper.clickOnElement(this.PDP_NEXT_PRODUCT_BUTTON)
    }

    private readonly PDP_PREVIOUS_PRODUCT_BUTTON: string = `xpath=//button[text()="PREVIOUS PRODUCT"]`
    async clickOnPreviousProductButton(): Promise<void> {
        await this.helper.clickOnElement(this.PDP_PREVIOUS_PRODUCT_BUTTON)
    }

    private readonly PDP_ADD_TO_CART_CTA_BUTTON_LABEL_WITH_INDEX: string = `xpath=(//div[@data-section-id="cta buttons"]//div[@data-testid="pdp-button-add-to-cart"]//div[@data-testid="open-link-label" and text()="<param1>"])[<param2>]`
    async validateLabelOnPdpAddToCartButtonCtaButtonWithIndex(text: string, index: string): Promise<void> {
        await this.helper.toBeVisible(this.PDP_ADD_TO_CART_CTA_BUTTON_LABEL_WITH_INDEX.replace("<param1>", text).replace("<param2>", index));
    }
}