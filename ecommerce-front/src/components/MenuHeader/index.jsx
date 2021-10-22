import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllCategory} from "src/utils/actions";
import './styles.css'

export const MenuHeader = (Props) => {

    const category = useSelector(state => state.category)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllCategory())
    },[])
    const renderCategories = (categories) => {
        const myCategories = []
        categories.map((i) => {
            myCategories.push(
                <li key={i.name}>
                    {
                        i.parentId?<a href={i.slug}>{i.name}</a>
                            :
                            <span>{i.name}</span>
                    }

                    {i.children.length > 0 ? (<ul>{renderCategories(i.children)}</ul>) : null}
                </li>
            )
        })
        return myCategories

    }
    return (
        <div className='menuHeader'>
            <ul>{category.categories?.length>0?renderCategories(category.categories):null}</ul>
        </div>
    );
};