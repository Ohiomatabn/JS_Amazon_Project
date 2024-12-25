import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import dayjs from 'https://www.unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';


const today = dayjs();
let deliveryDate = today.add(7, 'days');
deliveryDate = deliveryDate.format('dddd, MMMM  D');

export function renderOderSummary(){
  let cartSummaryHTML ='';

  cart.forEach((cartItem) =>{
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId)

  const deliveryOptionId = cartItem.deliveryOptionId;

  const deliveryOption = getDeliveryOption(deliveryOptionId);

  cartSummaryHTML +=
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">Delivery date: ${deliveryDate}</div>

    <div class="cart-item-details-grid">
      <img
        class="product-image"
        src="${matchingProduct.image}"
      />

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">${matchingProduct.getPrice()}</div>
        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
          <span> Quantity: <span class="quantity-label">${(cartItem.quantity).toFixed(2)}</span> </span>
          <span data-product-id = ${matchingProduct.id} class="update-quantity-link link-primary js-update-quantity-link">
            Update
          </span>
          <input class="quantity-input hide js-qunatity-input" data-product-id = "${matchingProduct.id}">
          <span class="save-quantity-link link-primary js-save-link hide" data-product-id = "${matchingProduct.id}">Save</span>
          <span class="delete-quantity-link link-primary js-delete-link js-delete-link${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct,  cartItem)}
      </div>
    </div>
  </div>
  `
  });


  function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption) =>{
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM , D');

      const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html +=`
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id} data-delivery-option-id = "${deliveryOption.id}>
        <input
          type="radio"
          ${isChecked ?'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
        />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>
      `
    });
    return html;
  }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) =>{
      link.addEventListener('click', () =>{
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        )
        container.remove();

        renderPaymentSummary();
      });
    });  

    document.querySelectorAll('.js-update-quantity-link').forEach((update) =>{
      update.addEventListener('click', () =>{
        const productId = update.dataset.productId
        if (productId === products.id){
          document.querySelector('.js-save-link').classList += 'show';
        
          document.querySelector('.js-qunatity-input').setAttribute('class', 'show');
        }
      })
    });

    document.querySelectorAll('js-delivery-option').forEach((element) =>{
      element.addEventListener('click', () =>{
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOderSummary();

        renderPaymentSummary();
      });
    });
}