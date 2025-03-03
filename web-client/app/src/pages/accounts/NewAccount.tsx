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
          {succ && 
            <p className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md mb-4">
          {succ}</p>}
          {err && <p className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md mb-4">{err}</p>}

          <form onSubmit={postAccount} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Account Balance Input */}
            <div className="mb-4">
              <Input
                error={errs?.balanceErr !== ""}
                placeholder="Account Balance"
                name="balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errs?.balanceErr && (
                <p className="mt-2 text-sm text-red-600 bg-red-50 border-l-4 border-red-500 p-2 rounded-lg">
                  {errs.balanceErr}
                </p>
              )}
            </div>
          
            {/* Account Type Dropdown */}
            <div className="mb-4">
              <FormControl error={errs?.typeErr !== ""} className="w-full">
                <InputLabel id="type-select-label" className="text-gray-700">Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={type}
                  name="type"
                  label="Type"
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <MenuItem value="CURRENT">CURRENT</MenuItem>
                  <MenuItem value="SAVINGS">SAVINGS</MenuItem>
                </Select>
              </FormControl>
              {errs?.typeErr && (
                <p className="mt-2 text-sm text-red-600 bg-red-50 border-l-4 border-red-500 p-2 rounded-lg">
                  {errs.typeErr}
                </p>
              )}
            </div>
          
            {/* Customer Dropdown */}
            <div className="mb-6">
              <FormControl className="w-full">
                <InputLabel id="customer-select-label" className="text-gray-700">Customer</InputLabel>
                <Select
                  labelId="customer-select-label"
                  id="customer-select"
                  value={customerId}
                  name="customerId"
                  label="Customer"
                  onChange={(e) => setCustomerId(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {customers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          
            {/* Create Account Button */}
            <Button
              type="submit"
              variant="outlined"
              color="success"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? "Loading..." : "Create Account"}
            </Button>
          </form>
</>
    );
}

export default NewAccount;
