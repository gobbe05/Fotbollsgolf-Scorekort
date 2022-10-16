import {FC} from 'react'
import {useEffect, useState} from 'react'
import {Form, Button, Card, Alert, Container} from 'react-bootstrap'
import {Link, Navigate} from 'react-router-dom'


import {
    browserLocalPersistence,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
  } from "firebase/auth"
  import {auth} from '../firebase'

const Login:FC = () => {
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

    const [user, setUser] = useState()

    const [error, setError] = useState("")
    const [tryLogin, setTryLogin] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser)
            setLoggedIn(true)
        })
    }, [tryLogin])

    const login = async () => {
        try {
            await setPersistence(auth, browserLocalPersistence)
            const user = await signInWithEmailAndPassword(auth, emailValue, passwordValue)
            setTryLogin(true)
        } catch(err: any) {
            console.error(err.message)
        }
    }

    return (
    <>
    {loggedIn ? <Navigate to={"/"}/> : <></>}
<Container className="d-flex align-items-center justify-content-center" style={ {minHeight: "100vh"} }>
          <div className="w-100" style={  {maxWidth: "400px"} }>
         
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                   
                    <Form onSubmit={(e:any) => {e.preventDefault()}}>
                        <Form.Group id="emai">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={(e: any) => {setEmailValue(e.target.value)}} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e: any) => {setPasswordValue(e.target.value)}} required/>
                        </Form.Group>
                        <Button className="w-100" onClick={login}>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to={'/signup'}>Sign up</Link>
            </div>
            </div>
        </Container>
    </>
    )
}

export default Login