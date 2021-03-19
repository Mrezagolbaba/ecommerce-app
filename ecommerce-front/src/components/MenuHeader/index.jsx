import './styles.css'
import {useSelector} from "react-redux";
export const MenuHeader = (Props) => {

    const category = useSelector(state => state.category)
    const renderCategories = (categories) => {
        const myCategories = []
        categories.map((i) => {
            myCategories.push(
                <li key={i.name}>
                    {i.name}
                    {i.children.length > 0 ? (<ul>{renderCategories(i.children)}</ul>) : null}
                </li>
            )
        })
        return myCategories

    }
    return (
        <div className='menuHeader'>
            MenuHeader
        </div>
    );
};