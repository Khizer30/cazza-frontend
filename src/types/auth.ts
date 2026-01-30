export interface LOGIN_PAYLOAD {
  email: string;
  password: string;
}

export interface BusinessProfile {
  id?: string;
  businessName: string;
  businessEntityType: string;
  annualRevenueBand: string;
  marketplaces: string[];
  tools: string[];
  useXero: boolean;
  useMultipleCurrencies: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subscription {
  id: string;
  status: "ACTIVE" | "TRIAL" | "CANCELED" | "EXPIRED" | "PENDING";
  expiryDate: string | null;
  autoRenew: boolean;
  paymentDate: string | null;
  planType?: "rookie" | "master";
  interval?: "monthly" | "yearly";
  customAmount?: number;
}

export interface Team {
  id: string;
  ownerId: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionStatus: "ACTIVE" | "TRIALING" | "CANCELED" | "EXPIRED" | "PENDING";
  createdAt: string;
  updatedAt: string;
  owner?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string | null;
  };
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileType?: string;
  profileImage: string | null;
  providers: string[];
  verified: boolean;
  isActive: boolean;
  platforms: string[];
  createdAt: string;
  updatedAt: string;
  planId: string | null;
  planExpiry: string | null;
  ownerId: string | null;
  teamId?: string | null;
  subscription: Subscription | null;
  businessProfile: BusinessProfile | null;
  team?: Team | null;
}

export interface AuthCheckUser {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface AuthCheckResponse {
  success: boolean;
  message: string;
  data?: {
    user: AuthCheckUser;
  };
}

export interface LOGIN_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  // Legacy support
  token?: string;
  accessToken?: string;
  access_token?: string;
}
export interface SIGNUP_PAYLOAD {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  invitationId?: string;
}
export interface SIGNUP_RESPONSE {
  success: boolean;
  message: string;
}
export interface FORGOTPASSWORD_PAYLOAD {
  email: string;
}
export interface FORGOTPASSWORD_RESPONSE {
  success: boolean;
  message: string;
}
export interface SETNEWPASSWORD_PAYLOAD {
  token: string;
  newPassword: string;
}
export interface SETNEWPASSWORD_RESPONSE {
  success: boolean;
  message: string;
}

export interface GOOGLE_AUTH_RESPONSE {
  success: boolean;
  message: string;
  data: {
    url: string;
  };
}

export interface GOOGLE_CALLBACK_PAYLOAD {
  token: string; // The OAuth authorization code from Google
}

export interface GOOGLE_CALLBACK_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

export interface ONBOARDING_PAYLOAD {
  businessName: string;
  businessEntityType: string;
  annualRevenueBand: string;
  marketplaces: string[];
  tools: string[];
  useXero: boolean;
  useMultipleCurrencies: boolean;
}

export interface ONBOARDING_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    businessProfile: BusinessProfile;
  };
}

export interface USER_PROFILE_RESPONSE {
  success: boolean;
  message: string;
  data: User;
}

export interface UPDATE_USER_PAYLOAD {
  firstName?: string;
  lastName?: string;
  role?: string;
  platforms?: string[];
}

export interface UPDATE_PROFILE_IMAGE_PAYLOAD {
  profileImage: File;
}

export interface UPDATE_PROFILE_IMAGE_RESPONSE {
  success: boolean;
  message: string;
  data?: User;
}

export interface DELETE_PROFILE_IMAGE_RESPONSE {
  success: boolean;
  message: string;
}

export interface UPDATE_USER_RESPONSE {
  success: boolean;
  message: string;
  data?: User;
}

export interface UPDATE_BUSINESS_PROFILE_PAYLOAD {
  firstName?: string;
  lastName?: string;
  businessName?: string;
  businessEntityType?: string;
  annualRevenueBand?: string;
  marketplaces?: string[];
  tools?: string[];
  useXero?: boolean;
  useMultipleCurrencies?: boolean;
}

export interface UPDATE_BUSINESS_PROFILE_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    businessProfile: BusinessProfile;
  };
}

export interface SUPPORT_TICKET_PAYLOAD {
  subject: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  category: string;
  description: string;
}

export interface SUPPORT_TICKET_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    ticketId?: string;
    ticketNumber?: string;
    [key: string]: any;
  };
}

export interface TEAM_INVITE_PAYLOAD {
  email: string;
  role: "MEMBER" | "ADMIN";
}

export interface TEAM_INVITE_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    invitation: {
      id: string;
      email: string;
      role: "MEMBER" | "ADMIN";
      status: string;
      expiresAt: string;
      createdAt: string;
      [key: string]: any;
    };
  };
}

export interface TeamInvitation {
  id: string;
  email: string;
  role: "MEMBER" | "ADMIN";
  status?: string;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
  senderId?: string;
  teamOwnerId?: string;
  sender?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string | null;
  };
  teamOwner?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string | null;
  };
  [key: string]: any;
}

export interface TeamMemberSubscription {
  id: string;
  status: "ACTIVE" | "TRIAL" | "CANCELED" | "EXPIRED" | "PENDING";
  expiryDate: string | null;
  autoRenew: boolean;
  paymentDate: string | null;
  interval: string; // "Month" or "Year" from API, can be normalized to "monthly" | "yearly"
  price: number;
  name: string;
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER" | string;
  profileImage?: string | null;
  [key: string]: any;
}

export interface TEAM_INVITATIONS_RESPONSE {
  success: boolean;
  message: string;
  data: TeamInvitation[];
}

export interface TEAM_MEMBERS_RESPONSE {
  success: boolean;
  message: string;
  data: TeamMember[];
}

export interface TEAM_ANALYTICS_RESPONSE {
  success: boolean;
  message: string;
  data: {
    totalTeamMembers: number;
    pendingInvitations: number;
    adminCount: number;
  };
}

export interface DELETE_INVITATION_RESPONSE {
  success: boolean;
  message: string;
}

export interface DELETE_MEMBER_RESPONSE {
  success: boolean;
  message: string;
}

export interface UPDATE_TEAM_MEMBER_ROLE_PAYLOAD {
  role: "ADMIN" | "MEMBER";
}

export interface UPDATE_TEAM_MEMBER_ROLE_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    member: TeamMember;
  };
}

export interface DELETE_USER_RESPONSE {
  success: boolean;
  message: string;
}

export interface GET_INVITATION_RESPONSE {
  success: boolean;
  message: string;
  data: {
    email: string;
    [key: string]: any;
  };
}

export interface ACCEPT_INVITATION_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    user?: User;
    [key: string]: any;
  };
}

export interface START_SUBSCRIPTION_PAYLOAD {
  interval: "monthly" | "yearly";
}

export interface PricingBreakdown {
  owner: {
    count: number;
    unitPrice: number;
    subtotal: number;
  };
  admins: {
    count: number;
    unitPrice: number;
    subtotal: number;
  };
  members: {
    count: number;
    unitPrice: number;
    subtotal: number;
  };
  monthlyTotal: number;
}

export interface SubscriptionDetails {
  status: "ACTIVE" | "TRIAL" | "CANCELED" | "EXPIRED" | "PENDING";
  hasStripeSubscription: boolean;
  pricing: PricingBreakdown;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

export interface GET_SUBSCRIPTION_RESPONSE {
  success: boolean;
  message: string;
  data: SubscriptionDetails;
}

export interface START_SUBSCRIPTION_RESPONSE {
  success: boolean;
  message: string;
  data: {
    checkoutUrl: string;
  };
}

export interface UNSUBSCRIBE_RESPONSE {
  success: boolean;
  message: string;
}

export interface TEAM_MEMBER_SUBSCRIPTION_PAYLOAD {
  userId: string;
  interval: "monthly" | "yearly";
}

export interface TEAM_MEMBER_SUBSCRIPTION_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    checkoutUrl: string;
    subscription?: {
      id: string;
      planType: string;
      trialEnd?: string;
      subscribed: boolean;
      subscriptionEnd?: string;
      customAmount?: number;
      [key: string]: any;
    };
  };
}

export interface CHATBOT_ASK_PAYLOAD {
  question: string;
  chatId?: string;
}

export interface ChatMessage {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface CHATBOT_ASK_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    id?: string;
    messageId?: string;
    chatId?: string;
    question: string;
    answer: string;
    createdAt?: string;
    updatedAt?: string;
  };
  errors?: string;
}

export interface CHATBOT_HISTORY_RESPONSE {
  success: boolean;
  message: string;
  data: {
    messages: ChatMessage[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface CHATBOT_DELETE_MESSAGE_RESPONSE {
  success: boolean;
  message: string;
}

export interface Chat {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CREATE_CHAT_PAYLOAD {
  title?: string;
}

export interface CREATE_CHAT_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    chat: Chat;
  };
}

export interface GET_ALL_CHATS_RESPONSE {
  success: boolean;
  message: string;
  data: {
    chats: Chat[];
  };
}

export interface GET_CHAT_RESPONSE {
  success: boolean;
  message: string;
  data: {
    chat: Chat;
    messages: ChatMessage[];
  };
}

export interface UPDATE_CHAT_TITLE_PAYLOAD {
  title: string;
}

export interface UPDATE_CHAT_TITLE_RESPONSE {
  success: boolean;
  message: string;
  data?: Chat;
}

export interface DELETE_CHAT_RESPONSE {
  success: boolean;
  message: string;
}

/**
 * @deprecated Use DashboardDetailItem instead. This interface is kept for backward compatibility.
 */
export interface TikTokShopDataItem {
  monthYear: string;
  Orders: number;
  "Units Sold": number;
  "Gross Revenue (£)": number;
  "Commission Fee (£)": number;
  "Payment Fee (£)": number;
  "Service Fee (£)": number;
  "Ad Spend (£)": number;
  "Refunds (£)": number;
  "Shipping Deduction (£)": number;
  "Other Deductions (£)": number;
  "Payout (£)": number;
  "Net Profit (£)": number;
}

/**
 * @deprecated Use DashboardDetailResponse instead. This interface is kept for backward compatibility.
 */
export interface TikTokShopResponse {
  success: boolean;
  message: string;
  data: TikTokShopDataItem[];
}

export interface DashboardDetailItem {
  monthYear: string;
  Sessions: string;
  Orders: string;
  "Units Sold": string;
  "Gross Revenue": string;
  "Commission Fee": string;
  "Payment Fee": string;
  "Service Fee": string;
  "Ad Spend": string;
  Refunds: string;
  Discounts: string;
  "Shipping Deduction": string;
  "Other Deductions": string;
  Shipping: string;
  Tax: string;
  Payout: string;
  "Net Sales": string;
  "Net Profit": string;
}

export interface DashboardDetailResponse {
  success: boolean;
  message: string;
  data: DashboardDetailItem[];
}

export interface DashboardSummaryData {
  totalRevenue: string;
  netProfit: string;
  totalExpense: string;
  profitMargin: string;
  connectedPlatforms: string[];
  revenueByPlatform: {
    amazon: string;
    shopify: string;
    tiktok: string;
    ebay: string;
  };
}

export interface DashboardSummaryResponse {
  success: boolean;
  message: string;
  data: DashboardSummaryData;
}

export interface Blog {
  id: string;
  title: string;
  summary: string;
  blogImage?: string;
  images?: string[];
  status: "PUBLISHED" | "DRAFT";
  authorName: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface BlogDetail extends Blog {
  date: string;
  body: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface BlogListResponse {
  success: boolean;
  message: string;
  data: Blog[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface BlogDetailResponse {
  success: boolean;
  message: string;
  data: BlogDetail;
}

export interface CreateBlogPayload {
  title: string;
  summary: string;
  date: string;
  body: string;
  status: "DRAFT" | "PUBLISHED";
  authorName: string;
  blogImage?: File;
  images?: File[];
}

export interface CreateBlogResponse {
  success: boolean;
  message: string;
  data?: Blog;
}

export interface UpdateBlogPayload {
  title: string;
  summary: string;
  date: string;
  body: string;
  status: "DRAFT" | "PUBLISHED";
  authorName: string;
  blogImage?: File;
  images?: File[];
}

export interface UpdateBlogResponse {
  success: boolean;
  message: string;
  data?: Blog;
}

export interface DeleteBlogResponse {
  success: boolean;
  message: string;
}

export interface DeleteBlogImagePayload {
  imageUrl: string;
}

export interface DeleteBlogImageResponse {
  success: boolean;
  message: string;
}

export interface Notification {
  id: string;
  subject: string;
  message: string;
  isRead: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface NOTIFICATIONS_RESPONSE {
  success: boolean;
  message: string;
  data: Notification[];
}

export interface MARK_READ_RESPONSE {
  success: boolean;
  message: string;
  data: {
    count: number;
  };
}
