import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import CheckboxTree from "react-checkbox-tree";
import {
  addCategory,
  getAllCategory,
  updateCategories,
} from "../../utils/actions";
import { Input } from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const Category = (props) => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryParentId, setCategoryParentId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategory, setUpdateCategory] = useState(false);

  const category = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", categoryParentId);
    form.append("categoryImg", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setCategoryParentId("");
    setShow(false);
  };
  const handleUpdateCategory = () => {
    setUpdateCategory(true);
    const categories = createCategoryList(category.categories);
    const checkedData = [];
    const expandedData = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedData.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedData.push(category);
      });
    setCheckedArray(checkedData);
    setExpandedArray(expandedData);
    console.log({ checked, expanded, categories, expandedData, checkedData });
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    const myCategories = [];
    if (categories) {
      categories.map((i) => {
        myCategories.push({
          label: i.name,
          value: i._id,
          children: i.children.length > 0 && renderCategories(i.children),
        });
      });
    }

    return myCategories;
  };
  const createCategoryList = (categories, options = []) => {
    categories.map((i) => {
      options.push({ value: i._id, name: i.name, parentId: i.parentId });
      if (i.children.length > 0) {
        createCategoryList(i.children, options);
      }
    });
    return options;
  };
  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedExpandedArray);
    }
  };
  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("type", item.type);
      form.append("parentId", item.parentId ? item.parentId : " ");
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("type", item.type);
      form.append("parentId", item.parentId ? item.parentId : " ");
    });
    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });
    setUpdateCategory(false);
  };
  const renderCategoriesUpdateModal = () => {
    return (
      <Modal
        show={updateCategory}
        modalTitle="update category"
        handleClose={updateCategoriesForm}
        size="lg"
      >
        <Row>
          <Col>
            <h6>Expanded Categories</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={"category name"}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  value={item.parentId}
                  className="form-control"
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option> chose a category </option>
                  {category?.categories !== undefined &&
                    createCategoryList(category.categories).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                </select>
              </Col>
              <Col>
                <select
                  value={categoryParentId}
                  className="form-control"
                  onChange={(e) => setCategoryParentId(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="store"> Store </option>
                  <option value="product"> Product </option>
                  <option value="page"> page</option>
                </select>
              </Col>
            </Row>
          ))}
        <Row>
          <Col>
            <h6>Checked Categories</h6>
          </Col>
        </Row>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={"category name"}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  value={item.parentId}
                  className="form-control"
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option> chose a category </option>
                  {category?.categories !== undefined &&
                    createCategoryList(category.categories).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                </select>
              </Col>
              <Col>
                <select
                  value={categoryParentId}
                  className="form-control"
                  onChange={(e) => setCategoryParentId(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="store"> Store </option>
                  <option value="product"> Product </option>
                  <option value="page"> page</option>
                </select>
              </Col>
            </Row>
          ))}

        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </Modal>
    );
  };
  const renderDeleteCategoryModal = () => {
    return (
      <Modal
        show={showDelete}
        handleClose={() => setShowDelete(false)}
        modalTitle="Confirm"
      >
        Are you sure!
      </Modal>
    );
  };
  const renderCategoriesAddModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle="add new category"
      >
        <Input
          value={categoryName}
          placeholder={"category name"}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          value={categoryParentId}
          className="form-control"
          onChange={(e) => setCategoryParentId(e.target.value)}
        >
          <option> chose a category </option>
          {category?.categories !== undefined &&
            createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
        </select>
        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className="title-page">
              <h3>category</h3>

              <Button size="sm" variant="outline-success" onClick={handleShow}>
                {" "}
                add new category
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Button>Delete</Button>
          <Button onClick={handleUpdateCategory}>Edit</Button>
        </Row>
      </Container>
      {/* Add new Categories */}
      {renderCategoriesAddModal()}
      {/* Edit Categories */}
      {renderCategoriesUpdateModal()}
      {/*Delete Categories*/}
      {renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
