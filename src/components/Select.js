import React from "react";
import currencies from "../common/currencies";

const Select = props => {
  const options = currencies.currency
    .filter(currency => currency.key !== props.disabledValue)
    .map(currency => (
      <option key={currency.key} value={currency.key}>
        {currency.key}
      </option>
    ));

  return (
    <select name={props.name} value={props.value} onChange={props.handleChange}>
      {options}
    </select>
  );
};

export default Select;
