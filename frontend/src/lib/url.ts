export const END_POINT={
auth:{
    login:"/auth/signin",
    signup:"/auth/signup",
    forgotPassword:"/auth/forgot-password",
    setNewPassowrd:"/auth/reset-password",
    google:"/auth/google",
    googleCallback:"/auth/google/callback"
},
user:{
    profile:"/user",
    onboarding:"/user/onboarding",
    businessProfile:"/user/business-profile"
}
} as const