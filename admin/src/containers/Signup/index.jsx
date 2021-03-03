import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {Input} from "../../components/UI/Input";
import { login } from "../../utils/actions";
import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import {Redirect} from "react-router-dom";
import {signup} from "../../utils/actions/user";
export default function Signup() {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [firstName,setFirstName]= useState('')
    const [lastName,setLastName]= useState('')
    const [error,setError]= useState('')
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const userSignUp = (e) => {
        e.preventDefault();
        let user ={
            email,password,firstName,lastName
        }
        dispatch(signup(user))
    }
    if(auth.authenticate){
        return <Redirect to={`/`}/>
    }
    if(user.loading){
        return <p>>loading...!</p>
    }
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignUp} >
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        value={firstName}
                                        type="text"
                                        onChange={(e)=>setFirstName(e.target.value)}
                                        // errorMessage=" First Name is required!"
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        value={lastName}
                                        type="text"
                                        onChange={(e)=>setLastName(e.target.value)}
                                        // errorMessage=" First Name is required!"
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Email"
                                placeholder="Email"
                                value={email}
                                type="email"
                                onChange={(e)=>setEmail(e.target.value)}
                                // errorMessage=" First Name is required!"
                            />

                            <Input
                                label="Password"
                                placeholder="Password"
                                value={password}
                                type="password"
                                onChange={(e)=>setPassword(e.target.value)}
                                // errorMessage=" First Name is required!"
                            />
                            <Button variant="primary" type="submit" >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )
}
