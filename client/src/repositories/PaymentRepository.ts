import payment from "../models/payment"
import { IRepository } from "./IRepository"
import axios from "axios"
import { userData } from "../helper";

const user = userData()

export class PaymentRepository implements IRepository<payment>{
    urlPrefix = "http://localhost:1337/api/payment-statuses"
    token = user.jwt

    async getPayment(user: string | number): Promise<payment[] | null> {
        const res = await fetch(`${this.urlPrefix}?populate=*&filters[user][$eq]=${user}`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        })
        const data = await res.json()
        return data.data
    }

    async createPayment(data: payment): Promise<payment> {
        const resp = await fetch(`${this.urlPrefix}`, {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${this.token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const data_res = await resp.json()
        return data_res;
    }
}