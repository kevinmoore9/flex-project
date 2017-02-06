export const trade = params => (
   fetch('https://ticker-backend.herokuapp.com/api/trades', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       trade: {
         trade_type: params.trade_type,
         volume: params.volume,
         ticker_sym: params.ticker_sym,
         user_id: params.user_id,
       } }),
   }).then(res => res.json())
);
