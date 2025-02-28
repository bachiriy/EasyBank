import { Button, Input } from "@mui/material";
import axios, { AxiosError, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import React, { useEffect, useState } from "react";


const url = process.env.REACT_APP_API_URL;


const NewClient: React.FC = () => {

    const client = axios.create({
        baseURL: url + "customers",
    });


    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errs, setErrs] = useState<{nameErr: string, emailErr: string}>({nameErr: "", emailErr: ""});
    const [msg, setMsg] = useState<string>();

    useEffect(() => {
       const cleanMsgs = setTimeout(() => {
           setErrs({nameErr: "", emailErr: ""});
           setMsg("");
       }, 6000); 
       return () => clearTimeout(cleanMsgs);
    }, [errs, msg]);


    const postCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await client.post(``, {name: name, email: email}, {
            headers: {
                'Accept': 'application/json',
            } as RawAxiosRequestHeaders,
        }).then(response => {
            if (response.status === 200) {
                setMsg("Customer was saved with success.");
            } 
            setName("");
            setEmail("");
            setLoading(false);
        }).catch(error => {
            if(error.response.data.errors){
                let errors = error.response.data.errors;
                setErrs({
                    nameErr: errors.name || null,
                    emailErr: errors.email || null,
                });
            }
        });

    }

    // if (loading) return <p>loading...</p>;

    return (
        <>
          {msg && <p className="text-green-500 border p-2 rounded-xl">{msg}</p>}

            <form onSubmit={postCustomer}>
                <Input error={errs?.nameErr !== ""} placeholder="Customer Name"  name="name" value={name} onChange={e => setName(e.target.value)}/>
                {errs?.nameErr && <p className="text-red-500 border p-2 rounded-xl">{errs.nameErr}</p>}
                <Input error={errs?.emailErr !== ""} name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                {errs?.emailErr && <p className="text-red-500 border p-2 rounded-xl">{errs.emailErr}</p>}
                <Button type="submit" variant="outlined" color="success">{loading ? "Loading..." : "Save Customer"}</Button>
            </form>
        </>
    );
};
export default NewClient;
