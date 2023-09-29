import test from '../../../../../utils/baseTest';
import { expect } from '@playwright/test';

test.beforeAll(async () => {
});

test.beforeEach(async ({ pdpPage }, testInfo) => {
    testName = testInfo.title;
    test.setTimeout(60000)
    await pdpPage.navigateTo('KDWbWQqgM', 'bottom', '&QNConfigId=KDWbWQqgM&QNTabId=navigation&QNCategoryId=b2S7vHReD&QNProductCategoryId=b2S7vHReD&QNProductId=8407407821117&QNVariantId=45569405092157')
});

var testName: any;
test.afterEach(async ({ commonFunction }) => {
    if (process.env.PERCY_TOKEN) {
        await commonFunction.takePercySnapshot(`${testName}`);
    }
});
test.afterAll(async () => {
});

test(`836F2503	Validate that size variants are not selected by default on opening a PDP	S1 @visual-test`, async ({ pdpPage }) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    expect(await pdpPage.validateSizeOptionIsSelected('XS')).toBe(false)
    expect(await pdpPage.validateSizeOptionIsSelected('S')).toBe(false)
    expect(await pdpPage.validateSizeOptionIsSelected('L')).toBe(false)
    expect(await pdpPage.validateSizeOptionIsSelected('M')).toBe(false)
    expect(await pdpPage.validateSizeOptionIsSelected('XL')).toBe(false)
});

test(`8212EF15	Verify that the user is able to add a product to the cart from PDP, and then the "Add to cart" pop-up is displayed when the mini cart feature is not enabled	S2 @visual-test`, async ({ pdpPage }) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    await pdpPage.clickPdpSizeOption('S')
    await pdpPage.clickOnPdpAddToCartButtonCtaButton('1')
    expect(await pdpPage.getTextOfAllItemsOfTheCart()).toContain('Gathered Jersey Top - Charcoal')
});

test(`4B6CB9B9	Verify that the user is able to view a warning when the user tries to add a product to the cart without selecting a size	S2 @visual-test`, async ({ pdpPage }) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    await pdpPage.clickOnPdpAddToCartButtonCtaButton('1')
    await pdpPage.validateSizeErrorMessageIsDisplayed('Please select a size')
});

test(`23E4884E	Verify that the user is able to view product description, promo text, quick shipping info, Arrival, Return policy, and product price prefix	S2,9D939F18	Verify that the user is able to see the "In stock" text when the user opens an in-stock product PDP	S2 @visual-test`, async ({ pdpPage }) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    await pdpPage.validateInfoOnPdp('Get 10% off your first order! Use code "HELLOTHERE"')
    await pdpPage.validateInfoOnPdp('In Stock')
    await pdpPage.validateInfoOnPdp('It usually takes 5-7 business days depending on your location. Please do not accept the package if it’s tampered with.')
    await pdpPage.validateInfoOnPdp('Shipping charges will be calculated on checkout page for all orders below INR 1,000. Anything over and above is shipped for free')
    await pdpPage.clickOnReturnAndShippingTab()
    expect(await pdpPage.validateProductInfoOnPdp()).toContain('Easy returns and exchanges within 15 days of delivery.')
    await pdpPage.clickOnDescriptionTab()
    await pdpPage.validateProductDescriptionInfoOnPdp('This super soft top has a gathered front for a flattering silhouette')
});

test(`A058C749	Verify that the user is able to add products to the cart from the sticky bar, by selecting a size	S2`, async ({ pdpPage }, testInfo) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    await pdpPage.clickPdpSizeOption('S')
    await pdpPage.scrollToProductCardInPdp('Ukiyo Racerback Tank - Charcoal')
    await pdpPage.clickOnPdpAddToCartButtonCtaButton('1')
    expect(await pdpPage.getTextOfAllItemsOfTheCart()).toContain('Gathered Jersey Top - Charcoal')
});

test(`6A1CD0F1	Verify that the page is scrolled to the error message when the size variant is not selected, and the user tries to add the product to the cart from the sticky bar	S2`, async ({ pdpPage }, testInfo) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    //await pdpPage.scrollToSizeButtonsOnPdp('S')
    await pdpPage.scrollToProductCardInPdp('Ukiyo Racerback Tank - Charcoal')
    await pdpPage.clickOnPdpAddToCartButtonCtaButton('1')
    await pdpPage.validateSizeErrorMessageIsDisplayed('Please select a size')
});
test(`50E249EB	Verify that the user is able to add products to the cart from "Products from this category" with a single size variant	S2 @visual-test`, async ({ pdpPage }) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    //await pdpPage.scrollToSizeButtonsOnPdp('S')
    await pdpPage.scrollToProductCardInPdp('Baggy Sweater - Olive')
    await pdpPage.hoverOnProductCardWithText('Baggy Sweater - Olive')
    await pdpPage.clickOnProductCardAddToCartButton('Baggy Sweater - Olive')
    expect(await pdpPage.getTextOfAllItemsOfTheCart()).toContain('Baggy Sweater - Olive')
});

test(`F1A39C8C	Verify that the user is able to add products to the cart from "Products from this category" with multiple size variants	S2`, async ({ pdpPage }, testInfo) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    //await pdpPage.scrollToSizeButtonsOnPdp('S')
    await pdpPage.scrollToProductCardInPdp('Ukiyo Racerback Tank - Charcoal')
    await pdpPage.hoverOnProductCardWithText('Ukiyo Racerback Tank - Charcoal')
    await pdpPage.clickOnProductCardAddToCartButton('Ukiyo Racerback Tank - Charcoal')
    await pdpPage.selectProductCardSizeOption('M')
    expect(await pdpPage.getTextOfAllItemsOfTheCart()).toContain('Ukiyo Racerback Tank - Charcoal')
});

test(`7916108D	Verify that the user is able to open the PDP of the selected product from "Products from this category" section	S2,SC4630087	Verify that the user is able to open the PDP of the selected product from "Products from this category" section, and "Add to cart" works	S2`, async ({ pdpPage }) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    await pdpPage.scrollToBottomOfPage()
    await pdpPage.clickOnProductCardWithText('Shift Top')
    await pdpPage.validatePdpProductTitleIsDisplayed('Shift Top', '1')
    await pdpPage.clickPdpSizeOption('S')
    await pdpPage.clickOnAddToCartButtonOnPullDowmModal('1')
    expect(await pdpPage.getTextOfAllItemsOfTheCart()).toContain('Shift Top')
});

test(`6439F705	Verify that the "View details" button lands on the respective page without selecting a size option	S2`, async ({ pdpPage }, testInfo) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    await pdpPage.clickOnViewDetailsButton()
    expect(await pdpPage.getCurrentPageUrl()).toContain('https://qa-automation-store-1.myshopify.com')
});

test(`412C2235	Verify that the "View details" button lands on the respective page by selecting a size option	S2`, async ({ pdpPage }, testInfo) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    await pdpPage.clickPdpSizeOption('S')
    await pdpPage.clickOnViewDetailsButton()
    expect(await pdpPage.getCurrentPageUrl()).toContain('https://qa-automation-store-1.myshopify.com')
});

test(`DBAAF74F	Verify that the user is able to view "Add to cart" as the primary button	S2`, async ({ pdpPage }, testInfo) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    await pdpPage.validateAddToCartIsPrimaryCta('1')
})

test(`B19D4EB4	Verify that the user is able to switch between images on the zoom image	S2 @visual-test`, async ({ pdpPage }) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    await pdpPage.clickNthPdpPhotoImage('1')
    expect(await pdpPage.validatePdpThumbnailImageIsSelected('0', '2')).toBe('photo-thumbnail-selected')
    await pdpPage.clickPdpZoomThumbnailImage('2', '2')
    expect(await pdpPage.validatePdpThumbnailImageIsSelected('2', '2')).toBe('photo-thumbnail-selected')
})

test(`D59B7B40	Verify that the user lands on the PDP page after closing the zoom image overlay	S2`, async ({ pdpPage }, testInfo) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    await pdpPage.clickNthPdpPhotoImage('1')
    await pdpPage.clickPdpZoomImageCloseButtonOnDesktop('2')
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
})

test(`102EC8AD	Verify that the first image thumbnail is always selected on landing on the PDP page	S2 @visual-test`, async ({ pdpPage }) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    await pdpPage.hoverOnkNthPdpPhotoImage('1')
    expect(await pdpPage.validatePdpThumbnailImageIsSelected('0', '1')).toBe('photo-thumbnail-selected')
})

test(`46B5297D	Verify that the user is able to switch between thumbnails, and the related image is displayed as the PDP image	S2`, async ({ pdpPage }, testInfo) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    await pdpPage.hoverOnkNthPdpPhotoImage('1')
    await pdpPage.clickPdpZoomThumbnailImage('2', '1')
    expect(await pdpPage.validatePdpThumbnailImageIsSelected('2', '1')).toBe('photo-thumbnail-selected')
})

test(`EE05E31F	Verify that the user is able to increase the quantity of the product in the mini cart when the quantity picker is enabled	S2 @visual-test`, async ({ pdpPage }) => {
    await pdpPage.validatePdpProductTitleIsDisplayed('Gathered Jersey Top - Charcoal', '1')
    await pdpPage.clickPdpSizeOption('S')
    await pdpPage.clickOnPdpAddToCartButtonCtaButton('1')
    expect(await pdpPage.getTextOfAllItemsOfTheCart()).toContain('Gathered Jersey Top - Charcoal')
    await pdpPage.clickOnQuantityPickerPlusButtonOnMiniCart()
    expect(await pdpPage.getProductQuantityOnMiniCart()).toBe('2')
})










