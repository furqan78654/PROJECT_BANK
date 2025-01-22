import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Signup() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://backend-service:7001/register', { name, email, password })
            .then(result => {
                navigate("/login");
                console.log(result);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="">
            <Tabs defaultValue="account" className="w-[400px] max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    {/* <TabsTrigger value="password">Password</TabsTrigger> */}
                </TabsList>
                <TabsContent value="account">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">Enter Name</label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">Enter Email</label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium">Enter Password</label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>

                        <Button type="submit" className="w-full mt-4">Register</Button>
                    </form>
                </TabsContent>

                {/* <TabsContent value="password">
                    <div className="p-4">
                        <p>Change your password here.</p>
                    </div>
                </TabsContent> */}
            </Tabs>

            <div className="mt-4 text-center">
                <Link to="/login" className="text-sm text-blue-600 hover:underline">Already have an account? Login</Link>
            </div>
            
        </div>
    );
}

export default Signup;
