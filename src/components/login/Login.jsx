import { useState } from "react"
import { fetchUser } from "./fetchUsers.js"

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [formState, setFormState] = useState({
    username: '',
    password: ''
  })
  const [user, setUser] = useState({})

  const handleChange = ({target: {name, value}}) => {
    setFormState({...formState, [name]: value})
  }

  const handleCkick = async(e) => {
    setLoading(true)
    e.preventDefault()
    try{
      const {data} = await fetchUser()
      setUser(data)
    }catch(error){
      console.log(error)
      setError(error)
    }
    setLoading(false)
  }
  //With fetch because axios threw me an error
  // const handleCkick = async(e) => {
  //   setLoading(true)
  //   e.preventDefault()
  //   try{
  //     await fetch(URL)
  //     .then((response)=> response.json())
  //     .then((data) => {setUser(data) })
  //     setLoading(false)
  //   }catch(error){
  //     console.log(error)
  //     setError(error)
  //   }
  // }

  return ( 
    <div>
      <span data-testid="text" className="user">{user.name}</span>
      <form >
        <input type="text" placeholder="Username" onChange={handleChange} name="username" value={formState.username}/>
        <input type="password" placeholder="Password" onChange={handleChange} name="password" value={formState.password}/>
        <button disabled={Boolean(!formState.username || !formState.password)} onClick={handleCkick}>{loading ? "Wait" : "Login"}</button>
        <span data-testid="error" style={{ visibility: error ? "visible" : "hidden" }}>Something went wrong</span>
      </form>
    </div>
  )
}

export default Login