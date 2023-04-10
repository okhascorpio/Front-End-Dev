import React from "react";
import "./styles.css";

const endsWithOp = /[-+×÷]$/;
const endsWithOpAndMinus = /[-+×÷/]-$/;
const initialState = {
  currentVal: "0",
  prevVal: "0",
  formula: "",
  evaluated: false,
};
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleDecimalClick = this.handleDecimalClick.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);
    this.handleAllClearClick = this.handleAllClearClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
  }

  handleNumberClick(e) {
    const { currentVal, formula, evaluated } = this.state;
    const input = e.target.value;
    var tempFormula = "";
    var tempCurrentVal = "";
    evaluated ? (tempFormula = input) : (tempFormula = formula + input);
    evaluated
      ? (tempCurrentVal = input)
      : currentVal === "0" || currentVal === "-"
      ? (tempCurrentVal = input)
      : (tempCurrentVal = currentVal + input);

    this.setState({
      formula: tempFormula,
      currentVal: tempCurrentVal,
      evaluated: false,
    });
  }

  handleOperatorClick(e) {
    const { formula, prevVal, evaluated } = this.state;
    const operator = e.target.value;
    var val = "";
    if (evaluated) {
      val = prevVal + operator;
    } else if ((formula === "" || formula === "-") && operator === "-") {
      val = operator;
    } else if (formula === "" && operator !== "-") {
      val = "";
    } else if (endsWithOpAndMinus.test(formula) && endsWithOp.test(operator)) {
      val = formula.slice(0, -2) + operator;
    } else if (endsWithOp.test(formula) && operator !== "-") {
      val = formula.slice(0, -1) + operator;
    } else {
      val = formula + operator;
    }

    this.setState({
      formula: val,
      currentVal: operator,
      evaluated: false,
    });
  }

  handleDecimalClick() {
    const { currentVal, formula, evaluated } = this.state;
    if (evaluated) {
      this.setState({
        currentVal: "0.",
        formula: "0.",
        evaluated: false,
      });
    } else if (!currentVal.includes(".")) {
      this.setState({
        currentVal: currentVal + ".",
        formula: formula + ".",
      });
    }
  }

  handleEqualClick(e) {
    const { formula } = this.state;
    const operator = e.target.value;
    if (formula) {
      var tempFormula = endsWithOpAndMinus.test(formula)
        ? formula.slice(0, -2)
        : endsWithOp.test(formula)
        ? formula.slice(0, -1)
        : formula;

      tempFormula = tempFormula
        .replace(/--/g, "- -")
        .replace(/×/g, "*")
        .replace(/÷/g, "/");
      var answer = Number(eval(tempFormula).toFixed(6));
      
      this.setState({
        currentVal: answer.toString(),
        prevVal: answer.toString(),
        formula: formula + operator,
        evaluated: true,
      });
    }
  }

  handleAllClearClick() {
    this.setState(initialState);
  }

  handleClearClick() {
    const { formula, evaluated } = this.state;
    if(!evaluated){
    var temp = "";
    formula !== "" ? (temp = formula.slice(0, -1)) : (temp = "");
    this.setState({
      formula: temp,
      currentVal: temp !=='' ? temp : '0',
    });
  }
  }

  render() {
    const { currentVal, formula } = this.state;

    return (
      <div className="calculator">
        
        <div
          className="display d-flex justify-content-end align-items-center"
          id="formula-screen"
        >
          {formula}
        </div>
        <div
          className="display d-flex justify-content-end align-items-center"
          id="display"
        >
          {currentVal}
        </div>
        <div className="d-flex">
          <button
            className="button allclear"
            id="clear"
            onClick={this.handleAllClearClick}
          >
            AC
          </button>
          <button
            className="button clear"
            id="clear"
            onClick={this.handleClearClick}
          >
            C
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div id="number-pad">
            <div className="button-row">
              <button
                className="button"
                id="seven"
                value="7"
                onClick={this.handleNumberClick}
              >
                7
              </button>
              <button
                className="button"
                id="eight"
                value="8"
                onClick={this.handleNumberClick}
              >
                8
              </button>
              <button
                className="button"
                id="nine"
                value="9"
                onClick={this.handleNumberClick}
              >
                9
              </button>
            </div>
            <div className="button-row">
              <button
                className="button"
                id="four"
                value="4"
                onClick={this.handleNumberClick}
              >
                4
              </button>
              <button
                className="button"
                id="five"
                value="5"
                onClick={this.handleNumberClick}
              >
                5
              </button>
              <button
                className="button"
                id="six"
                value="6"
                onClick={this.handleNumberClick}
              >
                6
              </button>
            </div>
            <div className="button-row">
              <button
                className="button"
                id="one"
                value="1"
                onClick={this.handleNumberClick}
              >
                1
              </button>
              <button
                className="button"
                id="two"
                value="2"
                onClick={this.handleNumberClick}
              >
                2
              </button>
              <button
                className="button"
                id="three"
                value="3"
                onClick={this.handleNumberClick}
              >
                3
              </button>
            </div>
            <div className="button-row">
              <button
                className="button"
                id="zero"
                value="0"
                onClick={this.handleNumberClick}
              >
                0
              </button>
              <button
                className="button"
                id="decimal"
                value="."
                onClick={this.handleDecimalClick}
              >
                .
              </button>

              <button
                className="button"
                id="equals"
                value="="
                onClick={this.handleEqualClick}
              >
                =
              </button>
            </div>
          </div>
          <div id="op-pad" className="d-flex flex-column">
            <button
              className="button operator"
              id="add"
              value="+"
              onClick={this.handleOperatorClick}
            >
              +
            </button>
            <button
              className="button operator"
              id="subtract"
              value="-"
              onClick={this.handleOperatorClick}
            >
              −
            </button>
            <button
              className="button operator"
              id="multiply"
              value="×"
              onClick={this.handleOperatorClick}
            >
              ×
            </button>
            <button
              className="button operator"
              id="divide"
              value="÷"
              onClick={this.handleOperatorClick}
            >
              ÷
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
/*
const root = document.getElementById("root");
const rootElement = ReactDOM.createRoot(root);
rootElement.render(<Calculator />);
*/
