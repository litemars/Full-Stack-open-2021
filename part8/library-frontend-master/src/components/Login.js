import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries/query'
import React, { useState, useEffect } from 'react'

const Login = ({setToken,show}) =>{
    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('token', token)
        }
      }, [result.data]) // eslint-disable-line
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')




    
    console.log("show",show)
    if (!show) {
        
        return null
    }



    const submit = async (event) => {
        event.preventDefault()
        console.log("submit")
        login({ variables: { username, password } })

        setUsername('')
        setPassword('')
    
    }

    return (
        <>
            <h2>LOGIN</h2>
            <form onSubmit={submit}>
            <div>
                username
                <input
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
            </form>

        </>

    )

}
export default Login