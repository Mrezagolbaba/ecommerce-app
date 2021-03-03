import Layout from "../../components/Layout";
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import './style.css'
export default function Home() {
    return (
        <div>
            <Layout>
                <Container fluid >
                    <Row >
                        <Col md={10} style={{marginLeft:'auto'}}>
                            container
                        </Col>
                        <Col md={2} className='sidebar'>
                            side bar
                        </Col>
                    </Row>
                </Container>

                {/*<Jumbotron style={{margin:'5rem',background:'#fff'}} className="text-center">*/}
                {/*    <h1>Welcome to Admin Dashbpard</h1>*/}
                {/*</Jumbotron>*/}
            </Layout>
        </div>
    )
}
