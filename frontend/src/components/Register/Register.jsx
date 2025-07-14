import "./Register.css"
import {useState} from 'react'
import {useNavigate} from "react-router-dom"

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError]= useState('')
  const [message, setMessage] = useState('')


  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')



    const newUser = {
      email,
      password
    }

    const config = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }

    const response = await fetch("https://lotto-backend-pfhh.onrender.com/register/user", config)

    if (!response.ok) {
      const errorResult = await response.json();
      setError(errorResult.message || "Registration failed");
      return;
    }

    const result = await response.json()

    if (result.error) {
      setError(result.error) 
      return
    }

    setMessage(result.message)

    setTimeout(() => {
      navigate("/afterlogin")
    }, 3000);

  }




  return (
    <>
    <form onSubmit={submitHandler} className="register-form">
      <label>Email</label>
      <input type="email"
             name="email"
             onChange={(e)=> setEmail(e.target.value)} 
             />
      <label htmlFor="">Password</label>
      <input type="password" 
             name="password"
             onChange={(e)=> setPassword(e.target.value)} 
      />
      
      <button type="submit">Register</button>
      <h3>Already have an account? <a onClick={()=> {navigate("/login")}}>Log In</a></h3>
    </form>
    {error && <div className="message">{error}</div>}
    {message && <div className="message">{message}</div>}
    </>
  )
}
