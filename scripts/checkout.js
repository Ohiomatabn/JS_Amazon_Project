import { renderOderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProduct, loadProductFetch} from '../data/products.js';
import loadCart from '../data/cart.js';
//import  "../data/cart-class.js";
//import '../data/backend-practice.js'

async function loadPage(){
  try{
    //throw 'error1';

    await loadProductFetch();

    const value = await new Promise((resolve, reject) =>{
      loadCart(() =>{
        //reject('error2');
        resolve();
      });
    });

  } catch(error){
    console.log('Unexpected error. Please try again later');
  }

  renderOderSummary();
  renderPaymentSummary();
}

loadPage();
/*
Promise.all([
  loadProductFetch(),
  new Promise((resolve) =>{
    loadCart(() =>{
      resolve();
    });
  })

]).then((values) =>{
  console.log(values);
  renderOderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) =>{
  loadProduct(() =>{
    resolve();
  });

}).then(() =>{
  return new Promise((resolve) =>{
    loadCart(() =>{
      resolve();
    });
  });

}).then(() =>{
  renderOderSummary();
  renderPaymentSummary();
});
*/


/*loadProduct(() =>{
  loadCart(() =>{
    renderOderSummary();
    renderPaymentSummary();
  });
});*/