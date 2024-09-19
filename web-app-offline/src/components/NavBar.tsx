import { Nav } from "react-bootstrap";

export default function NavBar() {
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/tasks">Tasks</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
