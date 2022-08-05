import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import { listProducts, addProduct } from "../redux/actions/product";
import ReactLoading from "react-loading";

const Home = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [productname, setProductname] = useState("");
  const [vat, setVat] = useState("");
  const [quantity, setQuantity] = useState("");
  const [netprice, setNetprice] = useState("");
  const [grossprice, setGrossprice] = useState("");

  const handleClose = () => {
    setProductname("");
    setGrossprice("");
    setNetprice("");
    setQuantity("");
    setVat("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productAdd = useSelector((state) => state.productAdd);
  const { loading: loadingAdd, product, error: errorAdd } = productAdd;

  const deleteHandler = () => {
    setProductname("");
    setGrossprice("");
    setNetprice("");
    setQuantity("");
    setVat("");
    setShow(false);
  };

  const saveHandler = () => {
    dispatch(addProduct(productname, vat, quantity, netprice, grossprice));
    setShow(false);
  };

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    if (
      vat.length > 0 &&
      productname.length > 0 &&
      quantity.length > 0 &&
      grossprice.length > 0
    ) {
      let vatValue = parseFloat(vat.split("%")[0] / 100);
      console.log("vat", vatValue);
      let grossValue = parseFloat(grossprice);
      console.log("gross", grossValue);
      let netValue = grossValue - grossValue * vatValue;
      console.log("netvalue", netValue);
      setNetprice(netValue);
    }
  }, [vat, productname, quantity, grossprice]);

  useEffect(() => {
    if (product) {
      console.log('hbshHVSHvshgvshgvdhgdvghdvhvdahdvdv');
      setProductname("");
      setGrossprice("");
      setNetprice("");
      setQuantity("");
      setVat("");
    }
  }, [product]);

  return (
    <>
      <Header />
      {loading && (
        <ReactLoading
          className="m-auto"
          type="spin"
          color="black"
          height={"10%"}
          width={"10%"}
        />
      )}
            {loadingAdd && (
        <ReactLoading
          className="m-auto"
          type="spin"
          color="black"
          height={"10%"}
          width={"10%"}
        />
      )}
      {error && <h4 className="text-danger">SOMETHING WENT WRONG !</h4>}
      {errorAdd && <h4 className="text-danger">SOMETHING WENT WRONG !</h4>}

      <Container fluid className="my-2 py-2">
        <Button
          variant="info"
          className="mb-2 cursor-pointer"
          onClick={handleShow}
        >
          <i className="fa-solid fa-plus"></i> ADD
        </Button>
        <Table hover bordered>
          <thead className="bg-dark text-light my-2 py">
            <tr>
              <th>Product Name</th>
              <th>Price per Qty (Gross)</th>
              <th>VAT</th>
              <th>Price per Qty (net)</th>
              <th>Total Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          {products.length > 0 &&
            products.map((prod) => (
              <tbody className="text-left" key={prod?._id}>
                <tr>
                  <td>{prod?.productname}</td>
                  <td>$ {prod?.grossprice}</td>
                  <td>{prod?.vat} %</td>
                  <td>$ {prod?.netprice}</td>
                  <td>{prod?.quantity}</td>
                  <td>
                    <i className=" text-danger fa-solid fa-pen-to-square"></i>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Products</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-2">
                <Col lg={4} md={4}>
                  <Form.Label className="me-4">Product Name</Form.Label>
                </Col>
                <Col lg={8} md={8}>
                  <Form.Control
                    type="text"
                    value={productname}
                    name="productname"
                    onChange={(e) => setProductname(e.target.value)}
                    autoFocus
                    autoComplete="off"
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg={4} md={4}>
                  <Form.Label className="me-4">Price(gross)</Form.Label>
                </Col>
                <Col lg={8} md={8}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="text-secondary">
                      $
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      value={grossprice}
                      name="grossprice"
                      autoComplete="off"
                      onChange={(e) => setGrossprice(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg={4} md={4}>
                  <Form.Label className="me-4">Vat</Form.Label>
                </Col>
                <Col lg={8} md={8}>
                  <Form.Select
                    size="md"
                    value={vat}
                    onChange={(e) => setVat(e.target.value)}
                  >
                    <option>10%</option>
                    <option>15%</option>
                    <option>25%</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg={4} md={4}>
                  <Form.Label className="me-4">Quantity</Form.Label>
                </Col>
                <Col lg={8} md={8}>
                  <Form.Control
                    type="number"
                    value={quantity}
                    name="quantity"
                    autoComplete="off"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="mb-2">
                <Col lg={4} md={4}>
                  <Form.Label className="me-4">Price(net)</Form.Label>
                </Col>
                <Col lg={8} md={8}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="text-secondary">
                      $
                    </InputGroup.Text>
                    <Form.Control
                      readOnly
                      type="number"
                      value={netprice}
                      name="netprice"
                      autoComplete="off"
                      onChange={(e) => setNetprice(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" type="button" onClick={deleteHandler}>
              <i className="fa-solid fa-trash me-2 cursor-pointer"></i>Delete
            </Button>
            <Button variant="info" type="button" onClick={saveHandler}>
              <i className="fa-solid fa-floppy-disk me-2 cursor-pointer"></i>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Home;
