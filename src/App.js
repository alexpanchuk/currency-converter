/*
TODO
- обработка ошибок fetch
*/
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Currencies from './Currencies';
import './style/app.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      inputValue: '',
      fromCurrency: 'EUR',
      toCurrency: 'RUB',
      rate: null
    }

    autoBind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    // если пользователь сменил одну из валют в полях select, запросить новый курс
    if (prevState.inputValue === this.state.inputValue // inputValue не менятлся
      && prevState.fromCurrency !== this.state.toCurrency // значение select не былы поменяны местами
      && prevState.toCurrency !== this.state.fromCurrency // --||--
      && prevState.rate === this.state.rate) { // курс не менялся
      getRate(this.state.fromCurrency, this.state.toCurrency)
      .then(rate => {
        this.setState({
          rate: rate
        })
      })
    }
  }

  componentDidMount() {
    // запрос курса для дефолтных значений state.fromCurrency & state.toCurrency
    getRate(this.state.fromCurrency, this.state.toCurrency)
      .then(rate => {
        this.setState({
          rate: rate
        })
      })
  }

  // обработчик onChange для input и select
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // обработчик кнопки Switch.
  flipCurrencies(e) {
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
          flipCurrencies={this.flipCurrencies}
          {...this.state}
        />
        <Result {...this.state} />
      </div>
    );
  }

}

const Form = (props) => (
  <form action="">
    <input 
      type="number" 
      name="inputValue" 
      defaultValue={props.inputValue} 
      onChange={props.handleChange}
    /><br/>

    <Select 
      name="fromCurrency"
      value={props.fromCurrency} 
      disabledValue={props.toCurrency}
      handleChange={props.handleChange}
    />

    <button type="button" onClick={props.flipCurrencies}>Switch</button>

    <Select 
      name="toCurrency" 
      value={props.toCurrency} 
      disabledValue={props.fromCurrency}
      handleChange={props.handleChange}
    /><br/>
  </form>
);

const Select = (props) => {
  const options = Currencies.currency
    .filter(currency => currency.key !== props.disabledValue)
    .map(currency => <option key={currency.key} value={currency.key}>{currency.key}</option>)

  return (
    <select name={props.name} value={props.value} onChange={props.handleChange}>
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

function getRate(fromCurrency, toCurrency) {
  // пример запроса: http://api.fixer.io/latest?base=USD&symbols=RUB
  // формирование строки запроса
  const baseUrl = 'http://api.fixer.io/latest',
        queryStringData = {
          base : fromCurrency,
          symbols : toCurrency
        },
        queryString = Object.keys(queryStringData)
          .map(key => key + '=' + encodeURIComponent(queryStringData[key]))
          .join('&'),
        url = baseUrl + "?" + queryString;

  // запрос курса для 2х валют
  return fetch(url)
    .then(response => response.json())
    .then(responseData => {
      return responseData.rates[toCurrency]
    })
}

export default App;
