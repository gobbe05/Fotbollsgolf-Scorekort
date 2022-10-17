import {FC} from 'react'
import {useEffect, useState} from 'react'
import {Form, Button, Card, Alert, Container} from 'react-bootstrap'
import {Link, Navigate} from 'react-router-dom'

import '../../styles/login.scss'

import {
    browserLocalPersistence,
    onAuthStateChanged,
    setPersistence,
    signInAnonymously,
    signInWithEmailAndPassword,
  } from "firebase/auth"
  import {auth} from '../firebase'
    import upload from '../utils/upload'

const Login:FC = () => {
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

    const [user, setUser] = useState()

    const [error, setError] = useState("")
    const [tryLogin, setTryLogin] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [anonLogin, setAnonLogin] = useState(false)
    
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {
            console.log()
            if(currentUser == undefined) {

            }else if(currentUser.providerData.length == 0) {
                upload("", currentUser.uid)
            }else {
                setUser(currentUser)
                setLoggedIn(true)
            }
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
    const loginAnon = async () => {
        try {
            await setPersistence(auth, browserLocalPersistence)
            await signInAnonymously(auth)
            await setAnonLogin(true)
        } catch (err: any) {
            console.error(err.message)
        }
    }

    return (
    <>
    {loggedIn || anonLogin ? <Navigate to={"/"}/> : <></>}
<Container className="d-flex align-items-center justify-content-center" style={ {minHeight: "100vh"} }>
          <div className="w-100" style={  {maxWidth: "400px"} }>
         
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Logga in</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                   
                    <Form onSubmit={(e:any) => {e.preventDefault()}}>
                        <Form.Group id="emai">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={(e: any) => {setEmailValue(e.target.value)}} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Lösenord</Form.Label>
                            <Form.Control type="password" onChange={(e: any) => {setPasswordValue(e.target.value)}} required/>
                        </Form.Group>
                        <Button className="w-100 mt-2 submitbutton" onClick={login}>Logga in</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Har du inte ett konto? <Link to={'/signup'}>Skapa ett konto</Link>
            </div>
            <div className={"loginguest"}>
                <p onClick={loginAnon}>Logga in som <b >Gäst</b></p>
            </div>
            </div>
        </Container>
    </>
    )
}

export default Login