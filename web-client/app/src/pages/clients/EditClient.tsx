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
            console.log(error);
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

    if (loading) return <p>loading...</p>;
    if(err) return <p className="text-red-500 border">{err}</p>;
    if(succ) return <p className="text-green-500 border">{succ}</p>;

    return (
        <>
            {/* TODO: Handle Customer Delete */}
            <div className="absolute right-0 px-4">
                <Button variant="contained" color="error">Delete This Customer</Button>
            </div>

            <form onSubmit={putCustomer}>
                <Input placeholder="Customer Name"  name="name" value={name} onChange={e => setName(e.target.value)}/>
                <Input placeholder="Customer Email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <Button type="submit" variant="outlined" color="primary">{loading ? "Loading..." : "Save Customer"}</Button>
            </form>

        </>
    );
};
export default EditClient;
