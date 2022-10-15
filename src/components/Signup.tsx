import {useEffect, useState} from 'react'
import {Form, Button, Card, Alert, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import {
    createUserWithEmailAndPassword,
    //signInWithEmailAndPassword,
    onAuthStateChanged,
    //signOut,
  } from "firebase/auth";
  import {auth} from '../firebase'
  import UploadUser from '../utils/upload'


export default function Signup() {
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [confirmPasswordValue, setConfirmPasswordValue] = useState()
    const [error, setError] = useState('')
    const [signUp, setSignUp] = useState(false)

    const [user, setUser]: any = useState({uid: "none"})
    
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser);
          });

          
    }, [signUp])

    const signup = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth,emailValue, passwordValue)
            UploadUser(emailValue, user.user.uid)
            setSignUp(true)
        } catch(err: any) {
            console.log(err.message)
        }
    }

    return (
        <>
<Container className="d-flex align-items-center justify-content-center" style={ {minHeight: "100vh"} }>
          <div className="w-100" style={  {maxWidth: "400px"} }>
            
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Signup</h2>
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
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" onChange={(e: any) => {setConfirmPasswordValue(e.target.value)}} required/>
                        </Form.Group>
                        <Button className="w-100" onClick={signup}>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to={'/login'}>Log in</Link>
            </div>
            </div>
        </Container>
        </>
    )
}