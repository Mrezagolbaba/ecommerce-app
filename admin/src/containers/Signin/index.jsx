import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {Input} from "../../components/UI/Input";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login,isUserLoggedIn} from "../../utils/actions";
import {Redirect} from "react-router-dom";

export default function Signin() {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [error,setError]= useState('')
    const auth = useSelector(state => state.auth)


    const dispatch = useDispatch()

    useEffect(()=>{
        if(!auth.authenticate){
            dispatch(isUserLoggedIn)
        }
    },[])

    const onLogin =(e)=>{
        e.preventDefault();
        let user ={
            email,password
        }
        dispatch(login(user))
    }
    if(auth.authenticate){
        return <Redirect to={`/`}/>
    }
    return (
        <Layout>
            <Container>
                <Row style={{marginTop:'50px'}}>
                    <Col md={{span:6, offset:3}}>
                        <Form onSubmit={onLogin}>
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
                            <Button variant="primary" type="submit">
                                Submit
                             </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )
}
