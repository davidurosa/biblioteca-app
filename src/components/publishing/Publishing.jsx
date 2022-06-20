import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Card, Button, Col, Row, Modal, Form } from "react-bootstrap";
const API = process.env.REACT_APP_API+'publishings';

export function Publishing() {
  const [Publishings, setPublishings] = useState([]);
  const [ModalEdit, setModalEdit] = useState(false);
  const [ModalDelete, setModalDelete] = useState(false);
  const [ModalCreate, setModalCreate] = useState(false);

  const handleCloseDelete = () => setModalDelete(false);

  const handleClose = () => {
    setModalEdit(false);
  };

  const handleShow = () => {
    setModalCreate(true);
  };
  const handleCloseCreate = () => setModalCreate(false);

  const [PublishingSelect, setPublishingSelect] = useState({
    id: "",
    name: "",
  });

  /* selecionar los Autores */
  const SelectPublishing = (element, caso) => {
    setPublishingSelect(element);
    caso === "editar" ? setModalEdit(true) : setModalDelete(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublishingSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clear = () => {
    PublishingSelect.id = "";
    PublishingSelect.name = "";
  };
  /* Crear Autores */
  const store = async () => {
    await axios.post(`${API}`, {
      name: PublishingSelect.name,
    });
    getAllPublishings();
    clear();
    handleCloseCreate();
  };

  /* autualizar los datos */
  const update = async () => {
    await axios.put(`${API}/${PublishingSelect.id}`, {
      name: PublishingSelect.name,
    });
    getAllPublishings();
    handleClose();
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getAllPublishings();
  }, []);

  const getAllPublishings = async () => {
    const response = await axios.get(`${API}`);
    setPublishings(response.data);
  };

  const deletePublishing = async (id) => {
    await axios.delete(`${API}/${id}`);
    getAllPublishings();
    handleCloseDelete();
  };
  return (
    <div className="" style={{ marginTop: "5rem" }}>
    <Card
      className="mb-2"
    >
      <Card.Header>
        <Row>
          <Col md={8}>
            <Card.Title>Publishings</Card.Title>
          </Col>
          <Col md={{ span: 1, offset: 2 }}>
          <Button variant="secondary" onClick={handleShow}>Registrar</Button>
          </Col>
        </Row>
      </Card.Header>

      <Card.Body>
        <Table responsive  hover >
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {Publishings.map((publishing) => (
              <tr key={publishing.id}>
                <th scope="row">{publishing.name}</th>
                <td colSpan="2">
                  {/* <Link to={`/edit/${Publishing.id}`} className="btn btn-outline-success m-2">
                Editar
              </Link> */}
                  <button
                    className="btn btn-outline-success m-2"
                    onClick={() => SelectPublishing(publishing, "editar")}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-outline-danger "
                    onClick={() => SelectPublishing(publishing, "eliminar")}
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
        <Modal.Title>Register Publishing</Modal.Title>
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
              value={PublishingSelect && PublishingSelect.name}
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
        <Modal.Title>Editar Publishing</Modal.Title>
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
              value={PublishingSelect && PublishingSelect.name}
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
        <Modal.Title>delete Publishing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Estas seguro que quieres eliminar El Autor: {PublishingSelect.name}{" "}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => deletePublishing(PublishingSelect.id)}
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
