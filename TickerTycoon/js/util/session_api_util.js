export const login = user => (
   fetch('http://localhost:3000/api/session', {
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
   fetch('http://localhost:3000/api/session', {
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
   fetch('http://localhost:3000/api/user', {
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

export const get = (token) => {
  return (
    fetch('http://localhost:3000/api/user', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_token: token,
      }),
    }).then(res => res.json())
  );
};
