import React from 'react';
import { Button, Navbar , Nav, Form , FormControl } from "react-bootstrap";

function NLogNavBar(){
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
  <Navbar.Brand href="#">Min Shopping</Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav
      className="mr-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
      <Nav.Link href="#action1">Sign in</Nav.Link>
      <Nav.Link href="#">Sign Up</Nav.Link>
    </Nav>
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
		
	)
}

export default NLogNavBar;