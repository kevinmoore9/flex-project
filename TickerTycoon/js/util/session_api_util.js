export const login = user => (
   fetch('https://ticker-backend.herokuapp.com/api/session', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       user: {
         email: user.email,
         password: user.password,
       } }),
   }).then(res => res.json())
);

export const logout = (token) => {
  return (
   fetch('https://ticker-backend.herokuapp.com/api/session', {
     method: 'DELETE',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       session: token,
     }),

   })
  );
};

export const signup = (user) => {
  return (
   fetch('https://ticker-backend.herokuapp.com/api/user', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       user: {
         email: user.email,
         password: user.password,
       } }),
   }).then(res => res.json())
  );
};

// export const get = (token) => {
//   debugger
//   return (
//     fetch('https://ticker-backend.herokuapp.com/api/user', {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         session_token: token,
//       }),
//     }).then(res => res.json())
//   );
// };
