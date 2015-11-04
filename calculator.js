/* global math */
// Variables
var buttons = ['7','8','9','+','4','5','6','-','1','2','3','*','0','.','=','/'];
var lastNum = '=';

function renderContent() {
  // Create base elements for the page
  var container = createElement('div', '', {id: 'container'});
  var header = createElement('div', '', {id: 'header'});
  var nav = createElement('div', '', {id: 'nav'});
  var main = createElement('div', '', {id: 'main'});
  var aside = createElement('div', '', {id: 'aside'});
  var footer = createElement('div', '', {id: 'footer'});

  // Append main elements to container
  container.appendChild(header);
  container.appendChild(nav);
  container.appendChild(main);
  container.appendChild(aside);
  container.appendChild(footer);

  // Insert content
  header.appendChild(createElement('h1', 'Calculator', {className: 'title'}));
  main.appendChild(calculator());
  footer.appendChild(themeButton());
  footer.appendChild(about());

  // Add container to page
  document.body.appendChild(container);
  //document.getElementById('cal-box').focus();
}

function createElement(type, textContent, options) {
  var elem = document.createElement(type);
  elem.textContent = textContent;
  if(options){
    for(var option in options){
      elem[option] = options[option];
    }
  }
  return elem;
}

function calculator() {
  var calculatorWrap = createElement('div', '', {id: 'calculator'}); // Add calculator wrapper div
  calculatorWrap.appendChild(createElement('input', '', {className: 'cal-box', id: 'cal-box'})); // Add input box
  buttons.forEach(function(buttonContent){
    var button = createElement('button', buttonContent, {className: 'cal-button', id: buttonContent});
    button.addEventListener('click', handleButton, false);
    calculatorWrap.appendChild(button);
  }); // Add calculator buttons
  return calculatorWrap;
}

function themeButton() {
  var themeWrapper = createElement('div', '');
  var toggle = createElement('button', 'Toggle Theme', {className: 'toggle', id: 'toggle'});
  toggle.addEventListener('click', switchTheme, false);
  themeWrapper.appendChild(toggle);
  return themeWrapper;
}

function switchTheme() {
  theme = document.body.className;
  if(theme == 'theme-light') {
    document.body.className = 'theme-dark';
  } else {
    document.body.className = 'theme-light';
  }
}

function about(){
  var about = createElement('p', 'Created by ');
  about.appendChild(createElement('a', '@keawade', {href: 'https://github.com/keawade'}));
  return about;
}

// If Enter/Return is pressed, click '=' to evaluate
document.addEventListener('keypress', function(key){
  var keyString = String.fromCharCode(key.charCode);
  if(key.keyCode == 13){
    document.getElementById('=').click();
  } else if (/[0-9]|[/*-+=.]/.test(keyString)) {
    document.getElementById(keyString).click();
  } else if (key.keyCode == 8){
    var box = document.getElementById('cal-box')
    if(box === document.activeElement){
      //
    } else {
      if(box.value == ''){
        // Do nothing
      } else {
        box.value = box.value.substring(0, box.value.length - 1);
        lastNum = box.value.charAt(box.value.length-1);
        console.log(lastNum);
      }
    }
  }
}, false);

function handleButton(event) {
  var answer;
  // If clicked button is a number
  var box = document.getElementById('cal-box');
  var clickedElem = event.target.id;
  if(box === document.activeElement){
    //
  } else {
    if(!isNaN(clickedElem)) {
      // If last operation was math.eval then start new string
      if(lastNum == 'new') {
        box.value = '';
      }
      // Append new value
      box.value = box.value + clickedElem;
      lastNum = clickedElem;
    // If clicked button is not a number
    } else {
      // If clicked button is '='
      if(clickedElem == '=') {
        // Evaluate current string
        answer = math.eval(box.value)
        if(isNaN(answer)){
          //
        } else {
          box.value = answer;
        }
        // Note that the last operation was an eval
        lastNum = 'new';
      // If clicked button is an operation
      } else {
        // If the last button clicked was a number, allow the operator to be appended
        if(!isNaN(lastNum)) {
          box.value = box.value + clickedElem;
          lastNum = clickedElem;
        }
      }
    }
    // Remove keyboard focus on button
    this.blur();
  } if(clickedElem == '=') {
    // Evaluate current string
    answer = math.eval(box.value)
    if(isNaN(answer)){
      //
    } else {
      box.value = answer;
    }
    // Note that the last operation was an eval
    lastNum = 'new';
  }
}

renderContent();
