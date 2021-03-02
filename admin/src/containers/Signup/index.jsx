import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {Input} from "../../components/UI/Input";
import { login } from "../../utils/actions";
import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import {Redirect} from "react-router-dom";
export default function Signup() {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form >
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        value=""
                                        type="text"
                                        onChange={()=>{}}
                                        // errorMessage=" First Name is required!"
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        value=""
                                        type="text"
                                        onChange={()=>{}}
                                        // errorMessage=" First Name is required!"
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Email"
                                placeholder="Email"
                                value=""
                                type="email"
                                onChange={()=>{}}
                                // errorMessage=" First Name is required!"
                            />

                            <Input
                                label="Password"
                                placeholder="Password"
                                value=""
                                type="password"
                                onChange={()=>{}}
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
