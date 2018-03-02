import React from "react";

const Result = props => {
  let value = parseFloat(props.inputValue),
    rate = props.rate;

  value = rate ? value * rate : "";
  value = Math.floor(value * 100) / 100;
  rate = Math.floor(rate * 1000) / 1000;

  if (isNaN(value)) {
    value = "";
  }

  return (
    <div>
      <div className="result-value">{value}</div>
      {value && (
        <div className="result-rate">
          1 {props.fromCurrency} equals {rate} {props.toCurrency}
        </div>
      )}
    </div>
  );
};

export default Result;
