export interface LOGIN_PAYLOAD{
    email:string;
    password:string;
}
export interface LOGIN_RESPONSE {
  message?:string;

  
}
export interface SIGNUP_PAYLOAD{
firstName:string;
lastName:string;
email:string;
password:string;
invitationId?:string;
}
export interface SIGNUP_RESPONSE{

}
export interface FORGOTPASSWORD_PAYLOAD{
email:string;
}
export interface FORGOTPASSWORD_RESPONSE{

}
export interface SETNEWPASSWORD_PAYLOAD{
token:string;
newPassword:string;
}
export interface SETNEWPASSWORD_RESPONSE{

}