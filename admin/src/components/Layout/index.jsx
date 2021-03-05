import Header from "../Header";
import {Col, Container, Row} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
export default function Layout(props) {
    return (
      <>
        <Header/>
          {props.sidebar?
              <Container fluid >
                  <Row >
                      <Col md={10} style={{marginLeft:'auto'}}>
                          {props.children}
                      </Col>
                      <Col md={2} className='sidebar'>
                          <div dir="RTL">
                              <ul style={{padding:'0'}}>
                                  <li><NavLink to='/'>خانه</NavLink></li>
                                  <li><NavLink to='/products'>محصولات</NavLink></li>
                                  <li><NavLink to='/orders'>سفارشات</NavLink></li>
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
