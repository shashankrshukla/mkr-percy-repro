import { Page, BrowserContext, Locator } from '@playwright/test';
import { Helper } from "../../../utils/helper";
import { BasePage } from '../base.page';

// import { testConfig } from '../../testConfig';

let helper: Helper;

export class PlpPage extends BasePage {

    constructor(page: Page) {
        super(page); // Call the super constructor to initialize the page and context properties from the BasePage
        helper = new Helper(this.page);
    }

    private readonly PLP_QUANTITY_PICKER_PLUS_BUTTON_ON_MINI_CART: string = `xpath=//div[@data-testid="product-listitem-test-id"]//div[@data-testid="pdp-quantity-picker"]//div[@data-testid="pdp-quantity-plus"]`
    async clickOnQuantityPickerPlusButtonOnMiniCart(): Promise<void> {
        await this.helper.clickOnElement(this.PLP_QUANTITY_PICKER_PLUS_BUTTON_ON_MINI_CART)
    }

    private readonly PLP_QUANTITY_PICKER_QUANTITY: string = `xpath=//div[@data-testid="product-listitem-test-id"]//div[@data-testid="pdp-quantity-picker"]//input[@data-testid="pdp-quantity-input"]`
    async getProductQuantityOnMiniCart(): Promise<string> {
        return await this.helper.getAttributeValue(this.PLP_QUANTITY_PICKER_QUANTITY, 'value')
    }

    private readonly SORT_OPTIONS: string = `xpath=//div[@data-testid="filters-option"]//div[text()="<param>"]`
    async clickOnSortOption(option: string): Promise<void> {
        await this.helper.clickOnElement(this.SORT_OPTIONS.replace('<param>', option))
        await this.helper.waitFor()
    }

    private readonly SIDE_BAR_PANEL: string = `xpath= //div[@data-testid="sidebar"]`
    async validateSideBarPanelIsOpened(): Promise<void> {
        await this.helper.toBeVisible(this.SIDE_BAR_PANEL)
    }

    private readonly QUANTITY_PICKER: string = `xpath=//div[@data-testid="product-listitem-test-id"]//div[@data-testid="pdp-quantity-picker"]`
    async validateQuantityPickerIsNotVisible(): Promise<void> {
        await this.helper.toBeNotVisible(this.QUANTITY_PICKER)
    }

    private readonly NO_OF_PRODUCT_CARDS_IN_A_ROW: string = `xpath=//div[contains(@class,'QVTW__grid-cols-<param>')]`
    async validateNoOfProductCardsInARow(count: string): Promise<void> {
        await this.helper.toBeVisible(this.NO_OF_PRODUCT_CARDS_IN_A_ROW.replace('<param>', count))
    }

    private readonly ZOOM_BUTTON_PLUS_BUTTON: string = `xpath=//div[@data-testid="zoom-button-grid-density-zoom-plus"]`
    async clickOnZoomButtonPlusButton(): Promise<void> {
        await this.helper.clickOnElement(this.ZOOM_BUTTON_PLUS_BUTTON)
    }

    private readonly ZOOM_BUTTON_MINUS_BUTTON: string = `xpath=//div[@data-testid="zoom-button-grid-density-zoom-minus"]`
    async clickOnZoomButtonMinusButton(): Promise<void> {
        await this.helper.clickOnElement(this.ZOOM_BUTTON_MINUS_BUTTON)
    }

    private readonly ZOOM_BUTTON: string = `xpath=//div[@data-testid="plp-zoom-button"]`
    async clickOnZoomButton(): Promise<void> {
        await this.helper.clickOnElement(this.ZOOM_BUTTON)
    }

    private readonly CLOSE_BUTTON_ON_PINCH_IN_ZOOM: string = `xpath=//video[@data-video-loop="true"]/parent::div//div`
    async clickOnCloseButtonOnPinchInZoom(): Promise<void> {
        await this.helper.clickOnElement(this.CLOSE_BUTTON_ON_PINCH_IN_ZOOM)
    }
}