import {useEffect, useState} from "react";
import Layout from "../../components/Layout";
import {Button, Col, Container, Row} from "react-bootstrap";
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import CheckboxTree from 'react-checkbox-tree';
import {addCategory, getAllCategory} from "../../utils/actions";
import {Input} from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import {IoIosCheckboxOutline,IoIosCheckbox,IoIosArrowForward,IoIosArrowDown } from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const Category = (props) => {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryParentId, setCategoryParentId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategory, setUpdateCategory] = useState(false);

    const category = useSelector(state => state.category)

    const dispatch = useDispatch()

    const handleClose = () => {
        const form = new FormData()
        form.append('name', categoryName)
        form.append('parentId', categoryParentId)
        form.append('categoryImg', categoryImage)
        dispatch(addCategory(form))
        setCategoryName('');
        setCategoryParentId('')
        setShow(false);
    }
    const handleUpdateCategory =()=> {
        setUpdateCategory(true)

    }
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        const myCategories = []
        categories.map((i) => {
            myCategories.push(
                    {
                        label:i.name,
                        value:i._id,
                        children:i.children.length > 0 &&renderCategories(i.children)
                    }
            )
        })
        return myCategories

    }
    const createCategoryList = (categories, options = []) => {
        categories.map((i) => {
            options.push({value: i._id, name: i.name})
            if (i.children.length > 0) {
                createCategoryList(i.children, options)
            }

        })
        return options
    }
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="title-page">
                            <h3>category</h3>

                            <Button size="sm" variant="outline-success" onClick={handleShow}> add new category</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked( checked )}
                            onExpand={expanded => setExpanded( expanded )}
                            icons={{
                                check: <IoIosCheckbox/>,
                                uncheck: <IoIosCheckboxOutline/>,
                                halfCheck: <IoIosCheckboxOutline/>,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown/>,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Button>Delete</Button>
                    <Button onClick={handleUpdateCategory}>Edit</Button>
                </Row>
            </Container>
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle='add new category'
            >
                <Input
                    value={categoryName}
                    placeholder={'category name'}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select
                    value={categoryParentId}
                    className='form-control'
                    onChange={(e) => setCategoryParentId(e.target.value)}>
                    <option> chose a category </option>
                    {category?.categories !== undefined &&
                    createCategoryList(category.categories).map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )
                    }
                </select>
                <input type='file' name='categoryImage' onChange={handleCategoryImage}/>
            </Modal>
            {/* Edit Categories */}
            <Modal
                show={updateCategory}
                handleClose={()=>setUpdateCategory(false)}
                modalTitle='add new category'
            >
                <Input
                    value={categoryName}
                    placeholder={'category name'}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select
                    value={categoryParentId}
                    className='form-control'
                    onChange={(e) => setCategoryParentId(e.target.value)}>
                    <option> chose a category </option>
                    {category?.categories !== undefined &&
                    createCategoryList(category.categories).map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )
                    }
                </select>
                <input type='file' name='categoryImage' onChange={handleCategoryImage}/>
            </Modal>
        </Layout>
    );
};

export default Category;
