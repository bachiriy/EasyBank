import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { Customer } from "../../interface/Customer";

const url = process.env.REACT_APP_API_URL;

const Clients = () => {
    const client = axios.create({
        baseURL: url + "customers",
    });

    const [customers, setCustomers] = useState<Customer[]>([
        {
            id: 0,
            name: "Default",
            email: "default@customer.easybank",
            accounts: []
        }
    ]);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string>();
    const [msg, setMsg] = useState<string>();

    useEffect(() => {
        console.log('hi');
        getCustomers();
    }, []);

    useEffect(() => {
       const cleanMsgs = setTimeout(() => {
           setErr("");
           setMsg("");
       }, 10000); 
       return () => clearTimeout(cleanMsgs);
    }, [err, msg]);

    const getCustomers = async () => {
        setLoading(true);
       // const config: AxiosRequestConfig = {
       //     headers: {
       //         'Accept': 'application/json',
       //     } as RawAxiosRequestHeaders,
       // };

        try {
            const response: AxiosResponse = await client.get(``);
            if (response.status === 200) {
                setCustomers(response.data);
            }  
            setLoading(false);
        } catch(err) {
            console.log(err);
            setLoading(false);
            setErr((err as AxiosError).message);
        }
    }

    if (loading) return <div>Loading...</div>;
    return (
        <>
          {err && <p className="text-red-500 border p-2 rounded-xl">{err}</p>}
          {msg && <p className="text-green-500 border p-2 rounded-xl">{msg}</p>}

          <Button props={{color: 'green', content: 'Create New Client', path: '/clients/new'}}/>

          <div className="grid grid-cols-1 md:grid-cols-4 md:mx-44">
            {customers && customers.map((c: Customer) => <Card customer={c} /> )}
          </div>
        </>
    ); 
}

export default Clients;
