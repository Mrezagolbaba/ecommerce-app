import {useEffect, useState} from "react";
import Layout from "../../components/Layout";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import {addCategory, getAllCategory} from "../../utils/actions";
import {Input} from "../../components/UI/Input";

const Category = (props) => {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryParentId, setCategoryParentId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');

    const category = useSelector ( state => state.category)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllCategory())
    },[])


    const handleClose = () => {
        const form = new FormData()
        form.append('name',categoryName)
        form.append('parentId',categoryParentId)
        form.append('categoryImg',categoryImage)
        dispatch(addCategory(form))
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const renderCategories = (categories) =>{
        const myCategories = []
        categories.map((i)=>{
            myCategories.push(
                <li key={i.name}>
                    {i.name}
                    {i.children.length > 0 ?(<ul>{renderCategories(i.children)}</ul>): null}
                </li>

            )
        })
        return myCategories

    }
    const createCategoryList = (categories,options=[])=>{
        categories.map((i)=>{
            options.push({value:i._id,name:i.name})
            if(i.children.length>0){
                createCategoryList(i.children,options)
            }

        })
        return options
    }
    const handleCategoryImage = (e) =>{
        setCategoryImage(e.target.files[0])
    }
    return (
        <Layout sidebar>
           <Container className='rtl'>
               <Row>
                   <Col md={12}>
                        <div className="title-page">
                            <Button variant="success" onClick={handleShow}>+</Button>
                            <h3>دسته بندی</h3>
                        </div>
                   </Col>
               </Row>
               <Row>
                   <Col md={12}>
                       <ul>
                           {category?.categories!==undefined && renderCategories(category.categories)}
                       </ul>
                   </Col>
               </Row>
           </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>اضافه کردن دسته بندی جدید</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={categoryName}
                        placeholder={'نام دسته بندی'}
                        onChange={(e)=>setCategoryName(e.target.value)}
                    />
                    <select
                        value={categoryParentId}
                        className='form-control'
                        onChange={(e)=>setCategoryParentId(e.target.value)}>
                        <option>انتخاب دسته بندی</option>
                        {category?.categories!==undefined &&
                            createCategoryList(category.categories).map(option=>
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        }
                    </select>
                    <input type='file' name='categoryImage' onChange={handleCategoryImage}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
};

export default Category;
