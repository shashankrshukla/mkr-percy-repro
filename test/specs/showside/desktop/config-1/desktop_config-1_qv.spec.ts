import test from '../../../../../utils/baseTest';
import { expect } from '@playwright/test';
test.beforeAll(async () => {
});

test.beforeEach(async ({ qvPage }, testInfo) => {
    testName = testInfo.title;
    test.setTimeout(60000)
    await qvPage.navigateTo('KDWbWQqgM', 'bottom')

});
var testName: any;
test.afterEach(async ({ commonFunction }) => {
    if (process.env.PERCY_TOKEN) {
        await commonFunction.takePercySnapshot(`${testName}`);
    }
});

test.afterAll(async () => {
});

test(`46F81174	Verify user is able to view products in the cart when the user adds products to the cart and the mini cart feature is enabled	S1`, async ({ qvPage }) => {
    await qvPage.clickOnL1NavWithText('YouInNav');
    await qvPage.hoverOnNthQVCardUnderHeadingName('YouInNav', '1')
    await qvPage.clickOnNthQVPinOnCard('1', '2')
    await qvPage.clickOnTitleOfProductInQVPage('Madagascar Cup - Pink')
    await qvPage.pressKeyboardButton('down')
    await qvPage.pressKeyboardButton('down')
    await qvPage.pressKeyboardButton('down')
    await qvPage.pressKeyboardButton('down')
    await qvPage.pressKeyboardButton('right')
    await qvPage.pressKeyboardButton('right')
    await qvPage.clickOnQVAddToCartButton()
    await qvPage.expectAddToCartContainsProductWithName('Madagascar Cup - Pink')
    await qvPage.expectAddToCartContainsProductWithName('Pink')
    await qvPage.expectAddToCartContainsProductWithName('Pink, 7D x 9.5H cm')
});

test(`4D96FD39	Verify that clicking on product stack images from QV, the user should be able to navigate to the corresponding PDP page	S2 @visual-test`, async ({ qvPage }) => {
    await qvPage.clickOnL1NavWithText('YouInNav');
    await qvPage.hoverOnNthQVCardUnderHeadingName('YouInNav', '3')
    await qvPage.clickOnNthQVCardUnderHeadingName('YouInNav', '3')
    await qvPage.hoverOnProductStackOnQV('2')
    await qvPage.hoverOnProductStackOnQV('1')
    await qvPage.productWithNameFromProductStackIsVisible('Round Tea Pot')
    await qvPage.hoverOnProductStackOnQV('2')
    await qvPage.productWithNameFromProductStackIsVisible('Ocha Tea Cups (Set of 4)')
});

test(`	Verify that clicking on product stack images from QV, the user should be able to navigate to the corresponding PDP page	S2`, async ({ qvPage }) => {
    await qvPage.clickOnL1NavWithText('YouInNav');
    await qvPage.clickOnNthQVCardUnderHeadingName('YouInNav', '1')
    await qvPage.hoverOnPinIndex('1')
    await qvPage.cardWithProductNameVisible('Madagascar Cup - Blue')

});

test(`E260BAD4  Verify user is able to click on the PIP image and able to see the PIP stack on PLP, CLP, PDP, and the Home page S1 @visual-test`, async ({ qvPage }) => {
    await qvPage.clickOnL1NavWithText('YouInNav');
    await qvPage.hoverOnNthQVCardUnderHeadingName('YouInNav', '3')
    await qvPage.hoverOnProductStackOnQV('2')
    await qvPage.productCardWithIndexHasStackWithIndex('3', '1')
    await qvPage.productCardWithIndexHasStackWithIndex('3', '2')
});
