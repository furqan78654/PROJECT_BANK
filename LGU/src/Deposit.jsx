// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import axios from 'axios'
// function Deposit (){
//     const [account,setAccount]=useState()    
//     const [amount,setAmount]=useState()
//     const navigate= useNavigate()
//     const handleSubmit = (e) => {
//         e.preventDefault()
        
//         axios.post('http://localhost:7001/deposit',{account,amount})
//         .then(result => {
//             console.log (result.data)
//             if(result.data==="Success"){
//                 navigate("/home")
//             }
//             console.log (result)
//         })
//         .catch(err => console.log (err))
//     }
//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
//             <form onSubmit={handleSubmit}>
//                 Enter Account Number <Input type="text" className="block text-sm font-medium"name="account" onChange={(e)=> setAccount(e.target.value)}></Input><br></br>
//                  Enter Amount <Input type="text" name="amount" className="block text-sm font-medium"onChange={(e)=> setAmount(e.target.value)}></Input><br></br>
//                                <Button className="w-full mt-4">Deposit</Button>
//            </form>
//         </div>
//     );
// } // end of Login ()
// export default Deposit;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function Deposit() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post("http://backend-service:7001/deposit", { account, amount })
      .then((result) => {
        if (result.status === 200) {
            console.log(result)
          setAlertMessage(`Deposit of ${amount} to account ${account} was successful. New balance: ${result.data.balance}`);
          setIsAlertOpen(true);
        }
      })
      .catch((err) => {
        setAlertMessage(err.response ? err.response.data.message : "An error occurred.");
        setIsAlertOpen(true);
      });
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
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          required
        />
        
        <label htmlFor="amount" className="block text-sm font-medium mt-4">
          Enter Amount
        </label>
        <Input
          id="amount"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <Button type="submit" className="w-full mt-4">
          Deposit
        </Button>
      </form>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Transaction Status</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setIsAlertOpen(false);
                if (alertMessage.includes("successful")) {
                  navigate("/deposit");
                }
              }}
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

export default Deposit;
