export const deposit = params => (
   fetch(`https://ticker-backend.herokuapp.com/api/users/${params.user_id}/deposits`, {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       user: {
         amount: parseInt(params.amount, 10),
       } }),
   }).then(res => res.json())
);
