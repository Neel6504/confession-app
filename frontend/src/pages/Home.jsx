import React from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, Image } from "react-bootstrap";
import "../styles/Home.css"; // Corrected path for Home.css

const Home = () => {
  const confessions = [
    {
      username: "mysteriourme",
      confession: "I always say 'on my way' when I'm still getting dressed.",
      avatar: "https://i.pravatar.cc/50?img=1",
    },
    {
      username: "truesoul1602",
      confession: "Sometimes I fake bad internet on Zoom just to leave a meeting.",
      avatar: "https://i.pravatar.cc/50?img=2",
    },
    {
      username: "Fightergirlme",
      confession: "My reflection blinked at me—when I didn’t.",
      avatar: "https://i.pravatar.cc/50?img=3",
    },
  ];

  return (
    <div className="homepage">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand href="#" className="logo">Inchogchat</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#">Chat</Nav.Link>
          <Nav.Link href="#">Confess</Nav.Link>
          <Nav.Link href="#">About us</Nav.Link>
          <Image src="https://i.pravatar.cc/40" roundedCircle className="profile-pic" />
        </Nav>
      </Navbar>

      {/* Confessions Section */}
      <Container className="mt-4">
        {confessions.map((confession, index) => (
          <Row key={index} className="justify-content-center">
            <Col md={8}>
              <Card className="confession-card">
                <Card.Body>
                  <Row>
                    <Col xs={2}>
                      <Image src={confession.avatar} roundedCircle className="avatar" />
                    </Col>
                    <Col xs={10}>
                      <h5 className="username">{confession.username}</h5>
                      <p className="confession-text">"{confession.confession}"</p>
                    </Col>
                  </Row>
                  <div className="icons">
                    <Button variant="link" className="icon-btn">💬</Button>
                    <Button variant="link" className="icon-btn">❤️</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Home;
