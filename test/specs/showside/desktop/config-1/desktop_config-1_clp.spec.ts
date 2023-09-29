import test from '../../../../../utils/baseTest';
import { expect } from '@playwright/test';
test.beforeAll(async () => {
});

test.beforeEach(async ({ clpPage }, testInfo) => {
    testName = testInfo.title;
    test.setTimeout(60000)
    await clpPage.navigateTo('KDWbWQqgM', 'bottom')
});
var testName: any;
test.afterEach(async ({ commonFunction }) => {
    if (process.env.PERCY_TOKEN) {
        await commonFunction.takePercySnapshot(`${testName}`);
    }
});
test.afterAll(async () => {
});

test(`48605518	Enable the "First Card" feature and validate that clicking on the first category card should navigate to the Parent category PLP page	S3 @visual-test`, async ({ clpPage }) => {
    await clpPage.clickOnL1NavWithText('Jwellery');
    await clpPage.expectNthCardUnderHeadingNameIsVisible('Jwellery', '1')
});

test(`B1707DBD	Verify that the user is able to click on the "See All" link text and navigate to the PLP page of the category, and validate breadcrumbs for the same on the PLP page	S1`, async ({ clpPage }) => {
    await clpPage.navigateTo('7xbe6MbWz', 'bottom', '&QNConfigId=7xbe6MbWz&QNTabId=navigation')
    await clpPage.clickOnSeeAllLinkOfSectionHeader('New Arrivals')
    expect(await clpPage.getTextOfLevelOneNthBreadCrumbHeader('1')).toBe('New Arrivals')
});

test(`67C533EF	Verify that the user should not be able to see the sort option in CLP pages	S1`, async ({ clpPage }) => {
    await clpPage.clickOnL1NavWithText('Home');
    await clpPage.validateSortButtonIsNotVisible()
});



test(`089C9903	Verify that the user is able to add product to the cart on the slider with color variant, and validate the same on the mini cart.	S2 @visual-test`, async ({ clpPage }) => {
    await clpPage.clickOnL1NavWithText('Accessories');
    await clpPage.scrollToClpSectionHeader('Essentials')
    await clpPage.hoverOnProductCardWithTextAndIndex('Little Stripey Bold Mask Set', '1')
    await clpPage.hoverOnVarientCardWithColor('Little Stripey Bold Mask Set', '1', 'Green')
    await clpPage.clickOnProductCardAddToCartButtonWithIndex('Little Stripey Bold Mask Set', '1')
    await clpPage.clickOnProductSelectSizeButton('s')
    await clpPage.expectAddToCartContainsColorVarientWithName('Green')
});

test(`089C9903	Alternate  @visual-test`, async ({ clpPage }) => {
    await clpPage.clickOnL1NavWithText('Accessories');
    await clpPage.scrollToClpSectionHeader('Essentials')
    await clpPage.hoverOnProductCardWithTextAndIndex('Little Stripey Bold Mask Set', '1')
    await clpPage.hoverOnVarientCardWithColor('Little Stripey Bold Mask Set', '1', 'Pink')
    await clpPage.clickOnProductCardAddToCartButtonWithIndex('Little Stripey Bold Mask Set', '1')
    await clpPage.clickOnProductSelectSizeButton('s')
    await clpPage.expectAddToCartContainsColorVarientWithName('Pink')
});



test(`General Validation of cards	S3  @visual-test`, async ({ clpPage }) => {
    await clpPage.clickOnHomeButton();
    await clpPage.clickOnNthCardUnderHeadingName('Women', '1');
    expect(await clpPage.getTextOfBreadCrumbHeader()).toBe('WomenDresses & Overlays')
    await clpPage.clickOnHomeButton();
    await clpPage.clickOnNthCardUnderHeadingName('Women', '2');
    expect(await clpPage.getTextOfBreadCrumbHeader()).toBe('WomenKurtas')
    await clpPage.clickOnHomeButton();
    await clpPage.clickOnNthCardUnderHeadingName('Women', '3');
    expect(await clpPage.getTextOfBreadCrumbHeader()).toBe('WomenTops')
    await clpPage.clickOnHomeButton();
    await clpPage.clickOnNthCardUnderHeadingName('Women', '4');
    expect(await clpPage.getTextOfBreadCrumbHeader()).toBe('WomenBottoms')
    await clpPage.clickOnHomeButton();
    await clpPage.clickOnNthCardUnderHeadingName('Women', '5');
    expect(await clpPage.getTextOfBreadCrumbHeader()).toBe('WomenSarees & Dupattas')
    await clpPage.clickOnHomeButton();
}); ``

test(`29098EE4	Verify scroll restoration works in CLP when navigating from a PDP	S1  @visual-test`, async ({ clpPage }) => {
    await clpPage.clickOnL1NavWithText('Home');
    await clpPage.scrollToBottomOfCLPPage()
    await clpPage.clickOnProductCardWithText('Trio Candle (Set of 3)');
    await clpPage.clickOnBackButtonOnPDP()
    await clpPage.hoverOnProductCardWithTextAndIndex('Trio Candle (Set of 3)', '1')
});