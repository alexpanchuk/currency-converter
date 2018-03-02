function getRate(fromCurrency, toCurrency) {
  // пример запроса: http://api.fixer.io/latest?base=USD&symbols=RUB
  // формирование строки запроса
  const baseUrl = "http://api.fixer.io/latest",
    queryStringData = {
      base: fromCurrency,
      symbols: toCurrency
    },
    queryString = Object.keys(queryStringData)
      .map(key => key + "=" + encodeURIComponent(queryStringData[key]))
      .join("&"),
    url = baseUrl + "?" + queryString;

  // запрос курса для 2х валют
  return fetch(url)
    .then(response => response.json())
    .then(responseData => {
      return responseData.rates[toCurrency];
    });
}

export default getRate;
