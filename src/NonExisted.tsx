import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NonExisted = () => {
  const navigate = useNavigate()

  useEffect(() =>{
    navigate("/Login")
  },[])
  return (
    <div>
        
    </div>
  )
}

export default NonExisted