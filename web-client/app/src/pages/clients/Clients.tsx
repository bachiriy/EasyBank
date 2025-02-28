import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { Customer } from "../../interface/Customer";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

const Clients = () => {
    const client = axios.create({
        baseURL: url + "customers",
    });

    const [customers, setCustomers] = useState<Customer[]>([{
            id: 0,
            name: "EMPTY",
            email: "EMPTY@customers.db",
            accounts: []
        }]);

    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string>();
    const [msg, setMsg] = useState<string>();

    useEffect(() => {
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
        try {
            const response: AxiosResponse = await client.get(``);
            if (response.status === 200 && response.data.lenght != 0) {
                console.log(response);
                
                setCustomers(response.data);
            }  
            setLoading(false);
        } catch(err) {
            setLoading(false);
            setErr((err as AxiosError).message);
        }
    }

    if (loading) return <div>Loading...</div>;
    return (
        <>
          {err && <p className="text-red-500 border p-2 rounded-xl">{err}</p>}
          {msg && <p className="text-green-500 border p-2 rounded-xl">{msg}</p>}


          {/* <Button props={{color: 'green', content: 'Create New Client', path: '/clients/new'}}/> */}
          <div className="w-auto flex justify-end mx-4">
              <Link to="/customers/new">
                  <Button variant="outlined" color="success">Create New Customer</Button>
              </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:mx-44">
            {customers && customers.map((c: Customer, i: number) => <Card key={i}customer={c} /> )}
          </div>
        </>
    ); 
}

export default Clients;
