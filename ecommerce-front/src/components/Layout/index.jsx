import {Header} from "../Header";
import {MenuHeader} from "../../components/MenuHeader";

function Layout(props) {
    return (
        <>
            <Header/>
            <MenuHeader/>
            {props.children}
        </>
    );
}

export default Layout;