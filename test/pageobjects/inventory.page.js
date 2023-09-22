import { $ } from '@wdio/globals'
import Page from './page.js';

class InventoryPage extends Page {
    
    get btnBurgerMenu () {
        return $('#react-burger-menu-btn');
    }
    get burgerMenu () {
        return $('[class="bm-item-list"]');
    }
    
    get linkLogoutSidebar () {
        return $('#logout_sidebar_link');
    }
    
    get btnAddCart () {
        return $('#add-to-cart-sauce-labs-backpack');
    }

    get linkShoppingCart () {
        return $('[class="shopping_cart_link"]');
    }

    get shoppingCartBadge () {
        return $('[class="shopping_cart_badge"]');
    }
    

    get btnProductSort() {
        return $('[class="product_sort_container"]');
    }

    get btnSortAZ () {
        return $('[value="az"]');
    }

    get btnSortZA () {
        return $('[value="za"]');
    }

    get btnLHSort () {
        return $('[value="lohi"]');
    }

    get btnSortHL () {
        return $('[value="hilo"]');
    }

    get  linkTwitter() {
        return $('[href="https://twitter.com/saucelabs"]');
    }
    
    get  linkFacebook() {
        return $('[href="https://www.facebook.com/saucelabs"]');
    }

    get  linkLinkedin() {
        return $('[href="https://www.linkedin.com/company/sauce-labs/"]');
    }

    get  btnCheckout() {
        return $('#checkout');
    }
    
    

    get inventorySidebarLink() {
        return $('[id="inventory_sidebar_link"]');
    }
    get aboutSidebarLink() {
        return $('[id="about_sidebar_link"]');
    }
    get resetSidebarLink() {
        return $('[id="reset_sidebar_link"]');
    }
    get invertoryList() {
        return $('[class="inventory_list"]');
    }
    get invertoryCart() {
        return $('[class="inventory_list"] :nth-child(1)');
    }
    get productSauceLabsBackpack() {
        return $('//*[text()="Sauce Labs Backpack"]');
    }
    
    get  productSauceLabsBackpackPrice() {
        return $('[class="inventory_item_price"]');
    }
    get urlInventoryPage() {
        return 'https://www.saucedemo.com/inventory.html';
    }

    
    

    async logout () {
        await this.btnBurgerMenu.click();
        await browser.pause(100);
        await this.linkLogoutSidebar.click();
    }
    open () {
        return super.open('https://www.saucedemo.com/inventory.html');
    }

    
}

export default new InventoryPage();
