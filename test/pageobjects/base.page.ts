import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { Helper } from "../../utils/helper";

type NavType = 'inline' | 'bottom';

export class BasePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly helper: Helper;

    constructor(page: Page) {
        this.page = page;

        this.helper = new Helper(this.page);
    }

    //###########################################MOBILE###########################################
    //#############################################################################################
    async getTitle(): Promise<string> {
        return this.page.title();
    }

    async navigateTo(configId: string, navType: NavType, additional = ''): Promise<void> {
        let targetURL: string;
        const baseURL = process.env.ENVIRONMENT_NAME === 'preview'
            ? process.env.ENVIRONMENT_URL
            : 'https://showside.maker.co';

        switch (navType) {
            case 'bottom':
                targetURL = `${baseURL}/test?id=${configId}${additional}`;
                break;
            case 'inline':
                targetURL = `${baseURL}/test/inline.html?id=${configId}${additional}`;
                break;
            default:
                console.log('Only "inline" and "bottom" are permissible');
                return;
        }
        console.log(`Running ${process.env.ENVIRONMENT_NAME || 'Non'} Vercel Deployment URL= ${targetURL}`);
        await this.page.goto(targetURL);
    }
    //#############################MOBILE#########################################
    private readonly L1_NAV_WITH_TEXT: string = `xpath=//div[@data-testid="navbar-l1"]//div[text()="<param>"]/ancestor::div[@data-testid="navbar-l1"]`
    async clickOnL1NavWithText(text: string): Promise<void> {
        await this.helper.clickOnElement(this.L1_NAV_WITH_TEXT.replace("<param>", text));
    }
    async hoverOnL1NavWithText(text: string): Promise<void> {
        await this.helper.hoverOnElement(this.L1_NAV_WITH_TEXT.replace("<param>", text));
    }
    async validateL1NavIsSelected(text: string): Promise<string> {
        return await this.helper.getAttributeValue(this.L1_NAV_WITH_TEXT.replace("<param>", text), 'data-active');
    }
    async waitForL1NavIsPresent(text: string): Promise<void> {
        await this.helper.waitForElementToBePresent(this.L1_NAV_WITH_TEXT.replace("<param>", text));
    }

    private readonly L2_NAV_WITH_TEXT: string = `xpath=//div[@data-testid="navbar-l2"]//div[text()="<param>"]/ancestor::div[@data-testid="navbar-l2"]`
    async clickOnL2NavWithText(text: string): Promise<void> {
        await this.helper.clickOnElement(this.L2_NAV_WITH_TEXT.replace("<param>", text));
    }

    async validateL2NavWithTextIsSelected(text: string): Promise<boolean> {
        return await this.helper.isAttributePresent(this.L2_NAV_WITH_TEXT.replace("<param>", text), 'data-active');
    }
    async validateL2NavIsSelected(text: string): Promise<string> {
        return await this.helper.getAttributeValue(this.L2_NAV_WITH_TEXT.replace("<param>", text), 'data-active');
    }

    private readonly ITEMS_ON_CART: string = `xpath=//div[@data-testid="cart"]//div[@data-testid="product-listitem-title"]`
    async getTextOfAllItemsOfTheCart(): Promise<string> {
        return await this.helper.getTextOfElements(this.ITEMS_ON_CART);
    }

    private readonly MINI_CART: string = `xpath=//div[@data-testid="cart"]`
    async validateMiniCartIsOpened(): Promise<void> {
        await this.helper.toBeVisible(this.MINI_CART);
    }
    async validateMiniCartIsClosed(): Promise<void> {
        await this.helper.toBeNotVisible(this.MINI_CART);
    }

    private readonly NTH_CARD_OF_HOMEPAGE_HEADER_WITH_NAME: string = `(//div[@data-testid = 'clp-sectionheader-title']//div[text()='<param1>']//ancestor::div[contains(@id, 'sn-section-container')]//div[@data-testid='category-card-test-id'])[<param2>]`
    async clickOnNthCardUnderHeadingName(text: string, index: string): Promise<void> {
        await this.helper.clickOnElement(this.NTH_CARD_OF_HOMEPAGE_HEADER_WITH_NAME.replace("<param1>", text).replace("<param2>", index));
    }
    async expectNthCardUnderHeadingNameIsVisible(text: string, index: string): Promise<void> {
        await this.helper.toBeVisible(this.NTH_CARD_OF_HOMEPAGE_HEADER_WITH_NAME.replace("<param1>", text).replace("<param2>", index))
    }
    async expectNthCardUnderHeadingNameIsNotVisible(text: string, index: string): Promise<void> {
        await this.helper.toBeNotVisible(this.NTH_CARD_OF_HOMEPAGE_HEADER_WITH_NAME.replace("<param1>", text).replace("<param2>", index))
    }

    private readonly BREADCRUMB_HEADER: string = `xpath=//div[@data-testid = 'breadcrumbs']`
    async getTextOfBreadCrumbHeader(): Promise<string> {
        return await this.helper.getTextOfAnElement(this.BREADCRUMB_HEADER);
    }

    private readonly HOME_BUTTON: string = "xpath=//div[@data-testid = 'navbar-button-home']"
    async clickOnHomeButton(): Promise<void> {
        await this.helper.clickOnElement(this.HOME_BUTTON);
    }
    async homeButtonIsNotVisible(): Promise<void> {
        await this.helper.toBeNotVisible(this.HOME_BUTTON);
    }
    async validateHomeButtonIsDisabled(): Promise<boolean> {
        return await this.helper.isAttributePresent(this.HOME_BUTTON, 'data-disabled')
    }

    private readonly PRODUCT_CARD_WITH_TEXT: string = `xpath=//div[text()="<param>"]/ancestor::div[@data-testid="product-card-test-id"]`
    async hoverOnProductCardWithText(text: string): Promise<void> {
        await this.helper.hoverOnElement(this.PRODUCT_CARD_WITH_TEXT.replace("<param>", text));
    }
    private readonly PRODUCT_CARD_WITH_SAME_TEXT: string = `xpath=(//div[text()="<param1>"]/ancestor::div[@data-testid="product-card-test-id"])[<param2>]`
    async hoverOnProductCardWithTextAndIndex(text: string, index: string): Promise<void> {
        await this.helper.hoverOnElement(this.PRODUCT_CARD_WITH_SAME_TEXT.replace("<param1>", text).replace("<param2>", index));
    }

    private readonly VARIENT_CARD_WITH_COLOR: string = `xpath=(//div[text()="<param1>"]/ancestor::div[@data-testid="product-card-test-id"])[<param2>]//div[@data-testid='product-card-color-button' and @data-id='<param3>']`
    async clickOnVarientCardWithColor(text: string, index: string, color: string): Promise<void> {
        await this.helper.clickOnElement(this.VARIENT_CARD_WITH_COLOR.replace("<param1>", text).replace("<param2>", index).replace("<param3>", color));
    }
    async hoverOnVarientCardWithColor(text: string, index: string, color: string): Promise<void> {
        await this.helper.hoverOnElement(this.VARIENT_CARD_WITH_COLOR.replace("<param1>", text).replace("<param2>", index).replace("<param3>", color));
    }
    private readonly COLOR_VARIENT_ON_PDP_TEXT: string = `xpath=(//div[@data-testid='pdp-accordion-title']//div[text() ='Color']//div[text()='<param>'])[2]`
    async verifyPDPpageColorVarientIs(color: string): Promise<void> {
        await this.helper.toBeVisible(this.COLOR_VARIENT_ON_PDP_TEXT.replace("<param>", color));
    }
    async verifyProductCardWithTextIsVisible(text: string): Promise<void> {
        await this.helper.toBeVisible(this.PRODUCT_CARD_WITH_TEXT.replace("<param>", text));
    }
    async ValidateProductCardWithTextToBeDisplayed(text: string): Promise<void> {
        await this.helper.toBeVisible(this.PRODUCT_CARD_WITH_TEXT.replace("<param>", text));
    }
    async clickOnProductCardWithText(text: string): Promise<void> {
        await this.helper.clickOnElement(this.PRODUCT_CARD_WITH_TEXT.replace("<param>", text));
    }

    private readonly PRODUCT_CARD_ADD_TO_CART_BUTTON: string = `xpath=//div[text()="<param>"]//ancestor::div[@data-testid="product-card-test-id"]//div[@data-testid="product-card-add-to-cart"]`
    async clickOnProductCardAddToCartButton(text: string): Promise<void> {
        await this.helper.forceClickOnElement(this.PRODUCT_CARD_ADD_TO_CART_BUTTON.replace("<param>", text));
    }

    private readonly PRODUCT_CARD_ADD_TO_CART_WITH_INDEX_BUTTON: string = `xpath=(//div[text()="<param1>"]//ancestor::div[@data-testid="product-card-test-id"]//div[@data-testid="product-card-add-to-cart"])[<param2>]`
    async clickOnProductCardAddToCartButtonWithIndex(text: string, index: string): Promise<void> {
        await this.helper.forceClickOnElement(this.PRODUCT_CARD_ADD_TO_CART_WITH_INDEX_BUTTON.replace("<param1>", text).replace("<param2>", index));
    }
    private readonly PRODUCT_CARD_SELECT_SIZE_WITH_INDEX_BUTTON: string = `xpath=//div[@data-testid='product-card-size-button' and text() ='<param1>']`
    async clickOnProductSelectSizeButton(size: string): Promise<void> {
        await this.helper.clickOnElement(this.PRODUCT_CARD_SELECT_SIZE_WITH_INDEX_BUTTON.replace("<param1>", size));
    }
    async getattributeOnProductCardWithText(text: string): Promise<string> {
        return await this.helper.getAttributeValue(this.PRODUCT_CARD_ADD_TO_CART_BUTTON.replace("<param>", text), 'data-disabled');
    }

    private readonly COLOR_VARIENT_ADD_TO_CART_BUTTON: string = `xpath=//div[@data-testid='cart']//div[contains(text(), '<param>')]`
    async expectAddToCartContainsColorVarientWithName(color: string): Promise<void> {
        await this.helper.toBeVisible(this.COLOR_VARIENT_ADD_TO_CART_BUTTON.replace("<param>", color));
    }

    private readonly PRODUCT_ADD_TO_CART_BUTTON: string = `xpath=(//div[@data-testid='cart']//div[contains(text(), '<param>')])[2]`
    async expectAddToCartContainsProductWithName(productName: string): Promise<void> {
        await this.helper.toBeVisible(this.PRODUCT_ADD_TO_CART_BUTTON.replace("<param>", productName));
    }

    private readonly PULL_DOWN_MODAL: string = `xpath=//div[@data-testid="pull-down-modal"]`
    async validatePullDowmModalIsDisplayed(): Promise<void> {
        await this.helper.toBeVisible(this.PULL_DOWN_MODAL);
    }
    async validatePullDowmModalIsNotDisplayed(): Promise<void> {
        await this.helper.toBeNotVisible(this.PULL_DOWN_MODAL);
    }

    private readonly ADD_TO_CART_BUTTON_ON_PDP: string = `xpath=(//div[@data-testid="pdp-button-add-to-cart"])[<param>]`
    async validateAddToCartButtonOnPullDowmModalIsDisplayed(index: string): Promise<void> {
        await this.helper.toBeVisible(this.ADD_TO_CART_BUTTON_ON_PDP.replace("<param>", index));
    }
    async clickOnAddToCartButtonOnPullDowmModal(index: string): Promise<void> {
        await this.helper.clickOnElement(this.ADD_TO_CART_BUTTON_ON_PDP.replace("<param>", index));
    }

    private readonly PULLDOWN_MODAL_CLOSE_BUTTON: string = `xpath=//div[@data-testid="modal-button-close"]`
    async clickOnPullDownModalCloseButton(): Promise<void> {
        await this.helper.forceClickOnElement(this.PULLDOWN_MODAL_CLOSE_BUTTON);
    }

    private readonly SIZE_ERROR_MESSAGE: string = `xpath=//div[@data-testid="pdp-size-error"][text()="<param>"]`
    async validateSizeErrorMessageIsDisplayed(text: string): Promise<void> {
        await this.helper.toBeVisible(this.SIZE_ERROR_MESSAGE.replace("<param>", text));
    }
    async validateSizeErrorMessageIsNotDisplayed(text: string): Promise<void> {
        await this.helper.toBeNotVisible(this.SIZE_ERROR_MESSAGE.replace("<param>", text));
    }

    private readonly GET_PRODUCT_SIZE_BUTTON: string = `xpath=//div[@data-testid="pdp-size-button"][@data-id="<param>"]`
    async selectProductSize(text: string): Promise<void> {
        await this.helper.clickOnElement(this.GET_PRODUCT_SIZE_BUTTON.replace("<param>", text));
    }

    private readonly GET_PRODUCT_COLOR_VARIANT: string = `xpath=//div[@data-testid="pdp-color-button"][@data-id="<param>"]`
    async selectProductColor(text: string): Promise<void> {
        await this.helper.clickOnElement(this.GET_PRODUCT_COLOR_VARIANT.replace("<param>", text));
    }
    private readonly GET_PRODUCT_CARD_COLOR_VARIANT: string = `xpath=//div[text() = 'A-line Dress']/ancestor::div[@data-testid='product-card-test-id']//div[@data-testid="product-card-color-button" and @data-id='<param>']`
    async selectProductCardColor(text: string): Promise<void> {
        await this.helper.clickOnElement(this.GET_PRODUCT_CARD_COLOR_VARIANT.replace("<param>", text));
    }
    async validateProductCardColorVariantsIsVisible(text: string): Promise<void> {
        await this.helper.toBeVisible(this.GET_PRODUCT_CARD_COLOR_VARIANT.replace("<param>", text));
    }

    private readonly PDP_PRODUCT_TITLE: string = `xpath=(//div[@data-testid="pdp-product-title"][text()="<param1>"])[<param2>]`
    async validatePdpProductTitleIsDisplayed(text: string, index: string): Promise<void> {
        await this.helper.toBeVisible(this.PDP_PRODUCT_TITLE.replace("<param1>", text).replace("<param2>", index));
    }

    async validatePdpProductTitleIsPresent(text: string, index: string): Promise<void> {
        await this.helper.waitForElementToBeDisplayed(this.PDP_PRODUCT_TITLE.replace("<param1>", text).replace("<param2>", index));
    }
    async validatePdpProductTitleIsNotDisplayed(text: string, index: string): Promise<void> {
        await this.helper.toBeNotVisible(this.PDP_PRODUCT_TITLE.replace("<param1>", text).replace("<param2>", index));
    }
    private readonly PDP_PRODUCT_CLOR_VARIANT: string = `xpath=//div[@data-testid="pdp-color-button"][@data-id="<param>"]`
    async validatePdpColorVariantIsSelected(text: string): Promise<string> {
        return await this.helper.getAttributeValue(this.PDP_PRODUCT_CLOR_VARIANT.replace("<param>", text), 'data-active')
    }

    private readonly PDP_ADD_TO_CART_BUTTON: string = `xpath=//div[@data-testid="pdp-button-add-to-cart"]`
    async clickOnPdpAddToCartButton(): Promise<void> {
        await this.helper.clickOnElement(this.PDP_ADD_TO_CART_BUTTON);
    }
    async verifyAddToCartButtonIsPrimaryOrSecondary(): Promise<string> {
        return await this.helper.getAttributeValue(this.PDP_ADD_TO_CART_BUTTON, 'data-id');
    }
    private readonly PDP_OPEN_LINK_LABEL: string = `xpath=//div[@data-testid="open-link-label"][text()="<param>"]`
    async validateLabelOnPdpCtaButton(text: string): Promise<void> {
        await this.helper.toBeVisible(this.PDP_OPEN_LINK_LABEL.replace("<param>", text));
    }

    private readonly PDP_CTA_BUTTON: string = `xpath=//div[@data-testid="pdp-button-add-to-cart"]`
    async getattributeOfCtaButton(): Promise<string> {
        return await this.helper.getAttributeValue(this.PDP_CTA_BUTTON, 'data-disabled');
    }
    async getTextOfCtaButton(): Promise<string> {
        return await this.helper.getTextOfAnElement(this.PDP_CTA_BUTTON);
    }

    private readonly PLP_FILTERS_BUTTON: string = `xpath=//div[@data-testid="plp-filters-button"]`
    async clickOnFiltersButton(): Promise<void> {
        await this.helper.clickOnElement(this.PLP_FILTERS_BUTTON);
    }

    private readonly FILTER_OPTIONS: string = `xpath=//div[@data-testid="filters-option"]//div[text()="<param>"]`
    async selectFilterOptions(text: string): Promise<void> {
        await this.helper.clickOnElement(this.FILTER_OPTIONS.replace("<param>", text));
    }
    private readonly FILTER_OPTIONS_WITH_NAME: string = `xpath=//div[@data-testid="filters-option"]//div[text()="<param>"]`
    async validateFilterItemWithTextIsDisplayed(text: string): Promise<void> {
        await this.helper.toBeVisible(this.FILTER_OPTIONS_WITH_NAME.replace("<param>", text));
    }


    private readonly FILTER_OPTIONS_WITH_DATA_ID: string = `xpath=//div[@data-testid="filters-option"][@data-id="<param>"]`
    async getFilterOptionStatus(text: string): Promise<boolean> {
        return await this.helper.isAttributePresent(this.FILTER_OPTIONS_WITH_DATA_ID.replace("<param>", text), 'data-active');
    }

    private readonly FILTERS_PANEL_APPLY_BUTTON: string = `xpath=//div[@data-testid="filters-button-apply"]`
    async clickOnFiltersPanelApplyButton(): Promise<void> {
        await this.helper.clickOnElement(this.FILTERS_PANEL_APPLY_BUTTON);
    }

    private readonly CLP_SECTION_HEADER_WITH_NAME: string = `xpath=//div[@data-testid = "clp-sectionheader-title"]//div[text()="<param>"]`
    async clickOnClpSectionHeader(text: string): Promise<void> {
        await this.helper.clickOnElement(this.CLP_SECTION_HEADER_WITH_NAME.replace("<param>", text));
    }
    async verifyCLPSectionHeaderIsVisible(text: string): Promise<void> {
        await this.helper.toBeVisible(this.CLP_SECTION_HEADER_WITH_NAME.replace("<param>", text));
    }
    async scrollToClpSectionHeader(text: string): Promise<void> {
        await this.helper.scrollToElement(this.CLP_SECTION_HEADER_WITH_NAME.replace("<param>", text));
    }
    async validateClpSectionHeaderToBeDisplayed(text: string): Promise<void> {
        await this.helper.toBeVisible(this.CLP_SECTION_HEADER_WITH_NAME.replace("<param>", text));
    }

    private readonly FILTER_BADGES_ON_PLP: string = `xpath=//div[@data-testid="filters-badge"]//div[text() ="<param>"]`
    async validateFilterBadgesAreDisplayedOnPLP(text: string): Promise<void> {
        await this.helper.toBeVisible(this.FILTER_BADGES_ON_PLP.replace("<param>", text));
    }
    async validateFilterBadgeNotToBeDisplayedOnPLP(text: string): Promise<void> {
        await this.helper.toBeNotVisible(this.FILTER_BADGES_ON_PLP.replace("<param>", text));
    }
    async clickOnFilterBadgesOnPlp(text: string): Promise<void> {
        await this.helper.clickOnElement(this.FILTER_BADGES_ON_PLP.replace("<param>", text));
    }

    private readonly FILTER_BADGES_ON_FILTERS_PANEL: string = `xpath=(//div[@data-testid="filters-badge"][@data-id="<param1>"])[<param2>]`
    async clickOnFilterBadgesOnFiltersPanel(text: string, index: string): Promise<void> {
        await this.helper.clickOnElement(this.FILTER_BADGES_ON_FILTERS_PANEL.replace("<param1>", text).replace("<param2>", index));
    }

    private readonly SIZE_BUTTON_ON_PDP: string = `xpath=//div[@data-testid="pdp-size-button"and @data-id="<param>"]`
    async validateFiltersButtonIsDisplayedOnPDP(text: string): Promise<void> {
        await this.helper.toBeVisible(this.SIZE_BUTTON_ON_PDP.replace("<param>", text));
    }
    async validateSizeOptionIsSelected(text: string): Promise<boolean> {
        return await this.helper.isAttributePresent(this.SIZE_BUTTON_ON_PDP.replace("<param>", text), 'data-active');
    }
    async clickPdpSizeOption(text: string): Promise<void> {
        await this.helper.clickOnElement(this.SIZE_BUTTON_ON_PDP.replace("<param>", text));
    }

    private readonly FILTER_PANEL_PANEL_CLOSE_BUTTON: string = `xpath=//div[@data-testid="filters-button-close"]`
    async clickOnFiltersPanelCloseButton(): Promise<void> {
        await this.helper.toBeVisible(this.FILTER_PANEL_PANEL_CLOSE_BUTTON);
    }

    private readonly FILTER_CLEAR_ALL_BADGE: string = `xpath=//a[@data-testid="filters-clear-all-badge"]`
    async clickOnFiltersClearAllBadge(): Promise<void> {
        await this.helper.clickOnElement(this.FILTER_CLEAR_ALL_BADGE);
    }

    private readonly FILTERS_BADGE_COUNT: string = `xpath=//div[@data-testid="filters-count"][text()="<param>"]`
    async validateFiltersBadgeCountIsDisplayed(text: string): Promise<void> {
        await this.helper.toBeVisible(this.FILTERS_BADGE_COUNT.replace("<param>", text));
    }
    async validateFiltersBadgeCountIsNotDisplayed(text: string): Promise<void> {
        await this.helper.toBeNotVisible(this.FILTERS_BADGE_COUNT.replace("<param>", text));
    }

    private readonly BREADCRUMB_ITEM_WITH_TEXT: string = `xpath=//div[@data-testid="breadcrumb-item"]//div[text()='<param>']`
    async clickOnBreadcrumbItem(text: string): Promise<void> {
        await this.helper.clickOnElement(this.BREADCRUMB_ITEM_WITH_TEXT.replace("<param>", text));
    }

    async scrollToBottomOfPage(): Promise<void> {
        await this.helper.lazyScrollToBottomOfDiv()
    }
    async scrollToBottomOfCLPPage(): Promise<void> {
        await this.helper.lazyScrollToBottomOfDivCLP()
    }

    private readonly SCROLL_BACK_TO_TOP_BUTTON: string = `xpath=//div[@title="Scroll back to top"]`
    async clickOnScrollToTopButton(): Promise<void> {
        await this.helper.clickOnElement(this.SCROLL_BACK_TO_TOP_BUTTON);
    }

    private readonly BOTTOM_NAV_SIDEBAR_BUTTON: string = `xpath=//div[@data-testid="navbar-button-sidebar"]`
    async clickOnNavbarSidebarButton(): Promise<void> {
        await this.helper.clickOnElement(this.BOTTOM_NAV_SIDEBAR_BUTTON);
    }
    async scrollToProductCardInPdp(text: string) {
        await this.helper.scrollToElement(this.PRODUCT_CARD_WITH_TEXT.replace('<param>', text))
    }
    async scrollToSizeButtonsOnPdp(text: string) {
        await this.helper.scrollToElement(this.SIZE_BUTTON_ON_PDP.replace('<param>', text))
    }


    private readonly BACK_BUTTON: string = (`xpath=//div[@data-testid="navbar-button-back"]`)
    async clickOnBackButton(): Promise<void> {
        await this.helper.clickOnElement(this.BACK_BUTTON);
    }

    private readonly BOTTOM_BACK_BUTTON: string = `xpath=//div[@data-testid='pull-down-modal']//div[@title='Back']`
    async clickOnBottomBackButton(): Promise<void> {
        await this.helper.clickOnElement(this.BOTTOM_BACK_BUTTON);
    }
    async verifyBackButtonIsNotPresent(): Promise<void> {
        await this.helper.toBeNotVisible(this.BACK_BUTTON);
    }

    private readonly ADD_TO_CART_POPUP: string = `xpath=//div[@id="add-to-cart-modal"]//h1`
    async getAddToCartPopupText(): Promise<string> {
        return await this.helper.getTextOfAnElement(this.ADD_TO_CART_POPUP)
    }

    private readonly CHECKOUT_BUTTON: string = (`xpath=(//div[@title='Checkout'])[1]`)
    async clickOnCheckoutButtonOnBottomBar(): Promise<void> {
        await this.helper.clickOnElement(this.CHECKOUT_BUTTON);
    }


    private readonly QUANTITY_PRODUCT_CART_OF_PRODUCT: string = (`xpath=//div[text()='<param>']//ancestor::div[@data-testid='cart']//input[@aria-label='Quantity']`)
    async getQuantityOfProductFromCart(productName: string): Promise<string> {
        return await this.helper.getAttributeValue(this.QUANTITY_PRODUCT_CART_OF_PRODUCT.replace('<param>', productName), 'value');
    }

    private readonly QUANTITY_PRODUCT_ONPDP: string = (`xpath=//input[@aria-label='Quantity']`)
    async getQuantityOfProductFromPDP(): Promise<string> {
        return await this.helper.getAttributeValue(this.QUANTITY_PRODUCT_ONPDP, 'value');
    }
    private readonly SIZE_GUIDE_POPUP: string = "xpath=//div[text()='Size Guide']//ancestor::div[@data-testid='pull-down-modal']"
    async verifySizeGuideWindowPopupIsVisible(): Promise<void> {
        await this.helper.toBeVisible(this.SIZE_GUIDE_POPUP)
    }
    async verifySizeGuideWindowPopupIsNotVisible(): Promise<void> {
        await this.helper.toBeNotVisible(this.SIZE_GUIDE_POPUP)
    }
    private readonly SIZE_GUIDE_WINDOW_POPUP_CLOSE_BUTTON: string = "xpath=//div[text()='Size Guide']//ancestor::div[@data-testid='pull-down-modal']//div[@data-testid='modal-button-close']"
    async clickOnSizeGuideWindowPopupCloseButton(): Promise<void> {
        await this.helper.clickOnElement(this.SIZE_GUIDE_WINDOW_POPUP_CLOSE_BUTTON)
    }

    private readonly PDP_BACK_BUTTON: string = "xpath=//div[@data-testid='pdp-button-back']"
    async clickOnBackButtonOnPDP(): Promise<void> {
        await this.helper.clickOnElement(this.PDP_BACK_BUTTON)
    }

    private readonly BOTTOM_BACK_BUTTON_MOBILE: string = `xpath=(//div[@title="Back"])[1]`
    async clickOnBottomBackButtonOnNav(): Promise<void> {
        // await this.helper.waitFor(50000)
        await this.helper.clickOnElement(this.BOTTOM_BACK_BUTTON_MOBILE)
    }

    private readonly PDP_QUANTITY_PICKER: string = `xpath=//div[@data-testid="pdp-quantity-picker"]`
    async validatePdpQuantityPickerIsDisplayed(): Promise<void> {
        await this.helper.toBeVisible(this.PDP_QUANTITY_PICKER)
    }

    private readonly PDP_QUANTITY_PICKER_PLUS_BUTTON_ON_MINI_CART: string = `xpath=//div[@data-testid="product-listitem-test-id"]//div[@data-testid="pdp-quantity-picker"]//div[@data-testid="pdp-quantity-plus"]`
    async clickOnQuantityPickerPlusButtonOnMiniCart(): Promise<void> {
        await this.helper.clickOnElement(this.PDP_QUANTITY_PICKER_PLUS_BUTTON_ON_MINI_CART)
    }

    //###########################################DESKTOP###########################################
    //#############################################################################################

    private readonly PRODUCT_CARD_ADD_TO_CART_BUTTON_LABEL: string = `xpath=//div[text()="<param1>"]//ancestor::div[@data-testid="product-card-test-id"]//div[@data-testid="add-to-cart-label"][text()="<param2>"]`
    async validateLabelOnProductCardAddToCartButton(text: string, label: string): Promise<void> {
        await this.helper.toBeVisible(this.PRODUCT_CARD_ADD_TO_CART_BUTTON_LABEL.replace("<param1>", text).replace("<param2>", label));
    }

    private readonly GET_PRODUCT_CARD_SIZE_BUTTON: string = `xpath=//div[@data-testid="product-card-size-button"][@data-id="<param>"]`
    async selectProductCardSizeOption(text: string): Promise<void> {
        await this.helper.forceClickOnElement(this.GET_PRODUCT_CARD_SIZE_BUTTON.replace("<param>", text));
    }

    private readonly CATEGORY_CARD: string = `xpath=//div[@data-testid="category-card-title"][text()="<param>"]`
    async clickOnCategoryCard(text: string): Promise<void> {
        await this.helper.clickOnElement(this.CATEGORY_CARD.replace("<param>", text));
    }
    async verifyCategoryCardIsVisible(text: string): Promise<void> {
        await this.helper.toBeVisible(this.CATEGORY_CARD.replace("<param>", text));
    }
    async clickOnCategoryCardwithText(text: string): Promise<void> {
        await this.helper.clickOnElement(this.CATEGORY_CARD.replace("<param>", text));
    }
    private readonly CATEGORY_CARD_DESCRIPTION: string = `xpath=//div[@data-testid="category-description" and text()="<param>"]`
    async verifyCategoryCardDescriptionIsVisible(text: string): Promise<void> {
        await this.helper.toBeVisible(this.CATEGORY_CARD_DESCRIPTION.replace("<param>", text));
    }
    async clickOnCategoryWithCardDescription(text: string): Promise<void> {
        await this.helper.clickOnElement(this.CATEGORY_CARD_DESCRIPTION.replace("<param>", text));
    }
    private readonly SHOW_FILTERS_BUTTON: string = `xpath=//div[@data-testid="navbar-button-sidebar"]`
    async clickOnShowFiltersButton(): Promise<void> {
        await this.helper.clickOnElement(this.SHOW_FILTERS_BUTTON);
    }

    private readonly SHOW_FILTERS_BUTTON_MOBILE: string = `xpath=//div[@data-testid="navbar-button-sidebar"]`
    async validateFilterButtonIsNotVisible(): Promise<void> {
        await this.helper.toBeNotVisible(this.SHOW_FILTERS_BUTTON_MOBILE);
    }

    private readonly SORT_BUTTON: string = `xpath=//div[@data-testid="plp-sort-button"]`
    async validateSortButtonIsNotVisible(): Promise<void> {
        await this.helper.waitForPageLoad()
        await this.helper.waitForDomContentToLoad()
        await this.helper.toBeNotVisible(this.SORT_BUTTON);
    }
    async clickOnSortButton(): Promise<void> {
        await this.helper.waitForPageLoad()
        await this.helper.clickOnElement(this.SORT_BUTTON);
    }

    private readonly FILTER_PANEL: string = `xpath=//div[@data-testid="filters-panel"]`
    async validateFiltersPanelIsOpened(): Promise<void> {
        await this.helper.toBeVisible(this.FILTER_PANEL);
    }

    private readonly FILTERS_SIDEPANEL_TEXT: string = `xpath=//div[@data-testid="sidebar-item"]//div[text() = '<param>']`
    async validateSidebarItemWithTextIsDisplayed(text: string): Promise<void> {
        await this.helper.toBeVisible(this.FILTERS_SIDEPANEL_TEXT.replace("<param>", text));
    }
    async clickOnSidebarItemWithText(text: string): Promise<void> {
        await this.helper.clickOnElement(this.FILTERS_SIDEPANEL_TEXT.replace("<param>", text));
    }
    async hoverOnSidebarItemWithText(text: string): Promise<void> {
        await this.helper.hoverOnElement(this.FILTERS_SIDEPANEL_TEXT.replace("<param>", text));
    }


    private readonly COUNTOF_PRODUCTS_FILTER_SIDEPANEL_TEXT: string = `xpath=//div[text()= '<param1>']//parent::div[@data-testid='sidebar-item']//div[text()!= '<param2>']`
    async verifyTheCountOfProductsOfFilter(filterName: string): Promise<string> {
        return await this.helper.getTextOfAnElement(this.COUNTOF_PRODUCTS_FILTER_SIDEPANEL_TEXT.replace("<param1>", filterName).replace("<param2>", filterName));
    }



    private readonly PLP_CARD: string = "xpath=//div[@data-testid='product-card-test-id']"
    async totalNumberOfProductsInAPLP(): Promise<string> {
        return (await this.helper.getCountOfElements(this.PLP_CARD)).toString()
    }




    private readonly CLOSE_BUTTON: string = "xpath=//div[@data-testid='navbar-button-open-close' and @title='Close']"
    async clickOnCloseButton(): Promise<void> {
        await this.helper.clickOnElement(this.CLOSE_BUTTON)
    }

    private readonly OPEN_ARROW_UP_BUTTON: string = "xpath=//div[@data-testid='navbar-button-open-close' and @title='Open']"
    async clickOnOpenButton(): Promise<void> {
        await this.helper.clickOnElement(this.OPEN_ARROW_UP_BUTTON)
    }
    async verifyOpenButtonIsVisible(): Promise<void> {
        await this.helper.toBeVisible(this.OPEN_ARROW_UP_BUTTON)
    }

    async verifyOpenButtonIsNotVisible(): Promise<void> {
        await this.helper.toBeNotVisible(this.OPEN_ARROW_UP_BUTTON)
    }

    async pressKeyboardButton(action: string): Promise<void> {
        await this.helper.keyboardOps(action)
    }


    private readonly SIZE_GUIDE_LINK: string = "xpath=//a[text()='Size Guide']"
    async clickOnSizeGuide(): Promise<void> {
        await this.helper.clickOnElement(this.SIZE_GUIDE_LINK)
    }
    private readonly DESKTOP_SIZE_GUIDE_POPUP: string = "xpath=//div[@data-testid='pull-down-modal']"
    async verifySizeGuideWindowPopupIsVisibleDesktop(): Promise<void> {
        await this.helper.toBeVisible(this.DESKTOP_SIZE_GUIDE_POPUP)
    }
    async verifySizeGuideWindowPopupIsNotVisibleDesktop(): Promise<void> {
        await this.helper.toBeNotVisible(this.DESKTOP_SIZE_GUIDE_POPUP)
    }
    private readonly DESKTOP_SIZE_GUIDE_WINDOW_POPUP_CLOSE_BUTTON: string = "xpath=//div[@data-testid='modal-button-close']"
    async clickOnSizeGuideWindowPopupCloseButtonDesktop(): Promise<void> {
        await this.helper.clickOnElement(this.DESKTOP_SIZE_GUIDE_WINDOW_POPUP_CLOSE_BUTTON)
    }

    async getCurrentPageUrl(): Promise<string> {
        return await this.helper.getCurrentURL(this.page)
    }

    private readonly CART_LIST_ITEM_VARIANT_DETAILS: string = `xpath=//div[@data-testid='product-listitem-variant-details' and text()='<param>']`
    async expectMiniCartVariantDetails(details: string): Promise<void> {
        await this.helper.toBeVisible(this.CART_LIST_ITEM_VARIANT_DETAILS.replace("<param>", details));
    }

    private readonly CART_LIST_ITEM_REMOVE_BUTTON: string = `xpath=//div[text()='<param>']//ancestor::div[@data-testid='product-listitem-test-id']//div[@data-testid='cart-remove-item']`
    async clickOnCartItemListRemoveButton(title: string): Promise<void> {
        await this.helper.clickOnElement(this.CART_LIST_ITEM_REMOVE_BUTTON.replace("<param>", title));
    }

    private readonly EMPTY_SHOPPING_CART_MESSAGE: string = `xpath=//div[@data-testid='cart']//p[text()='Shopping cart is empty.']`
    async validateShoppingCartIsEnptyMessageIsVisible(): Promise<void> {
        await this.helper.toBeVisible(this.EMPTY_SHOPPING_CART_MESSAGE);
    }

    private readonly MINI_CART_CLOSE_LINK: string = `xpath=//div[@data-testid="cart"]//div[@data-testid="cart-close-button"]`
    async clickOnMinicartCloseLink(): Promise<void> {
        await this.helper.clickOnElement(this.MINI_CART_CLOSE_LINK);
    }

    private readonly PRODUCT_CARD_WITH_INDEX: string = `xpath=(//div[@data-testid="product-card-test-id"]//div[@data-testid="product-card-title"])[<param>]`
    async getProductCardTitleWithIndex(index: string): Promise<string> {
        return await this.helper.getTextOfAnElement(this.PRODUCT_CARD_WITH_INDEX.replace("<param>", index));
    }
}


