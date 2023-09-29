import test from '../../../../../utils/baseTest';
import { expect } from '@playwright/test';
test.beforeAll(async () => {
});

test.beforeEach(async ({ plpPage }, testInfo) => {
    testName = testInfo.title;
    test.setTimeout(60000)
    await plpPage.navigateTo('KDWbWQqgM', 'bottom')

});

var testName: any;
test.afterEach(async ({ commonFunction }) => {
    if (process.env.PERCY_TOKEN) {
        await commonFunction.takePercySnapshot(`${testName}`);
    }
});
test.afterAll(async () => {
});

test(`9B8AF790	Verify scroll restoration works in PLP when navigating from a PDP	S1`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Men');
    await plpPage.scrollToBottomOfPage()
    await plpPage.clickOnProductCardWithText('Mukayu Gym Bag - Indigo')
    await plpPage.clickOnBackButtonOnPDP()
    await plpPage.hoverOnProductCardWithText('Mukayu Gym Bag - Indigo')
});

test(`	Verify when the user clicks on the "Scroll To Top" icon, it moves to the top of the page	S1`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Men');
    await plpPage.scrollToBottomOfPage()
    await plpPage.clickOnProductCardWithText('Mukayu Gym Bag - Indigo')
    await plpPage.clickOnBackButtonOnPDP()
    await plpPage.hoverOnProductCardWithText('Mukayu Gym Bag - Indigo')
});

test(`8204DB3E	Verify when the user clicks on the "Scroll To Top" icon, it moves to the top of the page	S1`, async ({ clpPage }) => {
    await clpPage.clickOnL1NavWithText('Men');
    await clpPage.scrollToBottomOfPage()
    await clpPage.clickOnScrollToTopButton();
    await clpPage.hoverOnProductCardWithText('Lounge Pants - Red')

});

test(`72A081E4	Verify when the user navigates from one menu to another and clicks back, it should not retain the previous selected menu	S1 @visual-test`, async ({ clpPage }) => {
    await clpPage.clickOnL1NavWithText('Men');
    await clpPage.clickOnL2NavWithText('Trousers');
    expect(await clpPage.validateL2NavWithTextIsSelected('Trousers')).toBe(true)
    await clpPage.clickOnL1NavWithText('Women');
    await clpPage.clickOnL2NavWithText('Tops');
    expect(await clpPage.validateL2NavWithTextIsSelected('Tops')).toBe(true)
    await clpPage.clickOnL1NavWithText('Men');
    expect(await clpPage.validateL2NavWithTextIsSelected('All')).toBe(true)
});


test(`DBA23D2A	Verify when the user navigates from a menu to Quick view and when QV is closed, it should retain the previous selected menu	S2 @visual-test`, async ({ clpPage }) => {
    await clpPage.clickOnL1NavWithText('Jwellery');
    await clpPage.clickOnL2NavWithText('Bangles & Bracelets')
    await clpPage.clickOnProductCardWithText('Alphabet K Rakhi - Silver')
    await clpPage.clickOnBackButtonOnPDP()
    expect(await clpPage.validateL2NavWithTextIsSelected('Bangles & Bracelets')).toBe(true)
});

test(`F0D7B630	Verify when the user hovers on the bottom bar, it should display tabs like Shop, Instagram, or whatever category content is configured	S1 @visual-test`, async ({ clpPage }) => {
    await clpPage.hoverOnL1NavWithText('Jwellery');
    await clpPage.verifyCategoryCardIsVisible('Ear Rings')
    await clpPage.hoverOnL1NavWithText('New Arrivals');
    await clpPage.verifyCategoryCardIsVisible('Serenity Women')
    await clpPage.hoverOnL1NavWithText('YouInNav');
    await clpPage.verifyCategoryCardDescriptionIsVisible('Blue Plate')
});

test(`F7A53092	Verify the user can navigate to categories by hovering on the bottom nav	S2`, async ({ clpPage }) => {
    await clpPage.hoverOnL1NavWithText('Jwellery');
    await clpPage.clickOnCategoryCardwithText('Ear Rings')
    expect(await clpPage.getTextOfLevelOneNthBreadCrumbHeader('1')).toBe('Ear Rings')
});

test(`F7A53091	Verify the user can navigate to categories by hovering on the bottom nav	S2`, async ({ clpPage }) => {
    await clpPage.clickOnL1NavWithText('Jwellery');
    await clpPage.verifyCLPSectionHeaderIsVisible('Jwellery')
});

test(`A1F9BA7C	Verify the user is able to navigate to the PDP page on hovering over menus on the bottom bar	S2 @visual-test`, async ({ clpPage }) => {
    await clpPage.clickOnL1NavWithText('Jwellery');
    await clpPage.verifyCLPSectionHeaderIsVisible('Jwellery')
    await clpPage.clickOnL2NavWithText('Bangles & Bracelets')
    await clpPage.clickOnProductCardWithText('Alphabet K Rakhi - Silver')
    await clpPage.validatePdpProductTitleIsDisplayed('Alphabet K Rakhi - Silver', '1')
});

test(`1CC7D36E	Verify the user is able to open the QV page on clicking "View Products" while hovering over the bottom bar	S2 @visual-test`, async ({ clpPage, qvPage }) => {
    await clpPage.hoverOnL1NavWithText('YouInNav');
    await clpPage.clickOnCategoryWithCardDescription('Blue Plate')
    expect(await qvPage.getMediaDescriptionOnQVPage()).toBe('Blue Plate')
});