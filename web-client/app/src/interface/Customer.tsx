import { Account } from "./Account";

export interface Customer {
    id: number,
    name: string,
    email: string,
    accounts: Account[]
}
