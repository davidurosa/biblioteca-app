import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Card, Button, Col, Row, Modal, Form } from "react-bootstrap";
const endpoin = "http://biblioteca.test/api/";

export function Author() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [authors, setAuthors] = useState([]);
  const [ModalEdit, setModalEdit] = useState(false);
  const [ModalDelete, setModalDelete] = useState(false);
  const [ModalCreate, setModalCreate] = useState(false);

  const handleCloseDelete = () => setModalDelete(false);

  const handleClose = () => setModalEdit(false);

  const handleShow = () => setModalCreate(true);
  const handleCloseCreate = () => setModalCreate(false);


  const [authorSelect, setAuthorSelect] = useState({
    id: "",
    name: "",
    last_name: "",
  });

  /* selecionar los Autores */
  const SelectAuthor = (element, caso) => {
    setAuthorSelect(element);
    caso === "editar" ? setModalEdit(true) : setModalDelete(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthorSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(authorSelect);
  };

  const clear = ()=>{

    authorSelect.id= "";
    authorSelect.name="";
    authorSelect.last_name= "";
  }
  /* Crear Autores */
  const store = async () => {
    await axios.post(`${endpoin}authors`, {
      name: authorSelect.name,
      last_name: authorSelect.last_name,
    });
    getAllAuthors();
    clear();
    handleCloseCreate();

  };

  /* autualizar los datos */
  const update = async () => {
    await axios.put(`${endpoin}authors/${authorSelect.id}`, {
      name: authorSelect.name,
      last_name: authorSelect.last_name,
    });
    getAllAuthors();
    handleClose();
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getAllAuthors();
  }, []);

  const getAllAuthors = async () => {
    const response = await axios.get(`${endpoin}authors`);
    setAuthors(response.data);
  };

  const deleteAuthor = async (id) => {
    await axios.delete(`${endpoin}authors/${id}`);
    getAllAuthors();
    handleCloseDelete();
  };
  return (
    <div className="" style={{ marginTop: "5rem" }}>
      <Card
        bg="dark"
        style={{ width: "70rem" }}
        className="mb-2"
        border="primary"
      >
        <Card.Header>
          <Row>
            <Col md={8}>
              <Card.Title>Authors</Card.Title>
            </Col>
            <Col md={{ span: 1, offset: 2 }}>
              <Button onClick={handleShow}>Registrar</Button>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th scope="col">name</th>
                <th scope="col">last name</th>
                <th scope="col">action</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id}>
                  <th scope="row">{author.name}</th>
                  <td>{author.last_name}</td>
                  <td colSpan="2">
                    {/* <Link to={`/edit/${author.id}`} className="btn btn-outline-success m-2">
                  Editar
                </Link> */}
                    <button
                      className="btn btn-outline-success m-2"
                      onClick={() => SelectAuthor(author, "editar")}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-outline-danger "
                      onClick={() => SelectAuthor(author, "eliminar")}
                    >
                      eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal Crear */}

      <Modal backdrop="static" show={ModalCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Register Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                onChange={handleChange}
                name="name"
                value={authorSelect && authorSelect.name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="last Name"
                name="last_name"
                onChange={handleChange}
                autoFocus
                value={authorSelect && authorSelect.last_name}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Close
          </Button>
          <Button variant="primary" onClick={() => store()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal Editar*/}

      <Modal backdrop="static" show={ModalEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                onChange={handleChange}
                name="name"
                value={authorSelect && authorSelect.name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="last Name"
                name="last_name"
                onChange={handleChange}
                autoFocus
                value={authorSelect && authorSelect.last_name}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => update()}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Eliminar */}
      <Modal backdrop="static" show={ModalDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>delete Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Estas seguro que quieres eliminar El Autor: {authorSelect.name}{" "}
          {authorSelect.last_name}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => deleteAuthor(authorSelect.id)}
          >
            Yes
          </Button>
          <Button variant="danger" onClick={() => handleCloseDelete()}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
