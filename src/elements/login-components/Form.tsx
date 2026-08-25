import React from 'react'
import './Form1.css'
import { useLoginMutation, useAdminLoginMutation } from '../redux/APIs'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaBuildingColumns } from "react-icons/fa6";


const Form = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
 
    const navigate = useNavigate()
    const [login, {isLoading, error}] = useLoginMutation()
    const [adminLogin, { isLoading: isLoadingAdmin }] = useAdminLoginMutation()

    const isLoadingAll = Boolean(isLoading) || Boolean(isLoadingAdmin)


    const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
          const data = await login({ username, password }).unwrap()
          const token = data?.token

          if (!token) {
            
            return
          }
          localStorage.setItem('token', token)
          if(data?.user.role === 'user'){
            
            navigate(`/Navigation/${data?.user._id}`)
          }
          
          
          
          const adminData = await adminLogin(token).unwrap()
          if(adminData?.user.role === 'admin'){
            
            navigate('/Dashboard')
            
          }
         
        } catch {
          
          return
        }
        
    }
    
  return (
    <div className="login-page">
      { isLoadingAll ? (<AiOutlineLoading3Quarters className='frame' size={"50px"} color='rgb(11, 74, 211)'/>): 
      (<form className="login-form" onSubmit= {onsubmit}>
        <div className='logo-order'>
          <FaBuildingColumns id ="login-logo"  color="rgb(211, 179, 0)" fontSize={50} />
          <h1 className="form-title">Login</h1>
        </div>
        <label className="form-label" htmlFor="username">Username</label>
        <input className="form-input" style={{border: !username ? '1px solid #ff0000' : ''}} type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label className="form-label" htmlFor="password">Password</label>
        <input className="form-input" style={{border: !password ? '1px solid #ff0000' : ''}} type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="form-button1" type="submit">Login</button>
        {error?
        <p style={{color: "red", fontSize: "20px", fontFamily: "Arial", marginBottom: "2px"}}>Error while login try again</p>
          : null
      }
      </form>)
      
      }
      
    </div>
  )
}

export default Form
