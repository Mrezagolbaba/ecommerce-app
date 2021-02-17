import Layout from "../../components/Layout";
import { Jumbotron } from "react-bootstrap";

export default function Home() {
    return (
        <div>
            <Layout>
                <Jumbotron style={{margin:'5rem',background:'#fff'}} className="text-center">
                    <h1>Welcome to Admin Dashbpard</h1>
                </Jumbotron>
            </Layout>
        </div>
    )
}
