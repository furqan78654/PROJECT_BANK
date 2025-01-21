// import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import Deposit from './Deposit'
import './index.css'; // or './main.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import './index.css'


import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Withdrawal from './Withdrawal'
import Balance from './Balance'
import Transfer from './Transfer'

function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path='/register'   element={<Signup />}>  </Route>
          <Route path='/login'   element={<Login />}>  </Route> 
          <Route path='/home'   element={<Home />}>  </Route> 
          <Route path='/transfer'   element={<Transfer />}>  </Route>  
          <Route path='/deposit'   element={<Deposit />}>  </Route>
          <Route path='/balance'   element={<Balance />}>  </Route>   
          <Route path='/withdrawal'   element={<Withdrawal />}>  </Route>                           
        </Routes>
      </BrowserRouter>
      <div className="footer">
        Made with 💖💖 by Darak
</div>
    </ThemeProvider>

    </div>
      
  )
}
export default App