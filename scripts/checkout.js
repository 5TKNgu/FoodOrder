
import { updateTotal, renderPaymentBox } from "./cart";
import { updateBadgeCart } from "./main";


window.onload = function() {
    updateTotal();
    renderPaymentBox();
    updateBadgeCart();
}
