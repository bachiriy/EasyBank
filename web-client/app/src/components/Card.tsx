import React from "react";
import { Customer } from "../interface/Customer";
import {  useNavigate } from 'react-router-dom';

const Card: React.FC<{customer: Customer}> = ({ customer }: { customer: Customer }) => {
    const navigate = useNavigate();

    const navigateToEditCustomer = () => {
        navigate("/customers/" + customer.id + "/edit");
    }

   return (
        <div onClick={navigateToEditCustomer} className={"space-y-16 m-3 "}>
            <div className={"w-72 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110 " + (customer.accounts.length > 1 ? " h-96" : "h-80")}>
                <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png" />
                <div className="w-full px-8 absolute top-8">
                    <div className="flex justify-between">
                        <div className="text-xs">
                            <p className="font-light">
                                ID 
                            </p>
                            <p className="font-medium tracking-widest">
                                 #{customer.id} 
                            </p>
                        </div>
                        <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/>
                    </div>
                    <div className="pt-1">
                        <p className="font-light">
                            Name 
                        </p>
                        <p className="font-medium tracking-more-wider">
                            {customer.name} 
                        </p>
                    </div>
                    <div className="pt-1">
                        <p className="font-light">
                            Email 
                        </p>
                        <p className="font-medium tracking-more-wider">
                            {customer.email} 
                        </p>
                    </div>
                    <div className="pt-14 pr-6">
                    {customer.accounts && customer.accounts.map(account => (

                        <div className="flex pb-2 justify-between">
                            <div className="">
                                <p className="font-light text-xs">
                                    ID 
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    #{account.id} 
                                </p>
                            </div>
                            <div className="">
                                <p className="font-light text-xs">
                                    Balance 
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    {account.balance} 
                                </p>
                            </div>
                            <div className="">
                                <p className="font-light text-xs text-xs">
                                    Account Type 
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    {account.type} 
                                </p>
                            </div>
                        </div>
                    ))}

                    </div>
                </div>
            </div>
        </div>
   ); 
}

export default Card;
