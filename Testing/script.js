function HTMLelement(name, btnClass){
  this.name = name;
  this.btnClass = btnClass;
};

let button1 = new HTMLelement('Button 1', 'class');
let button2 = new HTMLelement('Button 2', 'class');
let button3 = new HTMLelement('Button 3', 'class');
let button4 = new HTMLelement('Button 4', 'class');
let button5 = new HTMLelement('Button 5', 'class');
let button6 = new HTMLelement('Button 6', 'class');
let button7 = new HTMLelement('Button 7 ', 'class');

const buttons = [button1, button2, button3, button4, button5, button6, button7];

let buttonElement = '';

buttons.forEach((button) =>{

  buttonElement += `<button class="btn">${button.name}</button>`
});

console.log(buttonElement);

document.querySelector('.buttons').innerHTML = buttonElement;