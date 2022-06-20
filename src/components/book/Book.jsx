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
const API = process.env.REACT_APP_API+'books';

export function Book() {
  const [books, setbooks] = useState([]);
  const [matters, setmatters] = useState([]);
  const [authors, setauthors] = useState([]);
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

  const [bookSelect, setbookSelect] = useState({
    id: "",
    name: "",
    description: "",
    amount: "",
    matter_id: "",
    author_id: "",
    number_of_pages: "",
    year_of_edition: "",
  });

  /* selecionar los Autores */
  const Selectbook = (element, caso) => {
    setbookSelect(element);
    caso === "editar" ? setModalEdit(true) : setModalDelete(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setbookSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clear = () => {
    bookSelect.id = "";
    bookSelect.name = "";
    bookSelect.description = "";
    bookSelect.amount = "";
    bookSelect.matter_id = "";
    bookSelect.number_of_pages = "";
    bookSelect.author_id = "";
    bookSelect.year_of_edition = "";
  };
  /* Crear Autores */
  const store = async (e) => {
    console.log(bookSelect);

    e.preventDefault();
    await axios.post(`${API}`, {
      name: bookSelect.name,
      description: bookSelect.description,
      amount: bookSelect.amount,
      matter_id: bookSelect.matter_id,
      number_of_pages: bookSelect.number_of_pages,
      author_id: bookSelect.author_id,
      year_of_edition: bookSelect.year_of_edition,
    });

    getAllbooks();
    clear();
    handleCloseCreate();
  };

  /* autualizar los datos */
  const update = async (e) => {
    e.preventDefault();
    console.log(bookSelect);
    await axios.put(`${API}/${bookSelect.id}`, {
      name: bookSelect.name,
      description: bookSelect.description,
      amount: bookSelect.amount,
      matter_id: bookSelect.matter_id,
      number_of_pages: bookSelect.number_of_pages,
      author_id: bookSelect.author_id,
      year_of_edition: bookSelect.year_of_edition,
    });
    getAllbooks();
    handleClose();
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getAllbooks();
  }, []);

  const getAllbooks = async () => {
    const response = await axios.get(`${API}`);
    setbooks(response.data.books);
    setmatters(response.data.matters);
    setauthors(response.data.authors);
  };

  const deletebook = async (id) => {
    await axios.delete(`${API}/${id}`);
    getAllbooks();
    handleCloseDelete();
  };
  return (
    <div className="" style={{ marginTop: "5rem" }}>
      <Card className="mb-2" border="primary">
        <Card.Header>
          <Row>
            <Col md={8}>
              <Card.Title>books</Card.Title>
            </Col>
            <Col md={{ span: 1, offset: 2 }}>
              <Button variant="secondary" onClick={handleShow}>
                Registrar
              </Button>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <Table size="sm" responsive hover>
            <thead>
              <tr>
                <th scope="col">name</th>
                <th colSpan="2" scope="col">
                  description
                </th>
                <th scope="col">year of edition</th>
                <th scope="col">amount</th>

                <th scope="col">number of pages</th>
                <th scope="col">author</th>
                <th scope="col">matter</th>
                <th colSpan="2" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <th scope="row">{book.name}</th>
                  <th colSpan="2" scope="row">
                    {book.description}
                  </th>
                  <td>{book.year_of_edition}</td>
                  <td>{book.amount}</td>
                  <td>{book.number_of_pages}</td>
                  <td>
                    {authors.map((author) =>
                      author.id === book.author_id ? author.name : null
                    )}
                  </td>
                  <td>
                    {matters.map((matter) =>
                      matter.id === book.matter_id ? matter.name : null
                    )}
                  </td>
                  <td colSpan="2">
                    {/* <Link to={`/edit/${book.id}`} className="btn btn-outline-success m-2">
                  Editar
                </Link> */}
                    <button
                      className="btn btn-outline-success m-2"
                      onClick={() => Selectbook(book, "editar")}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-outline-danger "
                      onClick={() => Selectbook(book, "eliminar")}
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
          <Modal.Title>Register book</Modal.Title>
        </Modal.Header>
        <Form onSubmit={store}>
          <Modal.Body>
            
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                required
                onChange={handleChange}
                name="name"
                value={bookSelect && bookSelect.name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control
                name="description"
                onChange={handleChange}
                autoFocus
                required
                value={bookSelect && bookSelect.description}
                as="textarea"
                rows={3}
              />
              <Form.Group className="mb-3" controlId="number_of_pages">
              <Form.Label>number_of_pages</Form.Label>
              <Form.Control
                type="text"
                pattern="[0-9]+"
                required
                maxLength={6}
                autoFocus
                onChange={handleChange}
                name="number_of_pages"
                value={bookSelect && bookSelect.number_of_pages}
              />
            </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>amount book</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  type="number"
                  name="amount"
                  required
                  onChange={handleChange}
                  autoFocus
                  value={bookSelect && bookSelect.amount}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="dob">
              <Form.Label>year of edition</Form.Label>
              <Form.Control
                type="date"
                name="year_of_edition"
                onChange={handleChange}
                required
                value={bookSelect && bookSelect.year_of_edition}
                placeholder="year of edition"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="matter_id">
              <Form.Label>matters</Form.Label>

              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                value={bookSelect && bookSelect.matter_id}
                name="matter_id"
              >
                <option  >
                    Selection in matter
                  </option>
                {matters.map((matter) => (
                  <option key={matter.id} value={matter.id}>
                    {matter.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="matter_id">
              <Form.Label>author</Form.Label>

              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                value={bookSelect && bookSelect.author_id}
                name="author_id"
              >
                <option  >
                Selection in author
                  </option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreate}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* modal Editar*/}

      <Modal backdrop="static" show={ModalEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar book</Modal.Title>
        </Modal.Header>
        <Form onSubmit={update}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={handleChange}
                name="name"
                value={bookSelect && bookSelect.name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>description</Form.Label>
              <Form.Control
                name="description"
                onChange={handleChange}
                autoFocus
                value={bookSelect && bookSelect.description}
                as="textarea"
                rows={3}
              />
              <Form.Group className="mb-3" controlId="number_of_pages">
              <Form.Label>number_of_pages</Form.Label>
              <Form.Control
                type="text"
                pattern="[0-9]+"
                required
                maxLength={6}
                autoFocus
                onChange={handleChange}
                name="number_of_pages"
                value={bookSelect && bookSelect.number_of_pages}
              />
            </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Label>amount Book</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  autoFocus
                  value={bookSelect && bookSelect.amount}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="dob">
              <Form.Label>year of edition</Form.Label>
              <Form.Control
                type="date"
                name="year_of_edition"
                onChange={handleChange}
                required
                value={bookSelect && bookSelect.year_of_edition}
                placeholder="year of edition"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="author_id">
              <Form.Label>Matters</Form.Label>

              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                value={bookSelect && bookSelect.matter_id}
                name="matter_id"
              >
                {matters.map((matter) => (
                  <option key={matter.id} value={matter.id}>
                    {matter.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="author_id">
              <Form.Label>author</Form.Label>

              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                value={bookSelect && bookSelect.author_id}
                name="author_id"
              >
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Actualizar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal Eliminar */}
      <Modal backdrop="static" show={ModalDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>delete book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Estas seguro que quieres eliminar El Autor: {bookSelect.name}{" "}
          {bookSelect.last_name}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => deletebook(bookSelect.id)}>
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
