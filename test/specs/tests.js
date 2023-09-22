import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import SecurePage from '../pageobjects/secure.page.js'
import CartPage from '../pageobjects/cart.page.js'

describe('saucedemo login page', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.inputUsername.setValue('standard_user');
        await expect(LoginPage.inputUsername).toHaveValue('standard_user');
        
        await LoginPage.inputPassword.setValue('secret_sauce');
        await expect(LoginPage.inputPassword).toHaveValue('secret_sauce');
        await expect(LoginPage.inputPassword).toHaveAttribute('type', 'password');
        
        await LoginPage.btnSubmit.click();

        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        await expect(InventoryPage.inventoryItem).toBeDisplayed();
    })
})

it('should login with valid login and invalid password', async () => {
    await browser.reloadSession()
    await LoginPage.open();

    await LoginPage.inputUsername.setValue('standard_user');
    await expect(LoginPage.inputUsername).toHaveValue('standard_user');

    await LoginPage.inputPassword.setValue('randomvalue');
    await expect(LoginPage.inputPassword).toHaveValue('randomvalue');
    await expect(LoginPage.inputPassword).toHaveAttribute('type', 'password');
    
    await LoginPage.btnSubmit.click();

    await expect(LoginPage.inputUsername).toHaveAttribute('class', 'input_error form_input error');
    await expect(LoginPage.inputPassword).toHaveAttribute('class', 'input_error form_input error');
    await expect(SecurePage.errorMessage).toBeDisplayed();
})       

it('should login with invalid login and valid password', async () => {
    await browser.reloadSession()
    await LoginPage.open();

    await LoginPage.inputUsername.setValue('randomvalue');
    await expect(LoginPage.inputUsername).toHaveValue('randomvalue');

    await LoginPage.inputPassword.setValue('secret_sauce');
    await expect(LoginPage.inputPassword).toHaveValue('secret_sauce');
    await expect(LoginPage.inputPassword).toHaveAttribute('type', 'password');

    await LoginPage.btnSubmit.click();

    await expect(LoginPage.inputUsername).toHaveAttribute('class', 'input_error form_input error');
    await expect(LoginPage.inputPassword).toHaveAttribute('class', 'input_error form_input error');
    await expect(SecurePage.errorMessage).toBeDisplayed();
})

describe('saucedemo inventory page', () => {
    it('should click on "Burger" button and logout', async () => {
        await browser.reloadSession()
        await LoginPage.open();

        await LoginPage.login('standard_user','secret_sauce');

        await InventoryPage.btnBurgerMenu.click();

        await browser.waitUntil(()=>{
            return InventoryPage.burgerMenu.isDisplayed();
        }, 1000,'menu is not displayed');

        await expect(InventoryPage.linkLogoutSidebar).toBeDisplayed();
        await expect(InventoryPage.inventorySidebarLink).toBeDisplayed();
        await expect(InventoryPage.aboutSidebarLink).toBeDisplayed();
        await expect(InventoryPage.resetSidebarLink).toBeDisplayed();

        await InventoryPage.linkLogoutSidebar.click();

        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
        await browser.pause(100);
        await expect(LoginPage.inputUsername).toHaveValue('');
        await browser.pause(100);
        await expect(LoginPage.inputPassword).toHaveValue('');
    })  
}) 

it('should save the card after logout', async () => {
    await browser.reloadSession()
    await InventoryPage.open();
    await LoginPage.login('standard_user','secret_sauce');
    await InventoryPage.btnAddCart.click();

    const choosenItem = await InventoryPage.productSauceLabsBackpack.getText();

    await expect(InventoryPage.linkShoppingCart).toHaveText('1');
    await expect(InventoryPage.shoppingCartBadge).toBeDisplayed();
    await InventoryPage.btnBurgerMenu.click();
    await browser.pause(100);

    await expect(InventoryPage.linkLogoutSidebar).toBeDisplayed();
    await expect(InventoryPage.inventorySidebarLink).toBeDisplayed();
    await expect(InventoryPage.aboutSidebarLink).toBeDisplayed();
    await expect(InventoryPage.resetSidebarLink).toBeDisplayed();

    await InventoryPage.linkLogoutSidebar.click();

    await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    await browser.pause(100);
    await expect(LoginPage.inputUsername).toHaveValue('');
    await browser.pause(100);
    await expect(LoginPage.inputPassword).toHaveValue('');

    await LoginPage.login('standard_user','secret_sauce');

    await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    await expect(InventoryPage.invertoryList).toBeDisplayed();
    await expect(InventoryPage.invertoryCart).toBeDisplayed();
    
    await InventoryPage.linkShoppingCart.click();

    await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
    await expect(CartPage.inventoryItemName).toHaveText(choosenItem);
    
})  

it('should verifi all sorting', async () => {
    await browser.reloadSession()
    await InventoryPage.open();

    await LoginPage.login('standard_user','secret_sauce');

    await InventoryPage.btnProductSort.click();
    await InventoryPage.btnSortAZ.click();
    await expect(InventoryPage.btnSortAZ).toBeSelected();
    
    await InventoryPage.btnProductSort.click();
    await InventoryPage.btnSortZA.click();
    await expect(InventoryPage.btnSortZA).toBeSelected();

    await InventoryPage.btnProductSort.click();
    await InventoryPage.btnLHSort.click();
    await expect(InventoryPage.btnLHSort).toBeSelected();

    await InventoryPage.btnProductSort.click();
    await InventoryPage.btnSortHL.click();
    await expect(InventoryPage.btnSortHL).toBeSelected();
})

it('should open 3 footer links', async () => {
    await browser.reloadSession()
    await InventoryPage.open();
    await LoginPage.login('standard_user','secret_sauce');

    await InventoryPage.linkTwitter.scrollIntoView();

    const urlLinkTwitter = await InventoryPage.linkTwitter.getAttribute('href');
    await InventoryPage.linkTwitter.click();
    await browser.switchWindow(urlLinkTwitter);
    await expect(browser).toHaveUrl(urlLinkTwitter);
    await browser.switchWindow(InventoryPage.urlInventoryPage);
    
    const urlLinkFacebook = await InventoryPage.linkFacebook.getAttribute('href');
    await InventoryPage.linkFacebook.click();
    await browser.switchWindow(urlLinkFacebook);
    await expect(browser).toHaveUrl(urlLinkFacebook);
    await browser.switchWindow(InventoryPage.urlInventoryPage);

    const urlLinkLinkedin = await InventoryPage.linkLinkedin.getAttribute('href');
    await InventoryPage.linkLinkedin.click();
    await browser.switchWindow(urlLinkLinkedin);
    await expect(browser).toHaveUrl(urlLinkLinkedin);
}) 

it('should check valid checkout', async () => {
    await browser.reloadSession()
    await InventoryPage.open();
    await LoginPage.login('standard_user','secret_sauce');

    await InventoryPage.btnAddCart.click();
    await expect(InventoryPage.linkShoppingCart).toHaveText('1');
    await expect(InventoryPage.shoppingCartBadge).toBeDisplayed();

    const choosenItem = await InventoryPage.productSauceLabsBackpack.getText();
    const choosenItemPrice = await InventoryPage.productSauceLabsBackpackPrice.getText();
    await InventoryPage.linkShoppingCart.click();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
    await expect(CartPage.inventoryItemName).toHaveText(choosenItem);

    await InventoryPage.btnCheckout.click();
    await expect(CartPage.checkoutForm).toBeDisplayed();


    await CartPage.inputFirstName.addValue('FirstName');
    await expect(CartPage.inputFirstName).toHaveValue('FirstName');
    await CartPage.inputLastName.addValue('LastName');
    await expect(CartPage.inputLastName).toHaveValue('LastName');
    await CartPage.inputPostalCode.addValue('PostalCode');
    await expect(CartPage.inputPostalCode).toHaveValue('PostalCode');

    await CartPage.btnContinue.click();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
    await expect(CartPage.inventoryItem).toHaveText(choosenItem);
    await expect(CartPage.inventoryItemPrice).toHaveText(choosenItemPrice);

    await CartPage.btnFinish.click();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
    await expect(CartPage.thankForOrderMessage).toBeDisplayed();
    
    await CartPage.btnBackToProduct.click();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    await expect(InventoryPage.invertoryCart).toBeDisplayed();
    await expect(InventoryPage.linkShoppingCart).toHaveText('');
})

it('should open 3 footer links', async () => {
    await browser.reloadSession()
    await InventoryPage.open();
    await LoginPage.login('standard_user','secret_sauce');

    await expect(InventoryPage.linkShoppingCart).toHaveText('');
    await InventoryPage.linkShoppingCart.click();

    await InventoryPage.btnCheckout.click();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
    await expect(CartPage.errorMessage).toBeDisplayed();
})