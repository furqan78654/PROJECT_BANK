import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useHistory } from "react-router-dom";

import axios from 'axios'
function Login (){
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate= useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://backend-service:7001/login',{email,password})
        .then(result => {
            console.log (result.data)
            if(result.data==="success"){
                // const accounts = AccountModel.find({})                        
                navigate("/home")
            }
            console.log (result)
        })
        .catch(err => console.log (err))
    }
    return (
        <div className="w-[400px] max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <h3 className=""> LOGIN </h3>
            <form onSubmit={handleSubmit}>
                 Enter Email <Input type="email" className="block text-sm font-medium" name="email" onChange={(e)=> setEmail(e.target.value)} required></Input><br></br>
                 Enter Passworod <Input type="password" className="block text-sm font-medium"name="password" onChange={(e)=> setPassword(e.target.value)} required></Input><br></br>
                 <Button type="submit" className="w-full mt-4">Login</Button>
           </form>
           
        </div>
    );
} // end of Login ()
export default Login;