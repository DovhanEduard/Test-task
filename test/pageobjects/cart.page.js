import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CartPage extends Page {
    
    get inventoryItemName () {
        return $('[class="inventory_item_name"]');
    }
    get inventoryItemPrice() {
        return $('[class="inventory_item_price"]');
    }
    get thankForOrderMessage() {
        return $('[class="complete-header"]');
    }
    
    get checkoutForm() {
        return $('[class="checkout_info"]');
    }

    get  inputFirstName() {
        return $('#first-name');
    }

    get  inputLastName() {
        return $('#last-name');
    }

    get  inputPostalCode() {
        return $('#postal-code');
    }

    get  btnContinue() {
        return $('#continue');
    }

    get btnFinish() {
        return $('#finish');
    }

    get btnBackToProduct() {
        return $('#back-to-products');
    }

    get inventoryItem() {
        return $('[class="inventory_item_name"]');
    }
    get errorMessage() {
        return $('//*[text()="Cart is empty"]');
    }
    

    open () {
        return super.open('https://www.saucedemo.com/cart.html');
    }
}

export default new CartPage();
