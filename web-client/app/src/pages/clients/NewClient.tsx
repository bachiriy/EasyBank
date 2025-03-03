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
    const [errs, setErrs] = useState<{nameErr: string, emailErr: string }>({nameErr: "", emailErr: ""});
    const [msg, setMsg] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
       const cleanMsgs = setTimeout(() => {
           setErrs({nameErr: "", emailErr: ""});
           setMsg("");
           setErrorMessage("");
       }, 10000); 
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
            if (error.response.data.message) {
               setErrorMessage(error.response.data.message);
            }
        });
    }

    return (
        <>
          {msg && 
            <p className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md mb-4">
          {msg}</p>}
          {errorMessage && <p className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md mb-4">{errorMessage}</p>}

          <form onSubmit={postCustomer} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Customer Name Input */}
            <div className="mb-4">
              <Input
                error={errs?.nameErr !== ""}
                placeholder="Customer Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errs?.nameErr && (
                <p className="mt-2 text-sm text-red-600 bg-red-50 border-l-4 border-red-500 p-2 rounded-lg">
                  {errs.nameErr}
                </p>
              )}
            </div>
          
            {/* Customer Email Input */}
            <div className="mb-6">
              <Input
                error={errs?.emailErr !== ""}
                placeholder="Customer Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errs?.emailErr && (
                <p className="mt-2 text-sm text-red-600 bg-red-50 border-l-4 border-red-500 p-2 rounded-lg">
                  {errs.emailErr}
                </p>
              )}
            </div>
          
            {/* Submit Button */}
            <Button
              type="submit"
              variant="outlined"
              color="success"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? "Loading..." : "Create Customer"}
            </Button>
          </form>
</>
    );
};
export default NewClient;
