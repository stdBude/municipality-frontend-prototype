import React from 'react'
import './Form.css'
import { useLoginMutation, useAdminLoginMutation } from '../redux/APIs'
import { useNavigate } from 'react-router-dom'


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
      {isLoadingAll ? (<p style={{fontFamily: "Arial", textAlign: "center"}}>Loading...</p>): error ? 
      (<form className="login-form" onSubmit= {onsubmit}>
        <h1 className="form-title">Login</h1>
        <label className="form-label" htmlFor="username">Username</label>
        <input className="form-input" style={{border: !username ? '1px solid #ff0000' : ''}} type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label className="form-label" htmlFor="password">Password</label>
        <input className="form-input" style={{border: !password ? '1px solid #ff0000' : ''}} type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="form-button" type="submit">Login</button>
        <p style={{color: "red", fontSize: "20px", fontFamily: "Arial", marginBottom: "2px"}}>Error while login try again</p>
      </form>)
      :(<form className="login-form" onSubmit= {onsubmit}>
        <h1 className="form-title">Login</h1>
        <label className="form-label" htmlFor="username">Username</label>
        <input className="form-input" style={{border: !username ? '1px solid #ff0000' : ''}} type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label className="form-label" htmlFor="password">Password</label>
        <input className="form-input" style={{border: !password ? '1px solid #ff0000' : ''}} type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="form-button" type="submit">Login</button>
        
      </form>)}
    </div>
  )
}

export default Form
