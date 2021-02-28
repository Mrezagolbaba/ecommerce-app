import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {Input} from "../../components/UI/Input";
import { login } from "../../utils/actions";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
export default function Signup() {

    const dispatch = useDispatch()

    const onLogin =(e)=>{
        e.preventDefault();
        let user ={
            email:'a@a.com',
            password:'2222'
        }
        dispatch(login(user))
    }
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
                            <Button variant="primary" type="button" onClick={onLogin}>
                                Submit
                             </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )
}
