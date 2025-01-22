const express=require("express")
const mongoose= require ("mongoose")
const cors = require ("cors")
const UserModel=require ("./models/User")
const AccountModel=require ("./models/Accounts")
require('dotenv').config()

const app = express()
app.use (express.json())  //convert data to json
app.use (cors())
//pass connection string plus db name
mongoose.connect('mongodb://mongo-service:27017/mydb');

app.post("/register", (req,res)=> {
    UserModel.create(req.body)
    .then(users => res.json (users))
    .catch (err => res.json(err))
})
app.post("/withdrawal", async (req, res) => {
  const { account, amount } = req.body;
  const parsedAmount = parseFloat(amount);

  try {
    // Update account balance
    const result = await AccountModel.updateOne(
      { account: account },  // Condition to match the account
      { $inc: { balance: -parsedAmount } }  // Decrease balance by the amount
    );

    if (result.modifiedCount > 0) {
      // Find the account details after the update
      const updatedAccount = await AccountModel.findOne({ account: account });
      return res.json({
        status: "Success",
        accountName: updatedAccount.accountName,
        remainingBalance: updatedAccount.balance,
      });
    } else {
      return res.json({
        status: "Failed",
        message: "Account not found or insufficient balance.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Failed",
      message: "An error occurred while processing the withdrawal.",
    });
  }
});

// app.post("/withdrawal", async (req, res) => {
//   const { account, amount } = req.body;
//   // Ensure amount is a number
//   const parsedAmount = parseFloat(amount);
//    // Update account balance
//     const result = await AccountModel.updateOne(
//       { account: account },  // Condition to match the account
//       { $inc: { balance: -parsedAmount } }  // Increment balance by the amount
//     );
// });
app.post("/balance", async (req, res) => {
  const { account } = req.body;

  AccountModel.findOne({ account: account })
    .then((accountData) => {
      // If the user exists
      if (accountData) {
        res.json({ message: "User Balance is", balance: accountData.balance });
      } else {
        res.json({ message: "User does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error", details: err });
    });
});
app.post("/transfer", async (req, res) => {
  const { fromAccount, toAccount, amount } = req.body;

  try {
    // Ensure amount is a number
    const parsedAmount = parseFloat(amount);

    // Perform the transfer: deduct from sender's account and add to receiver's account
    const senderResult = await AccountModel.updateOne(
      { account: fromAccount },
      { $inc: { balance: -parsedAmount } }
    );

    const receiverResult = await AccountModel.updateOne(
      { account: toAccount },
      { $inc: { balance: parsedAmount } }
    );

    if (senderResult.nModified === 0 || receiverResult.nModified === 0) {
      return res.status(404).json({ message: 'Account(s) not found' });
    }

    // Fetch updated account details
    const senderAccount = await AccountModel.findOne({ account: fromAccount });
    const receiverAccount = await AccountModel.findOne({ account: toAccount });

    res.status(200).json({
      message: "Transfer successful",
      fromAccountName: senderAccount.name,
      toAccountName: receiverAccount.name,
      fromBalance: senderAccount.balance,
      toBalance: receiverAccount.balance,
      amount: parsedAmount,
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post("/deposit", async (req, res) => {
  const { account, amount } = req.body;

  try {
    // Validate inputs
    if (!account || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Ensure amount is a number
    const parsedAmount = parseFloat(amount);

    // Update account balance
    const result = await AccountModel.updateOne(
      { account: account },  // Condition to match the account
      { $inc: { balance: parsedAmount } }  // Increment balance by the amount
    );

    // Check if the account was matched
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Fetch updated account balance
    const updatedAccount = await AccountModel.findOne({ account: account });

    // Successful deposit
    res.status(200).json({
      message: 'Deposit successful',
      // accountName: updatedAccount.name,
      // Make sure this exists in the model
      account,
      amount: parsedAmount,
      balance: updatedAccount.balance,
    });
    
  } catch (error) {
    console.error('Server error:', error); // Log the error to the console
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// app.post("/deposit", async (req, res) => {
//   const { account, amount } = req.body;

//   try {
//     // Validate inputs
//     if (!account || !amount || isNaN(amount) || amount <= 0) {
//       return res.status(400).json({ message: 'Invalid input' });
//     }

//     // Ensure amount is a number
//     const parsedAmount = parseFloat(amount);

//     // Update account balance
//     const result = await AccountModel.updateOne(
//       { account: account },  // Condition to match the account
//       { $inc: { balance: parsedAmount } }  // Increment balance by the amount
//     );

//     // Check if the account was matched
//     if (result.matchedCount === 0) {
//       return res.status(404).json({ message: 'Account not found' });
//     }

//     // Successful deposit
//     res.status(200).json({ message: 'Deposit successful' });

//   } catch (error) {
//     console.error('Server error:', error); // Log the error to the console
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

    
app.post("/login", (req,res)=> {
    const {email, password}= req.body;
    UserModel.findOne({email:email})
    .then(user => {
        //if user exist
        if(user){
            //mongo password===frm password
            if(user.password===password){
                res.json("success")
            }
            else{
                res.json("Password is incorrect")
            }
        }
        else {
           res.json("User does not exist")
        }
    })
    .catch (err => res.json(err))
})
app.get("/home", (req,res)=> {
    console.log ("welcome")

})

app.listen(process.env.PORT, () => {
   console.log(`LGU Server running on http://localhost:${process.env.PORT} 27-dec`);
});
