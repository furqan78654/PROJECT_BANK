import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function Withdrawal() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://backend-service:7001/withdrawal", {
        account,
        amount,
      });

      if (result.data.status === "Success") {
        const { accountName, remainingBalance } = result;
        console.log(result.data)
        setAlertMessage(
          `Amount of ${amount} has been deducted from Account No ${account}. Remaining balance: ${remainingBalance}.`
        );
        setIsAlertOpen(true); // Show alert dialog
      } else {
        setAlertMessage(result.data.message || "Transaction failed. Please try again.");
        setIsAlertOpen(true); // Show error message
      }
    } catch (err) {
      setAlertMessage("An error occurred. Please check your input.");
      setIsAlertOpen(true);
    }
  };

  return (
    <div className="w-[400px] max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <label htmlFor="account" className="block text-sm font-medium">
          Enter Account Number
        </label>
        <Input
          id="account"
          type="text"
          placeholder="Account Number"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          required
        />
        <label htmlFor="amount" className="block text-sm font-medium mt-4">
          Enter Amount
        </label>
        <Input
          id="amount"
          type="number"
          min="0"
          max="50000"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <Button type="submit" className="w-full mt-4">
          Withdraw
        </Button>
      </form>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Transaction Status</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
              setIsAlertOpen(false);
              if (alertMessage.includes("deducted")) {
                navigate("/withdrawal");
              }
            }}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div style={{ marginTop: "20px" }}>
        <Link to="/home">Go to Home</Link>
      </div>
      
    </div>
  );
}

export default Withdrawal;
