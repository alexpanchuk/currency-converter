import React from "react";
import { Input } from "semantic-ui-react";
import { Select } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import countryOptions from "../common/currencies";

const Form = props => {
  return (
    <div className="form">
      <Input
        placeholder="Input value..."
        type="number"
        name="inputValue"
        defaultValue={props.inputValue}
        onChange={props.handleChange}
        className=".input"
        fluid
      />
      <Select
        value={props.fromCurrency}
        name="fromCurrency"
        options={countryOptions.filter(
          currency => currency.value !== props.toCurrency
        )}
        onChange={props.handleChange}
      />{" "}
      <Button icon onClick={props.flipCurrencies} size="huge">
        Flip
      </Button>
      <Select
        value={props.toCurrency}
        name="toCurrency"
        options={countryOptions.filter(
          currency => currency.value !== props.fromCurrency
        )}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default Form;
