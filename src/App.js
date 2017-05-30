/*
TO DO:
- componentDidMount: AJAX request, save rate
- componentDidUpdate: if change Select (prevState.input === this.state.input) => AJAX
*/
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Utils from './Utils';
import './style/app.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      inputValue: '',
      fromCurrency: 'EUR',
      toCurrency: 'RUB',
      rate: 63.0232427,
    }

    autoBind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  switchCurrencies(e) {
    e.preventDefault()

    this.setState((prevState) => {
      return {
        fromCurrency: prevState.toCurrency,
        toCurrency: prevState.fromCurrency,
        rate: prevState.rate ? 1 / prevState.rate : null,
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Form
          handleChange={this.handleChange}
          switchCurrencies={this.switchCurrencies}
          {...this.state}
        />
        <Result {...this.state} />
      </div>
    );
  }

}

const Form = (props) => (
  <form action="" onChange={props.handleChange}>
    <input 
      type="text" 
      name="inputValue" 
      defaultValue={props.inputValue} 
    /><br/>

    <Select 
      name="fromCurrency" 
      value={props.fromCurrency} 
      disabledValue={props.toCurrency}
    />

    <button onClick={props.switchCurrencies}>Switch</button>

    <Select 
      name="toCurrency" 
      value={props.toCurrency} 
      disabledValue={props.fromCurrency}
    /><br/>
  </form>
);

const Select = (props) => {
  const options = Utils.currency
    .filter(currency => currency.key !== props.disabledValue)
    .map(currency => <option key={currency.key} value={currency.key}>{currency.key}</option>)

  return (
    <select name={props.name} value={props.value}>
      {options}
    </select>
  );
}

const Result = (props) => {
  let value = parseFloat(props.inputValue),
      rate = props.rate
  
  value = rate ? value * rate : ''
  value = Math.floor(value * 100) / 100
  rate = Math.floor(rate * 1000) / 1000

  if (isNaN(value)) {
    value = ''
  }

  return (
    <div>
      <div>{value}</div>
      {value && <div>1 {props.fromCurrency} equals {rate} {props.toCurrency}</div>}
    </div>
  );
}

export default App;
