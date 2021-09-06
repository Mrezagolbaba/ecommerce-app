import Header from "../Header";
import {Col, Container, Row} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import './styles.css'
export default function Layout(props) {
    return (
      <>
        <Header/>
          {props.sidebar?
              <Container fluid >
                  <Row >
                      <Col md={10} style={{marginLeft:'auto',paddingTop:'60px'}}>
                          {props.children}
                      </Col>
                      <Col md={2} className='sidebar'>
                          <div>
                              <ul>
                                  <li><NavLink to='/'>Home</NavLink></li>
                                  <li><NavLink to='/products'>Products</NavLink></li>
                                  <li><NavLink to='/category'> Category</NavLink></li>
                                  <li><NavLink to='/orders'>Orders</NavLink></li>
                              </ul>
                          </div>
                      </Col>
                  </Row>
              </Container>
              :
              props.children
          }

      </>
    )
}
