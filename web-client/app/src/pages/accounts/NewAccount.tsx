import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import axios, { AxiosError, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import React, { useEffect, useState } from "react";
import { Account } from "../../interface/Account";
import { Customer } from "../../interface/Customer";

const url = process.env.REACT_APP_API_URL;

type AccErrs = {
    balanceErr: string;
    typeErr: string;
}

const NewAccount: React.FC = () => {
    const client = axios.create({
        baseURL: url,
    });

    useEffect(() => {
        getCustomers();
    }, []);

    const [balance, setBalance] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [customerId, setCustomerId] = useState<number>(0);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errs, setErrs] = useState<AccErrs>({
        balanceErr: "",
        typeErr: ""
    });
    const [succ, setSucc] = useState<string>("");
    const [err, setErr] = useState<string>("");



    const postAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await client.post(`accounts`, {balance: balance, type: type, customerId: customerId}, {
            headers: {
                'Accept': 'application/json',
            } as RawAxiosRequestHeaders,
        }).then(response => {
            if (response.status === 200) {
                setSucc("Account was saved with success.");
            } 
            setBalance("");
            setType("");
        }).catch(error => {
            if(error.response.data.errors){
                let errors = error.response.data.errors;
                setErrs({
                    balanceErr: errors.balance || null,
                    typeErr: errors.type || null,
                });
            }
            if (error.response.data.message) {
               setErr(error.response.data.message);
            }
        });
        setLoading(false);
    }


    const getCustomers = async () => {
        setLoading(true);

        await client.get(`customers`)
        .then(response => {
            if (response.status === 200) {
                setCustomers(response.data);
                console.log(customers);
            }  

        }).catch(err => {
            setErr((err as AxiosError).message);
        });
        setLoading(false);
    }

    if (loading) return <p>loading...</p>; 

    return (
        <>
          {succ && <p className="text-green-500 border p-2 rounded-xl">{succ}</p>}
          {err && <p className="text-red-500 border p-2 rounded-xl">{err}</p>}

            <form onSubmit={postAccount}>
                <Input error={errs?.balanceErr !== ""} placeholder="Account Balance"  name="balance" value={balance} onChange={e => setBalance(e.target.value)}/>
                {errs?.balanceErr && <p className="text-red-500 border p-2 rounded-xl">{errs.balanceErr}</p>}

                <FormControl error={errs?.typeErr !== ""}>
                  <InputLabel id="type-select-label">Type</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={type}
                    name="type"
                    label="type"
                    onChange={(e) => setType(e.target.value)}
                  >
                  <MenuItem value="CURRENT">CURRENT</MenuItem>
                  <MenuItem value="SAVINGS">SAVINGS</MenuItem>
                  </Select>
                </FormControl>
                {errs?.typeErr && <p className="text-red-500 border p-2 rounded-xl">{errs.typeErr}</p>}

                <FormControl >
                  <InputLabel id="customer-select-label">Customer</InputLabel>
                  <Select
                    labelId="customer-select-label"
                    id="customer-select"
                    value={customerId}
                    name="customerId"
                    label="CustomerId"
                    onChange={(e) => setCustomerId(Number(e.target.value))}
                  >
                  {customers.map((customer) => (
                      <MenuItem value={customer.id}>{customer.name}</MenuItem>
                  ))}
                  </Select>
                </FormControl>


                <Button type="submit" variant="outlined" color="success">{loading ? "Loading..." : "Create Account"}</Button>
            </form>
        </>
    );
}

export default NewAccount;
