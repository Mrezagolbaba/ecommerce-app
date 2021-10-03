import {Header} from "src/components/Header";
import {MenuHeader} from "src/components/MenuHeader";

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