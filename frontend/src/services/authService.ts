import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";

interface LOGIN_PAYLOAD{
    email:string;
    password:string;
}
interface LOGIN_RESPONSE {
  message?:string;

  
}
export const signInService =(paylaod:LOGIN_PAYLOAD)=>{
return apiInvoker<LOGIN_RESPONSE>(END_POINT.auth.login,"POST",paylaod)
}

interface SIGNUP_PAYLOAD{
firstName:string;
lastName:string;
email:string;
password:string;
invitationId?:string;
}
interface SIGNUP_RESPONSE{

}
export const signUpService=(paylaod:SIGNUP_PAYLOAD)=>{
return apiInvoker<SIGNUP_RESPONSE>(END_POINT.auth.signup,"POST",paylaod)
}


interface FORGOTPASSWORD_PAYLOAD{
email:string;
}
interface FORGOTPASSWORD_RESPONSE{

}
export const forgotPasswordService=(paylaod:FORGOTPASSWORD_PAYLOAD)=>{
return apiInvoker<FORGOTPASSWORD_RESPONSE>(END_POINT.auth.forgotPassword,"POST",paylaod)
}


interface SETNEWPASSWORD_PAYLOAD{
token:string;
newPassword:string;
}
interface SETNEWPASSWORD_RESPONSE{

}
export const setNEWPasswordService=(paylaod:SETNEWPASSWORD_PAYLOAD)=>{
return apiInvoker<SETNEWPASSWORD_RESPONSE>(END_POINT.auth.forgotPassword,"POST",paylaod)
}