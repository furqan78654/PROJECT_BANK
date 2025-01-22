import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from 'axios';

function Balance() {
    const [account, setAccount] = useState();
    const [balance, setBalance] = useState(null); // To store and display balance
    const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert dialog
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://backend-service:7001/balance', { account })
            .then(result => {
                const { balance } = result.data;  // Assuming result.data contains balance
                setBalance(balance);  // Set balance for alert
                setIsAlertOpen(true); // Open alert dialog
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="w-[400px] max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
                <label htmlFor="account" className="">Enter Account Number</label>
                <Input
                    type="text"
                    name="account"
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder="Enter account number"
                />
                <Button type="submit" className="w-full mt-4">Check Balance</Button>
            </form>
            
            {balance !== null && (
                <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Account Balance</AlertDialogTitle>
                            <AlertDialogDescription>
                                Your current balance is ${balance}.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={() => setIsAlertOpen(false)}>Close</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
}

export default Balance;
