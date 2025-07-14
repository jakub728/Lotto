import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

export default function AfterLogin() {
    const navigate = useNavigate()

    
    useEffect(() => {
      const timer = setTimeout(() => {
      navigate("/login")
    }, 5000);
    
      return () => {
        clearTimeout(timer)
      }
    }, [navigate])
    


  return (
    <div style={{marginTop: "13rem"}}>
        <p style={{textAlign: "center", fontSize: "3rem"}}>Please verify your email</p>
    </div>
  )
}
