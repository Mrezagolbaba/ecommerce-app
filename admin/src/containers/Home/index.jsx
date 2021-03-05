import Layout from "../../components/Layout";
import './style.css'
import {Jumbotron} from "react-bootstrap";
export default function Home() {
    return (
        <div>
            <Layout sidebar>
                <Jumbotron style={{margin:'5rem',background:'#fff'}} className="text-center">
                    <h1>Welcome to Admin Dashbpard</h1>
                </Jumbotron>
            </Layout>
        </div>
    )
}
