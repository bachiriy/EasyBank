import { Button, Input } from "@mui/material";
import axios, {  RawAxiosRequestHeaders } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

const EditClient: React.FC = () => {

    const client = axios.create({
        baseURL: url + "customers",
    });

    const params = useParams();

    const navigate = useNavigate();

    const [id, setId] = useState<number>(Number(params.id) || 0);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string>();
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [succ, setSucc] = useState<string>();

    useEffect(() => {
        getCustomer(id);
    }, [id]);


    const getCustomer = async (id: number) => {
        setLoading(true);
        await client.get(`/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setName(response.data.name);
                    setEmail(response.data.email);
                } 
            })
            .catch(error => {
                if (error.response.data.message) {
                    setErr(error.response.data.message);
                }
            });
        setLoading(false);
    }

    const putCustomer = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await client.put(`/${id}`, {name: name, email: email}, {
            headers: {
                'Accept': 'application/json',
            } as RawAxiosRequestHeaders,
        }).then(response => {
            if (response.status === 200) {
                setSucc("Customer was updated with success.");
                goBack();
            } 
        }).catch(error => {
            if (error.response.data) {
                setErr(error.response.data);
            }
        });
        setLoading(false);
    }

    const goBack = () => {
        const timeOut = setTimeout(() => {
            navigate("/customers");
        }, 4000);
        return () => clearTimeout(timeOut);
    } 

    const deleteCustomer = async () => {
        setLoading(true);
        await client.delete(`/${id}`, { headers: { 'Accept': 'application/json' } as RawAxiosRequestHeaders})
        .then(response => {
            if (response.status === 200) {
                setSucc(response.data);
                goBack();
            } 
        }).catch(error => {
            if (error.response.data) {
                setErr(error.response.data);
            }
        });
        setLoading(false);
    } 

    if (loading) return <p>loading...</p>;
    if(err) return <p className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md mb-4">{err}</p>;
    if(succ) return <p className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md mb-4">{succ}</p>;

    return (
        <>
            <div className="absolute right-0 px-4">
                <Button onClick={deleteCustomer} variant="contained" color="error">Delete This Customer</Button>
            </div>

            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md relative">
              {/* Edit Form */}
              <form onSubmit={putCustomer}>
                {/* Customer Name Input */}
                <div className="mb-4">
                  <Input
                    placeholder="Customer Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
            
                {/* Customer Email Input */}
                <div className="mb-6">
                  <Input
                    placeholder="Customer Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
            
                {/* Save Button */}
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {loading ? "Loading..." : "Save Customer"}
                </Button>
              </form>
            </div>
        </>
    );
};
export default EditClient;
