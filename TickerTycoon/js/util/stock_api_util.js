export const getStock = (ticker) => {
  return (
    fetch(`http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22${ticker}%22)&format=json&env=http://datatables.org/alltables.env`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.text()).then((txt) => JSON.parse(txt))
  );
};
