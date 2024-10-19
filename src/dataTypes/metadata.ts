interface SubscriptionMetaData {
    code: string;
    amount: number;
    name: string;
}

interface AuthorizationMetaData {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: string;
}

interface PlanMetaData {
    subscriptions: Array<any>,
    integration: number,
    domain: string,
    name: string,
    plan_code: string,
    description: string,
    amount: number,
    interval: string,
    send_invoices: boolean,
    send_sms: boolean,
    hosted_page: boolean,
    hosted_page_url: string,
    hosted_page_summary: string,
    currency: string,
    id: number,
    createdAt: string,
    updatedAt: string
}

interface CreatePlanMetaData {
    name: string;
    interval: string;
    amount: number;
    currency: string;
    integration: number;
    domain: string;
    plan_code: string;
    send_invoices: boolean;
    send_sms: boolean;
    hosted_page: boolean;
    migrate: boolean;
    is_archived: boolean;
    id: number;
    createdAt: string;
    updatedAt: string;
}

interface InitializeTransactionMetaData {
    authorization_url: string,
    access_code: string,
    reference: string
}

interface VerifyTransactionMetaData {
    id: number,
    domain: string,
    status: string,
    reference: string,
    amount: number,
    message: string,
    gateway_response: string,
    paid_at: string,
    created_at: string,
    channel: string,
    currency: string,
    ip_address: string,
    metadata: string,
    // log: object,
    fees: number,
    fees_split: string,
    authorization: AuthorizationMetaData,
    customer: object,
    plan: string,
    split: object,
    order_id: string,
    paidAt: string,
    createdAt: string,
    requested_amount: number,
    pos_transaction_data: string,
    // source: any,
    // fees_breakdown: any,
    transaction_date: string,
    plan_object: object,
    subaccount: object
}

interface SubscriptionMetaData {
    customer: number;
    plan: number;
    integration: number;
    domain: string;
    start: number;
    status: string;
    quantity: number;
    amount: number;
    authorization: AuthorizationMetaData;
    subscription_code: string;
    email_token: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

interface CustomerMetaData {
    integration: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: null,
    dedicated_account: object,
    identified: true,
    identifications: Array<object>,
    metadata: object
}