import React from 'react'
import './Form.css'
import { useLoginMutation, useAdminLoginMutation } from '../redux/APIs'
import { useNavigate } from 'react-router-dom'

const Form = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isError, setIsError] = React.useState<boolean | null>(null)
    const navigate = useNavigate()
    const [login] = useLoginMutation()
    const [adminLogin] = useAdminLoginMutation()


    const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
          const data = await login({ username, password }).unwrap()
          const token = data?.token

          if (!token) {
            setIsError(true)
            return
          }
          if(data?.user.role === 'user'){
            
            navigate(`/user-dashboard/${data?.user._id}`)
          }
          setIsError(false)
          localStorage.setItem('token', token)
          
          const adminData = await adminLogin(token).unwrap()
          if(adminData?.user.role === 'admin'){
            
            navigate('/Dashboard')
            
          }
         
        } catch {
          setIsError(true)
          return
        }
        
    }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit= {onsubmit}>
        <h1 className="form-title">Login</h1>
        <label className="form-label" htmlFor="username">Username</label>
        <input className="form-input" style={{border: !username ? '1px solid #ff0000' : ''}} type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label className="form-label" htmlFor="password">Password</label>
        <input className="form-input" style={{border: !password ? '1px solid #ff0000' : ''}} type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="form-button" type="submit">Login</button>
        
      </form>
    </div>
  )
}

export default Form
