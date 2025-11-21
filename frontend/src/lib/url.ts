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
    businessProfile:"/user/business-profile",
    support:"/user/support",
    subscription:"/billing/checkout",
    unsubscribe:"/billing/unsubscribe"
},
team:{
    invite:"/team/invite",
    invitations:"/team/invitations?status=PENDING",
    invitation:"/team/invitation",
    members:"/team/members",
    member:"/team/member",
    updateMemberRole:"/team/member",
    analytics:"/team/analytics",
    memberSubscription:"/billing/checkout-team-member"
}
} as const