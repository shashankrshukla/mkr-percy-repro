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

test(`606D18C0	Verify that users can add the item to the cart when clicked, either without any variant selection or when the product has only one size variant.	S1 @visual-test`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Women');
    await plpPage.hoverOnProductCardWithText('Baggy Sweater - Olive')
    await plpPage.clickOnProductCardAddToCartButton('Baggy Sweater - Olive')
    await plpPage.hoverOnProductCardWithText('Baggy Sweater - Olive')
    await plpPage.clickOnProductCardAddToCartButton('Baggy Sweater - Olive')
    //add assertion after adding datatest-id
});
test(`47090F85	Verify that when the user selects a color variant on the Product Listing Page (PLP), the system navigates to the Product Detail Page (PDP) with the selected color variant being highlighted.	S1 @visual-test`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Women');
    await plpPage.clickOnL2NavWithText('Dresses & Overlays')
    await plpPage.hoverOnProductCardWithText('A-line Dress')
    await plpPage.selectProductCardColor('Yellow')
    await plpPage.validatePdpProductTitleIsDisplayed('A-line Dress', '1')
    expect(await plpPage.validatePdpColorVariantIsSelected('Yellow')).toBe('true')
})
test(`6EF24EE2	Verify that users can click on "Show filters," and the left panel displaying the relevant filters opens. Clicking on "Hide filters" should close the filters panel.	S1`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Accessories');
    await plpPage.clickOnCategoryCard('All Accessories')
    await plpPage.clickOnShowFiltersButton()
    await plpPage.validateFiltersPanelIsOpened()
})
test(`F3B328A0	Verify that the user is able to view and click on the clickable Breadcrumbs (Format M1 / M2) of Menu	S1`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Jwellery');
    await plpPage.clickOnL2NavWithText('Bangles & Bracelets')
    expect(await plpPage.getTextOfBreadCrumbHeader()).toBe('JwelleryBangles & Bracelets')
    await plpPage.clickOnBreadcrumbItem('Jwellery')
    await plpPage.validateClpSectionHeaderToBeDisplayed('Jwellery')
});

test(`B78E83F0	Verify that the user is able to scroll to the top of the PLP page when clicking on the "Scroll Back to Top" button	S1`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('New Arrivals');
    await plpPage.clickOnL2NavWithText('Serenity Men')
    await plpPage.scrollToBottomOfPage()
    await plpPage.clickOnScrollToTopButton()
    await plpPage.ValidateProductCardWithTextToBeDisplayed('Lounge Pants - Red')
});

test(`1E1055F6	Verify that users can successfully add items to the cart after selecting the size variant on product cards. Additionally, validate that the selected items' name, size, quantity, and color are accurately reflected in the mini cart when the mini cart feature is enabled.	S2 @visual-test`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Women');
    await plpPage.hoverOnProductCardWithText('Gathered Jersey Top - Charcoal')
    await plpPage.clickOnProductCardAddToCartButton('Gathered Jersey Top - Charcoal')
    await plpPage.selectProductCardSizeOption('XS')
    expect(await plpPage.getTextOfAllItemsOfTheCart()).toContain('Gathered Jersey Top - Charcoal')
    await plpPage.expectMiniCartVariantDetails('Charcoal, XS')
})

test(`897C3E09	Verify that users can see color variants of the product below the product card when hovering on product cards.	S3`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Women');
    await plpPage.clickOnL2NavWithText('Dresses & Overlays');
    await plpPage.hoverOnProductCardWithText('A-line Dress')
    await plpPage.validateProductCardColorVariantsIsVisible('White')
    await plpPage.validateProductCardColorVariantsIsVisible('Yellow')
})

test(`FFD79D6E	Verify that users can increase the quantity of the product on the Mini cart when the "Quantity Picker" feature is toggled ON.	S2 @visual-test`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Women');
    await plpPage.hoverOnProductCardWithText('Baggy Sweater - Olive')
    await plpPage.clickOnProductCardAddToCartButton('Baggy Sweater - Olive')
    await plpPage.clickOnQuantityPickerPlusButtonOnMiniCart()
    expect(await plpPage.getProductQuantityOnMiniCart()).toBe('2')
})

test(`EAD05615	Verify users can remove single/multiple products from the mini cart.	S3,D78A7664	Verify that users can see the "Shopping cart is empty" text on the Mini cart once all the products are removed.	S1,EF1970E8	Verify user is able to close mini cart on clicking close button.	S3 @visual-test`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Women');
    await plpPage.hoverOnProductCardWithText('Baggy Sweater - Olive')
    await plpPage.clickOnProductCardAddToCartButton('Baggy Sweater - Olive')
    await plpPage.hoverOnProductCardWithText('Gathered Jersey Top - Charcoal')
    await plpPage.clickOnProductCardAddToCartButton('Gathered Jersey Top - Charcoal')
    await plpPage.selectProductCardSizeOption('XS')
    expect(await plpPage.getTextOfAllItemsOfTheCart()).toContain('Gathered Jersey Top - Charcoal')
    expect(await plpPage.getTextOfAllItemsOfTheCart()).toContain('Baggy Sweater - Olive')
    await plpPage.clickOnCartItemListRemoveButton('Gathered Jersey Top - Charcoal')
    expect(await plpPage.getTextOfAllItemsOfTheCart()).toContain('Baggy Sweater - Olive')
    await plpPage.clickOnCartItemListRemoveButton('Baggy Sweater - Olive')
    await plpPage.validateShoppingCartIsEnptyMessageIsVisible()
    await plpPage.clickOnMinicartCloseLink()
    await plpPage.validateMiniCartIsClosed()
})

test(`474B8D76	Validate that the "User can view filters" checkbox is automatically selected once filter options are chosen.	S2,79A10437	Validate that the "User can view filters" badge appears on the Product Listing Page (PLP) header once filter options are selected.	S2`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Accessories');
    await plpPage.clickOnCategoryCard('All Accessories')
    await plpPage.clickOnShowFiltersButton()
    await plpPage.validateFiltersPanelIsOpened()
    await plpPage.selectFilterOptions('Indigo')
    expect(await plpPage.getFilterOptionStatus('filters-Indigo')).toBe(true)
    await plpPage.validateFilterBadgesAreDisplayedOnPLP('Indigo')
})

test(`D30A600B	Validate that users can view the correct products on applying Shopify filters.	S3`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Accessories');
    await plpPage.clickOnCategoryCard('All Accessories')
    await plpPage.clickOnShowFiltersButton()
    await plpPage.validateFiltersPanelIsOpened()
    await plpPage.selectFilterOptions('Indigo')
    await plpPage.selectFilterOptions('36 x 51 x 23 cm')
    await plpPage.ValidateProductCardWithTextToBeDisplayed('Mukayu Gym Bag - Indigo')
    await plpPage.validateFilterBadgesAreDisplayedOnPLP('36 x 51 x 23 cm')
    await plpPage.validateFilterBadgesAreDisplayedOnPLP('Indigo')
})

test(`C543EF96	Validate that users can view the selected size filter on the Product Detail Page (PDP).	S3`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Accessories');
    await plpPage.clickOnCategoryCard('All Accessories')
    await plpPage.clickOnShowFiltersButton()
    await plpPage.validateFiltersPanelIsOpened()
    await plpPage.selectFilterOptions('Indigo')
    await plpPage.selectFilterOptions('36 x 51 x 23 cm')
    await plpPage.ValidateProductCardWithTextToBeDisplayed('Mukayu Gym Bag - Indigo')
    await plpPage.clickOnProductCardWithText('Mukayu Gym Bag - Indigo')
    await plpPage.validatePdpProductTitleIsDisplayed('Mukayu Gym Bag - Indigo', '1')
    await plpPage.validateFiltersButtonIsDisplayedOnPDP('36 x 51 x 23 cm')
})

test(`E83C8056	Validate that the selected filters are cleared when the user clicks on the "Clear All" badge.	S3`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Accessories');
    await plpPage.clickOnCategoryCard('All Accessories')
    await plpPage.clickOnShowFiltersButton()
    await plpPage.validateFiltersPanelIsOpened()
    await plpPage.selectFilterOptions('Indigo')
    await plpPage.selectFilterOptions('36 x 51 x 23 cm')
    await plpPage.ValidateProductCardWithTextToBeDisplayed('Mukayu Gym Bag - Indigo')
    await plpPage.clickOnFiltersClearAllBadge()
    await plpPage.validateFilterBadgeNotToBeDisplayedOnPLP('Indigo')
    await plpPage.validateFilterBadgeNotToBeDisplayedOnPLP('36 x 51 x 23 cm')
})

test(`09BC0C1C	Validate that users can view the correct products when they select a combination of tagged filters.	S3`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Accessories');
    await plpPage.clickOnCategoryCard('All Accessories')
    await plpPage.clickOnShowFiltersButton()
    await plpPage.validateFiltersPanelIsOpened()
    await plpPage.selectFilterOptions('Nico Core')
    await plpPage.selectFilterOptions('Unisex')
    await plpPage.ValidateProductCardWithTextToBeDisplayed('Coat Hanger Bag')
})

test(`303262F5	Validate that users can clear individual filter badges on the Product Listing Page (PLP).	S3`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Accessories');
    await plpPage.clickOnCategoryCard('All Accessories')
    await plpPage.clickOnShowFiltersButton()
    await plpPage.validateFiltersPanelIsOpened()
    await plpPage.selectFilterOptions('Nico Core')
    await plpPage.selectFilterOptions('Unisex')
    await plpPage.ValidateProductCardWithTextToBeDisplayed('Coat Hanger Bag')
    await plpPage.clickOnFilterBadgesOnPlp('Unisex')
    await plpPage.validateFilterBadgeNotToBeDisplayedOnPLP('Unisex')
    await plpPage.clickOnFilterBadgesOnPlp('Nico Core')
    await plpPage.validateFilterBadgeNotToBeDisplayedOnPLP('Nico Core')
})

test(`A8D0E6AC	Validate that the user can view products according to the "Best Sellers" option	S2 @visual-test`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Accessories');
    await plpPage.clickOnCategoryCard('All Accessories')
    await plpPage.clickOnSortButton()
    await plpPage.clickOnSortOption('Best Sellers')
    expect(await plpPage.getProductCardTitleWithIndex('1')).toBe('Mukayu Gym Bag - Indigo')
    expect(await plpPage.getProductCardTitleWithIndex('2')).toBe('The Hanging Coat Bag')
    expect(await plpPage.getProductCardTitleWithIndex('3')).toBe('Coat Hanger Bag')
})

test(`E1814A4B	Validate that the user can view products according to the "Featured" options	S2`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Accessories');
    await plpPage.clickOnCategoryCard('All Accessories')
    await plpPage.clickOnSortButton()
    await plpPage.clickOnSortOption('Featured')
    expect(await plpPage.getProductCardTitleWithIndex('1')).toBe('Coat Hanger Bag')
    expect(await plpPage.getProductCardTitleWithIndex('2')).toBe('The Hanging Coat Bag')
    expect(await plpPage.getProductCardTitleWithIndex('3')).toBe('Mukayu Gym Bag - Indigo')
})

test(`A38E22FE	Validate that the user can view products according to the "New Arrivals" options	S2`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Accessories');
    await plpPage.clickOnCategoryCard('All Accessories')
    await plpPage.clickOnSortButton()
    await plpPage.clickOnSortOption('New Arrivals')
    expect(await plpPage.getProductCardTitleWithIndex('1')).toBe('Mukayu Gym Bag - Indigo')
    expect(await plpPage.getProductCardTitleWithIndex('2')).toBe('The Hanging Coat Bag')
    expect(await plpPage.getProductCardTitleWithIndex('3')).toBe('Coat Hanger Bag')
})

test(`55556FA7	Validate that the user can view products according to the "High to Low" options	S2 @visual-test`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Accessories');
    await plpPage.clickOnCategoryCard('All Accessories')
    await plpPage.clickOnSortButton()
    await plpPage.clickOnSortOption('Price: High-Low')
    expect(await plpPage.getProductCardTitleWithIndex('1')).toBe('Coat Hanger Bag')
    expect(await plpPage.getProductCardTitleWithIndex('2')).toBe('The Hanging Coat Bag')
    expect(await plpPage.getProductCardTitleWithIndex('3')).toBe('Mukayu Gym Bag - Indigo')
})

test(`B968024E	Validate that the user can view products according to the "Low to High" options	S2 @visual-test`, async ({ plpPage }) => {
    await plpPage.clickOnL1NavWithText('Accessories');
    await plpPage.clickOnCategoryCard('All Accessories')
    await plpPage.clickOnSortButton()
    await plpPage.clickOnSortOption('Price: Low-High')
    expect(await plpPage.getProductCardTitleWithIndex('1')).toBe('Mukayu Gym Bag - Indigo')
    expect(await plpPage.getProductCardTitleWithIndex('2')).toBe('The Hanging Coat Bag')
    expect(await plpPage.getProductCardTitleWithIndex('3')).toBe('Coat Hanger Bag')
})





