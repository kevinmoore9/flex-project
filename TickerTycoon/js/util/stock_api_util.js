export const getStock = (ticker) => {
  console.log(ticker);
  return (
    fetch(`http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22${ticker}%22)&format=json&env=http://datatables.org/alltables.env`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.text())
    .then((txt) => JSON.parse(txt).query.results.quote)
    .catch((error => console.log("error")))
  );
};

export const suggestStocks = (str) => {
  return (
    fetch(`http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${str}&region=1&lang=en&callback=YAHOO.Finance.SymbolSuggest.ssJSON`, { method: 'GET' })
    .then(res => res.text())
    .then((txt) => {
      const regex = /^YAHOO.Finance.SymbolSuggest.ssJSON\((.*)\);$/g;
      const match = regex.exec(txt);
      const tickerObj = JSON.parse(match[1]);
      const results = tickerObj.ResultSet.Result.filter(res => res.exchDisp === 'NASDAQ');
      return results;
    })
    .catch(error => console.error(error))
  );
};
