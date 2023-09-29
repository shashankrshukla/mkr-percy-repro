import { PdpPage } from '../test/pageobjects/showside/pdp.page';
import { PlpPage } from '../test/pageobjects/showside/plp.page';
import { test as baseTest } from '@playwright/test';
import { ClpPage } from '../test/pageobjects/showside/clp.page';
import { QvPage } from '../test/pageobjects/showside/qv.page';
import { CommonFunction } from '../test/../utils/commonFunction';


const test = baseTest.extend<{
    clpPage: ClpPage;
    plpPage: PlpPage;
    pdpPage: PdpPage;
    qvPage: QvPage;
    commonFunction: CommonFunction;
}>({

    clpPage: async ({ page }, use) => {
        await use(new ClpPage(page));
    },
    plpPage: async ({ page }, use) => {
        await use(new PlpPage(page));
    },
    pdpPage: async ({ page }, use) => {
        await use(new PdpPage(page));
    },
    qvPage: async ({ page }, use) => {
        await use(new QvPage(page));
    },
    commonFunction: async ({ page }, use) => {
        await use(new CommonFunction(page));
    }
})

export default test;