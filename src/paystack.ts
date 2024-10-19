import axios from "axios"

type JSONResponse<T> = {
    status: boolean;
    message: string;
    data?: T
}

enum Intervals {
    Daily = "daily",
    Weekly = "weekly",
    Monthly = "monthly"
}

enum Currency {
    NGN = "NGN",
    USD = "USD",
    GHC = "GHS"
}

//class payagent that takes in the api and secret keys
class PayAgent {
    private api_key: string //api and secret set to private as they should not be altered
    private secret_key: string

    //initializes the pay agent with api and secret keys
    constructor(apiKey: string, secretKey: string) {
        this.api_key = apiKey
        this.secret_key = secretKey
    }

    async CreatePlan(name: string, subscription_interval: string, chargeAmount: number, currency: string): Promise<JSONResponse<CreatePlanMetaData>> {
        try {
            const amount = chargeAmount * 100;

            const response = await axios.post<JSONResponse<CreatePlanMetaData>>("https://api.paystack.co/plan",
            {
                name,
                interval: subscription_interval,
                amount,
                currency,
            },
            {
                headers: {
                    "Authorization": "Bearer " + this.secret_key,
                    "Content-Type": "application/json"
                }
            }
        )

        if(response.status == 200 || response.status == 201) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response.data)
        }

        } catch(err) {
            return Promise.reject(err)
        }
        
    }

    async GetPlan(): Promise<JSONResponse<PlanMetaData[]>> {
        try {

            const response = await axios.get<JSONResponse<PlanMetaData[]>>("https://api.paystack.co/plan",
            {
                headers: {
                    "Authorization": "Bearer " + this.secret_key,
                    "Content-Type": "application/json"
                }
            }
        )

        if(response.status == 200 || response.status == 201) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response.data)
        }

        } catch(err) {
            return Promise.reject(err)
        }
    }

    //* this is to initialize the transaction and use callback_url to redirect the user to a successful page
    async InitializeTransaction(email: string, chargeAmount: number): Promise<JSONResponse<InitializeTransactionMetaData>> {
        try {

            const amount = chargeAmount * 100; //to convert it to kobo

            const response = await axios.post<JSONResponse<InitializeTransactionMetaData>>("https://api.paystack.co/transaction/initialize",
            {
                email: email,
                amount: amount,
                currency: Currency.NGN,
            },
            {
                headers: {
                    "Authorization": "Bearer " + this.secret_key,
                    "Content-Type": "application/json"
                }
            }
        )

        if(response.status == 200 || response.status == 201) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response.data)
        }

        } catch(err) {
            return Promise.reject(err)
        }
    }

    //* verify the transaction and get the authorization code
    async VerifyTransaction(ref_number: string): Promise<JSONResponse<VerifyTransactionMetaData>> {
        try {

            let response = await axios.get<JSONResponse<VerifyTransactionMetaData>>(`https://api.paystack.co/transaction/verify/${ref_number}`,
            {
                headers: {
                    "Authorization": "Bearer " + this.secret_key,
                    "Content-Type": "application/json"
                }
            }
        )

        if(response.status == 200 || response.status == 201) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response.data)
        }

        } catch(err) {
            return Promise.reject(err)
        }
    }

    async FetchPayingCustomer(email: string, first_name: string, last_name: string, phone: string): Promise<JSONResponse<CustomerMetaData>> {
        try {

            let response = await axios.post<JSONResponse<CustomerMetaData>>("https://api.paystack.co/customer/" + email,
            {
                email: email,
                first_name: first_name,
                phone: phone
            },
            {
                headers: {
                    "Authorization": "Bearer " + this.secret_key,
                    "Content-Type": "application/json"
                }
            }
        )

        if(response.status == 200 || response.status == 201) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response.data)
        }

        } catch(err) {
            return Promise.reject(err)
        }
    }

    //* get authorization code from verifying the transaction
    async CreateSubscription(customer_email: string, plan_code: string, authorization_code: string): Promise<JSONResponse<SubscriptionMetaData>> {
        try {
            const response = await axios.post<JSONResponse<SubscriptionMetaData>>('https://api.paystack.co/subscription',
                {
                    customer: customer_email,
                    plan: plan_code,
                    authorization: authorization_code,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${this.secret_key}`,
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                return Promise.resolve(response.data);
            } else {
                return Promise.reject(response.data);
            }

        } catch (err) {
            return Promise.reject(err);
        }
    }
    
    //* get details on a subscription
    // async GetSubscription(sub_code: string) {
    //     try {
    //         const response = await axios.get<JSONResponse<>>(``)
    //     } catch (err) {
            
    //     }
    // }

    async DisableSubscription(sub_code: string, email_token: string): Promise<JSONResponse<string>> {
        try {

            let response = await axios.post<JSONResponse<string>>("https://api.paystack.co/subscription/disable",
            {
                code: sub_code,
                token: email_token
            },
            {
                headers: {
                    "Authorization": "Bearer " + this.secret_key,
                    "Content-Type": "application/json"
                }
            }
        )

        if(response.status == 200 || response.status == 201) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response.data)
        }

        } catch(err) {
            return Promise.reject(err)
        }
    }

}

export default PayAgent