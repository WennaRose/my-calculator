import React from 'react';

const calculatorDetails = {
    display: '0',
    displayAll: ' ',
    firstNum: null,
    operator: null,
    isSecondNum: false, 
    isInputEqual: false
  }
  const operators = {
    '+': function(a,b){return a+b},
    '-': function(a,b){return a-b},
    '*': function(a,b){return a*b},
    '/': function(a,b){return a/b},
    '=': function(a,b){return b}
  } 
  const Btns = [
    {
      id: "clear",
      value: "clear",
      display: "AC",
      dataAttribute: "data-clear-all" 
    },
    {
      id: "divide",
      value: "/",
      display: "/",
      dataAttribute: "data-operator" 
    },
     {
      id: "multiply",
      value: "*",
      display: "x",
      dataAttribute: "data-operator" 
    },
     {
      id: "seven",
      value: "7",
      display: "7",
      dataAttribute: "data-number" 
    },
    {
      id: "eight",
      value: "8",
      display: "8",
      dataAttribute: "data-number" 
    },
    {
      id: "nine",
      value: "9",
      display: "9",
      dataAttribute: "data-number" 
    },
    {
      id: "subtract",
      value: "-",
      display: "-",
      dataAttribute: "data-operator" 
    },
    {
      id: "four",
      value: "4",
      display: "4",
      dataAttribute: "data-number" 
    },
    {
      id: "five",
      value: "5",
      display: "5",
      dataAttribute: "data-number" 
    },
    {
      id: "six",
      value: "6",
      display: "6",
      dataAttribute: "data-number" 
    },
    {
      id: "add",
      value: "+",
      display: "+",
      dataAttribute: "data-operator" 
    },
    {
      id: "one",
      value: "1",
      display: "1",
      dataAttribute: "data-number" 
    },
    {
      id: "two",  
      value: "2",
      display: "2",
      dataAttribute: "data-number" 
    },
    {
      id: "three",
      value: "3",
      display: "3",
      dataAttribute: "data-number" 
    },
    {
      id: "equals",
      value: "=",
      display: "=",
      dataAttribute: "data-equals" 
    },
    {
      id: "zero",
      value: "0",
      display: "0",
      dataAttribute: "data-number" 
    },
    {
      id: "decimal",
      value: ".",
      display: ".",
      dataAttribute: "data-number" 
    }
  ];
  class CalculatorButtons extends React.Component{
    constructor(props){
      super(props);
      this.calculate = this.calculate.bind(this)
      this.resetCalculator = this.resetCalculator.bind(this)
      this.handleInput = this.handleInput.bind(this)
      this.handleDecimal = this.handleDecimal.bind(this)
      this.handleOperator = this.handleOperator.bind(this)
      this.handleDisplayChange = this.handleDisplayChange.bind(this)
      this.handleClick = this.handleClick.bind(this)
    }
    
    calculate(key, a, b){
      let result = operators[key](a, b);
      return result;
    }
    
    handleInput(num){
      const { display, isSecondNum, displayAll } = calculatorDetails
      // if(calculatorDetails.isInputEqual && num != '+' && num != '-' && num != '/' && num !='*'){
      //   calculatorDetails.displayAll = isInputEqual === true ? num : displayAll + num
      // }
      if(calculatorDetails.isInputEqual && calculatorDetails.operator !== '+' && calculatorDetails.operator !== '-' && calculatorDetails.operator !== '/' && calculatorDetails.operator !== '*'){
        calculatorDetails.firstNum = null;
        calculatorDetails.isInputEqual = false;
        calculatorDetails.displayAll = ' ';
      }
      if(isSecondNum === true){
        calculatorDetails.display = num;
        calculatorDetails.displayAll += num;
        calculatorDetails.isSecondNum = false;
      }
      else{
        calculatorDetails.display = display === '0' ? num : display + num 
        calculatorDetails.displayAll = displayAll + num
      }
    }
    
    handleDecimal(dot){
      if(calculatorDetails.isSecondNum === true){
        calculatorDetails.display = '0.';
        calculatorDetails.isSecondNum = false;
        return;
      }
      if(!calculatorDetails.display.includes(dot)){
        calculatorDetails.display += dot
        calculatorDetails.displayAll = calculatorDetails.displayAll += dot
        // console.log(calculatorDetails);
      }
    }
    
    handleOperator(newOperator){
      const {firstNum, display, operator} = calculatorDetails;
      const inputVal = parseFloat(display);
      if(newOperator !== '='){
        // calculatorDetails.display = calculatorDetails.display += newOperator;
        calculatorDetails.displayAll = calculatorDetails.displayAll += newOperator; 
      }
      if(operator && calculatorDetails.isSecondNum){
        calculatorDetails.operator = newOperator;
        


        if(newOperator === '='){
          calculatorDetails.displayAll = firstNum;
          calculatorDetails.display = firstNum;
          calculatorDetails.isInputEqual = true;
          
          return
        }

        return
      }
      
      
      if(firstNum == null && !isNaN(inputVal)){
        calculatorDetails.firstNum = inputVal;
        console.log("first num is null");
        console.log(calculatorDetails);
      }else if(operator){
        
        const result = this.calculate(operator, firstNum, inputVal)
        console.log("the result is: " + result)
        calculatorDetails.display = `${parseFloat(result.toFixed(7))}`;
        // calculatorDetails.displayAll = calculatorDetails.displayAll += newOperator;
        calculatorDetails.firstNum = result;
        console.log("null");
        console.log(calculatorDetails);
        if(newOperator === '='){
          calculatorDetails.displayAll = calculatorDetails.displayAll += newOperator;
          calculatorDetails.displayAll = calculatorDetails.displayAll += `${parseFloat(result.toFixed(7))}`;
          calculatorDetails.display = `${parseFloat(result.toFixed(7))}`;
          calculatorDetails.isInputEqual = true;
          console.log("is equal");
          console.log(calculatorDetails);
        }
      }
      calculatorDetails.isSecondNum = true;
      (newOperator !== '=') ? calculatorDetails.operator = newOperator : calculatorDetails.operator = null;
      console.log("heyaah");
      console.log(calculatorDetails);
    }
    
    handleDisplayChange(){
      const displayVal = document.querySelector('#display');
      displayVal.value = calculatorDetails.display;
      const displayAllVal = document.querySelector('#calculation-box');
      displayAllVal.innerHTML = calculatorDetails.displayAll;
      
    }
    
    resetCalculator(){
      calculatorDetails.display = '0'
      calculatorDetails.displayAll = ' '
      calculatorDetails.firstNum = null
      calculatorDetails.isSecondNum = false
      calculatorDetails.operator = null
      calculatorDetails.isInputEqual = false
    }
    
    handleClick(e){
      const { target } = e;
      const { value } = target;
      
      switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
          this.handleOperator(value);
          break;
        case '.':
          this.handleDecimal(value);
          break;
        case 'clear':
          this.resetCalculator();
          break;
        default:
          if(Number.isInteger(parseFloat(value))){
            this.handleInput(value);
            this.handleDisplayChange();
          }
      }
      this.handleDisplayChange();
    }
    
    render(){
      
      return(
      <div class={(this.props.id === "clear" || this.props.id === "zero") ? "col-6" : "col-3"}> <button class="buttons" id={this.props.id} onClick={(e)=>this.handleClick(e,'value')} value={this.props.value}>{this.props.display}</button></div>
      );
    }
  }
  
  class Calculator extends React.Component{
    render(){
      let myCalc = Btns.map((obj, i, calcArr) => {
        return(
          <CalculatorButtons 
           display = {calcArr[i].display}
           id= {calcArr[i].id}
           value = {calcArr[i].value}
           />
        );
      });
      return(
        <div class="calculator">
        <div class="container">
          <div class="container" id="topBox">
          <div  id="outerDiv">
              <div id="innerDiv"><p id="calculation-box"></p></div>
          </div>  
          <div class="row">
              <div class="col"><input type="text" value="" disabled id="display" placeholder="0"/></div>
          </div>
          </div>
            <div class="row" id="buttonsDiv">
              {myCalc}
            </div>
          </div>
         </div>
      );
    }
  }
  export default Calculator;