import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Home() {
  return (
    <div>
      <h3 className="w-[400px] text-center max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
        Account Managment
      </h3>
      <div className="">
        <Tabs defaultValue="" className="w-[400px] max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg ">
          <TabsList>
            <TabsTrigger value="balance">Balance</TabsTrigger>
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="transaction">Transaction</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
          <TabsContent value="balance">
            Want to Check Your Balance?
            <div className="mt-4 text-center">
                <Link to="/balance" className="text-sm text-blue-600 hover:underline">Check Balance</Link>
            </div>
          </TabsContent>
          <TabsContent value="deposit">Deposit Funds in Your Account
          <div className="mt-4 text-center">
                <Link to="/deposit" className="text-sm text-blue-600 hover:underline">Click here to Deposit</Link>
            </div></TabsContent>
            <TabsContent value="transaction">Transfer Money to different Account
          <div className="mt-4 text-center">
                <Link to="/transfer" className="text-sm text-blue-600 hover:underline">Click here to Transfer</Link>
            </div></TabsContent>
            <TabsContent value="withdraw">Withdraw Cash
          <div className="mt-4 text-center">
                <Link to="/withdrawal" className="text-sm text-blue-600 hover:underline">Go to Withdrawal Page</Link>
            </div></TabsContent>
        </Tabs>
      </div>
      
    </div>
  );
}
export default Home;
