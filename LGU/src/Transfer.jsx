import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function Transfer() {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate Input fields
    if (!fromAccount || !toAccount || !amount || amount <= 0) {
      setAlertMessage("Please fill in all fields with valid values.");
      setIsAlertOpen(true);
      return;
    }

    axios
      .post("http://backend-service:7001/transfer", { fromAccount, toAccount, amount })
      .then((result) => {
        if (result.data.message === "Transfer successful") {
          const { fromAccountName, toAccountName, fromBalance, toBalance, amount } = result.data;
          setAlertMessage(
            `Transfer of ${amount} successful! ${fromAccountName}'s balance: ${fromBalance}. ${toAccountName}'s balance: ${toBalance}.`
          );
          setIsAlertOpen(true); // Show success alert dialog
        } else {
          setAlertMessage(result.data.error || "Transfer failed. Please try again.");
          setIsAlertOpen(true); // Show failure alert dialog
        }
      })
      .catch((err) => {
        setAlertMessage("An unexpected error occurred. Please try again later.");
        setIsAlertOpen(true); // Show error alert dialog
        console.error(err);
      });
  };

  return (
    <div className="w-[400px] max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="">Transfer Funds</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Sender Account Number:
          <Input
            className="block text-sm font-medium"
            type="text"
            name="fromAccount"
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
          />
        </label>
        <br />

        <label>
          Enter Receiver Account Number:
          <Input
            className="block text-sm font-medium"
            type="text"
            name="toAccount"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
          />
        </label>
        <br />

        <label>
          Enter Amount:
          <Input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <br />

        <Button className="w-full mt-4" type="submit">
          Transfer Money
        </Button>
      </form>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Transaction Status</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsAlertOpen(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    </div>
  );
}

export default Transfer;
