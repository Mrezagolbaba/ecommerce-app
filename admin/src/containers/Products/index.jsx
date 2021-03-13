import Layout from "../../components/Layout";
import {Col, Container, Row, Button, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, getAllCategory} from "../../utils/actions";
import {Input} from "../../components/UI/Input";
import {useState} from "react";
import Modal from "../../components/UI/Modal";
import './styles.css'
import {generatePublicUrl} from "../../urlConfig";

const Products = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPicture, setProductPicture] = useState([]);
    const [categoryParentId, setCategoryParentId] = useState('');
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const dispatch = useDispatch()
    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)
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

    const renderProduct = () => {
        return (
            <Table responsive variant='dark' striped className='table-product'>
                <thead>
                <tr>
                    <th>دسته بندی</th>
                    <th>تعداد</th>
                    <th>قیمت</th>
                    <th>نام</th>
                </tr>
                </thead>
                <tbody>
                {
                    product.products.length > 0 ?
                        product.products.map(product =>
                            <tr onClick={()=>showProductDetailsModal(product)}>
                                <td>{product.category?.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                <td>{product.name}</td>
                            </tr>
                        ) : null
                }
                </tbody>
            </Table>
        )
    }
    const renderAddProduct = () =>{
        return(
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
        )
    }
    const handleCloseProductDetailsModal = () =>{
        setShowProductDetails(false)
    }
     const showProductDetailsModal= (product) =>{
        setProductDetails(product)
        setShowProductDetails(true)
         console.log(product)
    }
    const renderProductDetailsModal = () => {
        if(!productDetails){
            return null
        }
        return(
            <Modal
                show={showProductDetails}
                handleClose={handleCloseProductDetailsModal}
                modalTitle='اطلاعات محصول'
                size='lg'
            >
                <div className='text-right'>
                    <Row>
                        <Col md={6}>
                            <label className='title-product'>قیمت </label>
                            <p>{productDetails.price}</p>
                        </Col>
                        <Col md={6}>
                            <label className='title-product'>نام محصول</label>
                            <p>{productDetails.name}</p>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={6}>
                            <label className='title-product'>تعداد </label>
                            <p>{productDetails.quantity}</p>
                        </Col>
                        <Col md={6}>
                            <label className='title-product'>دسته بندی </label>
                            <p>{productDetails.category?.name}</p>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={12}>
                            <label className='title-product'>توضیحات </label>
                            <p>{productDetails.description}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <label className='title-product'>تصاویر</label>
                            <div style={{display:'flex'}}>
                                {productDetails&&productDetails.productPictures.map((pic)=>{
                                    return(
                                        <div className='product-image'>
                                            <img src={generatePublicUrl(pic.img)}/>
                                        </div>
                                    )})}
                            </div>

                        </Col>
                    </Row>

                </div>
            </Modal>
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
            {renderAddProduct()}
            {renderProductDetailsModal()}
        </Layout>
    );
};

export default Products;
