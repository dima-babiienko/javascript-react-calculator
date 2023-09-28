import React from "react";
import ReactDOM from "react-dom/client";
import './App.css';

const buttonCyphers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
];

const operationCyphers = [
    '-','+','/','*'
];

class App extends React.Component {
    state = {
        calcMemory: "",
        calcInput: "",
        answer: "",
        error: "",
    };

    handleAC = () => {
        this.setState({
            calcInput: "",
            calcMemory: "",
            answer: ""
        });
    }

    handleCE = () => {
        this.setState({
            calcInput: ""
        });
    }

    handleNumberClick = (value) => {
        const shouldShowError = (this.state.calcInput.length >= 8 || this.state.calcMemory.length >= 12);
        switch (true){
            case shouldShowError === true:
                this.setState({
                    calcInput: "Error",
                    calcMemory: "Error"
                });
            case(this.state.answer !== ""):
                this.setState({
                    answer: "",
                    calcInput: value,
                    calcMemory: value
                });
                return;
            case operationCyphers.includes(this.state.calcInput):
                this.setState({
                    calcInput: value,
                    calcMemory: this.state.calcMemory + value
                });
                break;
            case buttonCyphers.includes(value):
                this.setState({
                    calcInput: `${this.state.calcInput}${value}`,
                    calcMemory: `${this.state.calcMemory}${value}`
                });
        }
    }

    handleOperator = (operator) => {
        const calcm = this.state.calcInput[this.state.calcInput.length - 1];
        if(this.state.calcMemory.length == 1 && (operator == "+" || operator === "*" || operator === "/")){
            return;
        }
        if(calcm === "+" || calcm === "-" || calcm === "*" || calcm === "/"){
            return;
        }
        switch (true){
            case (this.state.calcMemory.charAt(0) == "="):
                this.state.calcMemory = this.state.calcMemory.substr(2);
                this.setState({
                    answer: "",
                    calcInput: operator,
                    calcMemory: this.state.calcMemory + operator
                })
                break;
            case operationCyphers.includes(operator):
                this.setState({
                    calcInput: operator,
                    calcMemory: this.state.calcMemory + operator
                });

        }
    }

    handleEqual = (equal) => {
        const answer = eval(this.state.calcMemory);
        this.state.answer = answer;
        this.setState({
            calcMemory: "= " + Math.round(answer),
            calcInput: ""
        })
    }

    renderButtons() {
        return buttonCyphers.map((item, index) => (
            <button key={index} onClick={() => this.handleNumberClick(item)}>{item}</button>
        ));
    }
    render(){
        return(
            <div className="calculator">
                <div className="calcpanel">
                    <span className="line" />
                    <span className="camera" />
                </div>
                <div className="_head">
                    <p>{this.state.calcMemory ? this.state.calcMemory : ''}</p>
                    <p>{this.state.calcInput ? this.state.calcInput : ''}</p>
                </div>
                <br />
                <div className="_buttons">
                    <div className="_operators">
                        <button onClick={() => this.handleOperator('+')}>+</button>
                        <button onClick={() => this.handleOperator('-')}>-</button>
                        <button onClick={() => this.handleOperator('*')}>×</button>
                        <button onClick={() => this.handleOperator('/')}>÷</button>
                    </div>
                    <div className="_ACCE">
                        <button onClick={() => this.handleAC()}>AC</button>
                        <button onClick={() => this.handleCE()}>CE</button>
                    </div>
                    <div className="_numbers">
                        {this.renderButtons()}
                    </div>
                    <br />
                    <div className="Equal">
                        <button onClick={() => this.handleEqual('=')}>=</button>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));