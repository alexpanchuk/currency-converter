import React, { Component } from "react";
import autoBind from "react-autobind";
import Form from "./Form";
import Result from "./Result";
import getRate from "../api/getRate";
import { Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../style/app.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "1",
      fromCurrency: "EUR",
      toCurrency: "RUB",
      rate: null
    };

    autoBind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // если пользователь сменил одну из валют в полях select, запросить новый курс
    if (
      prevState.inputValue === this.state.inputValue && // inputValue не менятлся
      prevState.fromCurrency !== this.state.toCurrency && // значение select не былы поменяны местами
      prevState.toCurrency !== this.state.fromCurrency && // --||--
      prevState.rate === this.state.rate
    ) {
      // курс не менялся
      getRate(this.state.fromCurrency, this.state.toCurrency).then(rate =>
        this.setState({ rate })
      );
    }
  }

  componentDidMount() {
    // запрос курса для дефолтных значений state.fromCurrency & state.toCurrency
    getRate(this.state.fromCurrency, this.state.toCurrency).then(rate =>
      this.setState({ rate })
    );
  }

  // обработчик onChange для input и select
  handleChange(e, { name, value }) {
    this.setState({
      [name]: value
    });
  }

  // обработчик кнопки Switch.
  flipCurrencies(e) {
    this.setState(prevState => {
      return {
        fromCurrency: prevState.toCurrency,
        toCurrency: prevState.fromCurrency,
        rate: prevState.rate ? 1 / prevState.rate : null
      };
    });
  }

  render() {
    return (
      <div className="app">
        <Header as="h2" icon textAlign="center">
          <Icon name="currency" color="grey" />
          <Header.Content>Currency Converter</Header.Content>
        </Header>
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

export default App;
