import { describe, test, expect } from "@jest/globals";
import PayAgent from "./paystack";

const TEST_API_KEY = "pk_test_423e7526b9d6def14c6ded7998146ae1f34608ab";
const TEST_SECRET_KEY = "sk_test_8e204fc9e087be1585cf21512919ce149b56c86f";
const payagent = new PayAgent(TEST_API_KEY, TEST_SECRET_KEY);

var reference: string

describe('Paystack Api', function() {
    // test('can create a plan', async function () {
    //     let res = await payagent.CreatePlan("Excite_Plan", "monthly", 30000, "NGN"); //find a better way to type the options
    //     expect(res.status).toBeTruthy()
    // });

    // test('can fetch a plan', async function(){
    //     let res = await payagent.GetPlan();
    //     expect(res.data?.length).toBeGreaterThan(0);
    //     expect(res.status).toBeTruthy();
    // })

    // test('can initialize a transaction', async function () {
    //     let res = await payagent.InitializeTransaction('stefanadins02@gmail.com', 2000);
    //     expect(res.status).toBeTruthy();
    //     console.log("the res: ", res);
    //     expect(res.data?.authorization_url).not.toBeUndefined();
    // });

    test('can create a subscription with an email', async function () {
        let res = await payagent.CreateSubscription('stefanadins02@gmail.com', 'PLN_hpd4yonlmacf4k3', 'AUTH_4d2e0t4fph');
        expect(res.status).toBeTruthy();
        console.log(res.data);
    });

    // test('can verify a transaction', async function () {
    //     let res = await payagent.VerifyTransaction('1cdnl3yvmp');
    //     expect(res.status).toBeTruthy();
    //     console.log(res);
    // });

    // test('can fetch customer', async function(){
    //     let res = await payagent.FetchPayingCustomer('stefanadins02@gmail.com', 'stephen', 'neo', '08080598674')
    //     expect(res.status).toBeTruthy()
    //     expect(res.data?.first_name).toBe('stephen')
    // })
})