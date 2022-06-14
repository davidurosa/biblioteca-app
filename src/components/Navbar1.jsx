/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import LoginButton from "../Login";
import LogoutButton from "../Logout";
import Profile from "../Profile";

const Navbar1 = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="info" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Biblioteca
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Book
              </Nav.Link>
              <Nav.Link as={Link} to="/author">
                Author
              </Nav.Link>
              <NavDropdown
                menuVariant="dark"
                variant="pills"
                title="Books"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="author">
                  Author
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <>
                  <NavDropdown
                    menuVariant="dark"
                    title="Perfil"
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Header>
                      <Profile />
                    </NavDropdown.Header>
                    <NavDropdown.Divider />
                    <NavDropdown.Header>
                      <LogoutButton />
                    </NavDropdown.Header>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link eventKey={2} href="#memes">
                  <LoginButton />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Container className="pt-5" >
          <div style={{ marginTop: "5rem" }}>

          <Outlet ></Outlet>
          </div>
        </Container>
      </section>
      <footer>
        <Container>algo bonito</Container>
      </footer>
    </>
  );
};

export default Navbar1;
