// import React, {useContext} from 'react'
// import axiosPrivate from '../api/axios'
// import AuthContext from '../contexts/AuthContext'
// import useAccessToken from '../hooks/useAccessToken';



// const AuthService = () => {
//   const {setId, id} = useContext(AuthContext);
//   const accessToken = useAccessToken();
  
//   const signUp = async (login, email, password) => {
//     const res = await axiosPrivate.post('/users/signup', JSON.stringify(
//         {login, email, password}
//         ),
//     )
//     accessToken.setItem(res.data.accessToken);
//     setId({id: res.data.id});
//     return;
//   }
//   const logIn = async (login, password) => {
//     const res = await axiosPrivate.post('/users/login', JSON.stringify(
//         {login, password}
//         ),
//     )
//     accessToken.setItem(res.data.accessToken);
//     setId({id: res.data.id});
//     return;
//   }
//   const logOut = async () => {
//     const res = await axiosPrivate.post('/users/logout')
//     .then((res) => {
//       accessToken.removeItem();
//       setId({id: null})
//       return;
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     })
//   }
// }

// export default AuthService