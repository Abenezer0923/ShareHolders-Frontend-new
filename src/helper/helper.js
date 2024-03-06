import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {useParams} from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:2020";


/** Make API Requests */


/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}

/** authenticate function */
// export async function authenticate(username){
//     try {
//         return await axios.post('https://api.purposeblacketh.com/api/auth/login', { username })
//     } catch (error) {
//         return { error : "Username doesn't exist...!"}
//     }
// }

/** get User details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`http://localhost:8080/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}



/** login function */
export async function verifyPassword({ username, password }){
    try {
        if(username){
            // const { data } = await axios.post('https://api.purposeblacketh.com/api/auth/login', { username, password })
            const { data } = await axios.post('http://localhost:2020/api/auth/login', { username, password })
            console.log("Hi man pis new")
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}



/** update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

// /** generate OTP */
// export async function generateOTP(username){
//     try {
//         const {data : { code }, status } = await axios.get('http://localhost:8080/api/generateOTP', { params : { username }});

//         // send mail with the OTP
//         if(status === 201){
//             let { data : { email }} = await getUser({ username });
//             let text = `Dear Share Holder This is verify code ${code}. Plase do not share This code just use it.`;
//             await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
//         }
//         return Promise.resolve(code);
//     } catch (error) {
//         return Promise.reject({ error });
//     }
// }

/** verify OTP */
export async function verifyOTP({ otp }) {
    
    try {
    //   const { data, status } = await axios.post('https://api.purposeblacketh.com/api/auth/verifyOTP', { otp: otp });
      const { data, status } = await axios.post('http://localhost:2020/api/auth/verifyOTP', { otp: otp });
      return { data, status };
    } catch (error) {
      return Promise.reject(error);
    }
  }

/**verify email */

export async function verifyEmail({email}) {
    try {
        const {data, status} = await axios.post('http://localhost:2020/api/auth/forgot-password', {email: email})
        return {data, status};
    } catch (error) {
        return Promise.reject(error)
    }
}

/** reset password */
// export async function resetPassword({ password }) {
//     try {
//       const { data, status } = await axios.post(
//         `http://localhost:2020/api/reset_password/${id}/${token}`,
//         { password }
//       );
//       return Promise.resolve({ data, status });
//     } catch (error) {
//       return Promise.reject({ error });
//     }
// }
  