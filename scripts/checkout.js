import { renderOderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {cart} from "../data/cart.js";

function updateCheckoutItem(){
  let items = 0;

  cart.forEach((cartItem) =>{
    items += cartItem.quantity;
  });
  
  let itemsHTML = document.getElementsByClassName('js-return-to-home-link');
  itemsHTML.innerHTML = items;

  return items
}

document.querySelector('.js-return-to-home-link').innerHTML = updateCheckoutItem();

renderOderSummary();
renderPaymentSummary();