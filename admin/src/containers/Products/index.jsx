import Layout from "../../components/Layout";
import {Col, Container, Row, Button, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, getAllCategory} from "../../utils/actions";
import {Input} from "../../components/UI/Input";
import {useState} from "react";
import Modal from "../../components/UI/Modal";

const Products = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPicture, setProductPicture] = useState([]);
    const [categoryParentId, setCategoryParentId] = useState('');
    const dispatch = useDispatch()
    const category = useSelector(state => state.category)
    const handleClose = () => {
        console.log(quantity, productPicture)
        const form = new FormData()
        form.append('name', name)
        form.append('quantity', categoryParentId)
        form.append('price', price)
        form.append('description', description)
        form.append('category', categoryId)
        productPicture.map((pic) => {
            form.append('productPicture', pic)
        })
        dispatch(addProduct(form))
        setShow(false);
    }
    const handleProductImage = (e) => {
        setProductPicture([...productPicture, e.target.files[0]])
    }
    console.log(productPicture)

    const createCategoryList = (categories, options = []) => {
        categories.map((i) => {
            options.push({value: i._id, name: i.name})
            if (i.children.length > 0) {
                createCategoryList(i.children, options)
            }

        })
        return options
    }
    const handleShow = () => setShow(true);

    const renderProduct = () =>{
        return(
            <Table responsive variant='dark' striped>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Product Picture</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td >Table cell</td>
                </tr>
                <tr>
                    <td>2</td>

                        <td >Table cell</td>

                </tr>
                <tr>
                    <td>3</td>
                    <td >Table cell</td>
                </tr>
                </tbody>
            </Table>
        )
    }

    return (
        <Layout sidebar>
            <Container className='rtl'>
                <Row>
                    <Col md={12}>
                        <div className="title-page">
                            <Button size="sm" variant="outline-success" onClick={handleShow}> اضافه کردن محصول
                                جدید</Button>
                            <h3> محصولات</h3>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProduct()}
                    </Col>

                </Row>
            </Container>
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle='اضافه کردن دسته بندی جدید'
            >
                <Input
                    value={name}
                    placeholder={'نام محصول '}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    value={quantity}
                    placeholder={'تعداد محصول '}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    value={price}
                    placeholder={'قیمت محصول '}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    value={description}
                    placeholder={'توضیحات محصول '}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    value={categoryId}
                    className='form-control'
                    onChange={(e) => setCategoryId(e.target.value)}>
                    <option>انتخاب دسته بندی</option>
                    {category?.categories !== undefined &&
                    createCategoryList(category.categories).map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )
                    }
                </select>
                {productPicture.length > 0 ?
                    productPicture.map((i, index) =>
                        <div className="d-flex" key={index}>
                            {i.name}
                        </div>) : null
                }
                <input type='file' name='productPicture' onChange={handleProductImage}/>
            </Modal>
        </Layout>
    );
};

export default Products;
