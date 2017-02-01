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
   })
);

export const logout = () => (
   fetch('http://localhost:3000/api/session', { method: 'DELETE' })
);

export const signup = user => (
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
   })
);
