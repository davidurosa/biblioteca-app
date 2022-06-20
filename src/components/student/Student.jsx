import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  Card,
  Button,
  Col,
  Row,
  Modal,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
const API = process.env.REACT_APP_API+'students';

export function Student() {
  const [students, setstudents] = useState([]);
  const [careers, setcareers] = useState([]);
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

  const [studentSelect, setstudentSelect] = useState({
    id: "",
    name: "",
    last_name: "",
    address: "",
    phone_number: "",
    career_id: "",
    code: "",
  });

  /* selecionar los Autores */
  const Selectstudent = (element, caso) => {
    setstudentSelect(element);
    caso === "editar" ? setModalEdit(true) : setModalDelete(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstudentSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clear = () => {
    studentSelect.id = "";
    studentSelect.name = "";
    studentSelect.last_name = "";
    studentSelect.address = "";
    studentSelect.phone_number = "";
    studentSelect.career_id = "";
    studentSelect.code = "";
  };
  /* Crear Autores */
  const store = async (e) => {
    e.preventDefault();
    await axios.post(`${API}`, {
      name: studentSelect.name,
      last_name: studentSelect.last_name,
      address: studentSelect.address,
      phone_number: studentSelect.phone_number,
      career_id: studentSelect.career_id,
      code: studentSelect.code,
    });

    getAllstudents();
    clear();
    handleCloseCreate();
  };

  /* autualizar los datos */
  const update = async () => {
    console.log(studentSelect)
    await axios.put(`${API}/${studentSelect.id}`, {
      name: studentSelect.name,
      last_name: studentSelect.last_name,
      address: studentSelect.address,
      phone_number: studentSelect.phone_number,
      career_id: studentSelect.career_id,
      code: studentSelect.code,
    });
    getAllstudents();
    handleClose();
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getAllstudents();
  }, []);

  const getAllstudents = async () => {
    const response = await axios.get(`${API}`);
    setstudents(response.data.students);
    setcareers(response.data.careers);
  };

  const deletestudent = async (id) => {
    await axios.delete(`${API}/${id}`);
    getAllstudents();
    handleCloseDelete();
  };
  return (
    <div className="" style={{ marginTop: "5rem" }}>
      <Card
        className="mb-2"
        border="success"
      >
        <Card.Header>
          <Row>
            <Col md={8}>
              <Card.Title>students</Card.Title>
            </Col>
            <Col md={{ span: 1, offset: 2 }}>
            <Button variant="secondary" onClick={handleShow}>Registrar</Button>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <Table responsive size="sm"   hover>
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">name</th>
                <th scope="col">last name</th>
                <th colSpan="2" scope="col">
                  address
                </th>
                <th scope="col">Phone Number</th>
                <th scope="col">Carrera</th>

                <th scope="col">action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <th scope="row">{student.code}</th>
                  <th scope="row">{student.name}</th>
                  <td>{student.last_name}</td>
                  <td colSpan="2">{student.address}</td>
                  <td>{student.phone_number}</td>
                  <td>
                    {careers.map((career) =>
                      career.id === student.career_id ? career.name : null
                    )}
                  </td>
                  <td colSpan="2">
                    {/* <Link to={`/edit/${student.id}`} className="btn btn-outline-success m-2">
                  Editar
                </Link> */}
                    <button
                      className="btn btn-outline-success m-2"
                      onClick={() => Selectstudent(student, "editar")}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-outline-danger "
                      onClick={() => Selectstudent(student, "eliminar")}
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
          <Modal.Title>Register student</Modal.Title>
        </Modal.Header>
        <Form onSubmit={store}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="code">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                pattern="[0-9]+"
                required
                maxLength={6}
                autoFocus
                onChange={handleChange}
                name="code"
                value={studentSelect && studentSelect.code}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                required
                onChange={handleChange}
                name="name"
                value={studentSelect && studentSelect.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="last_name">
              <Form.Label>last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                required
                onChange={handleChange}
                autoFocus
                value={studentSelect && studentSelect.last_name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>address</Form.Label>
              <Form.Control
                name="address"
                onChange={handleChange}
                autoFocus
                required
                value={studentSelect && studentSelect.address}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone_number">
              <Form.Label>Phone Number</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>+58</InputGroup.Text>
                <FormControl
                  type="number"
                  name="phone_number"
                  required
                  onChange={handleChange}
                  autoFocus
                  value={studentSelect && studentSelect.phone_number}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="career_id"
            >
              <Form.Label>Careers</Form.Label>

              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                value={studentSelect && studentSelect.career_id}
                name="career_id"
              >
                <option  >
                    Select in career
                  </option>
                
                {careers.map((career) => (
                  <option key={career.id} value={career.id}>
                    {career.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreate}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* modal Editar*/}

      <Modal backdrop="static" show={ModalEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={handleChange}
                name="name"
                value={studentSelect && studentSelect.name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                onChange={handleChange}
                autoFocus
                value={studentSelect && studentSelect.last_name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>address</Form.Label>
              <Form.Control
                name="address"
                onChange={handleChange}
                autoFocus
                value={studentSelect && studentSelect.address}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>+58</InputGroup.Text>
                <FormControl
                  type="number"
                  name="phone_number"
                  onChange={handleChange}
                  autoFocus
                  value={studentSelect && studentSelect.phone_number}
                />
              </InputGroup>
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              onChange={handleChange}
              value={studentSelect && studentSelect.career_id}
              name="career_id"
            >
              {careers.map((career) => (
                <option key={career.id} value={career.id}>
                  {career.name}
                </option>
              ))}
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={() => update()}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Eliminar */}
      <Modal backdrop="static" show={ModalDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>delete student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Estas seguro que quieres eliminar El Autor: {studentSelect.name}{" "}
          {studentSelect.last_name}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => deletestudent(studentSelect.id)}
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
