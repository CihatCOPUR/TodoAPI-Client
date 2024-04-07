import React, { useState, useEffect } from "react";
import "./homePage.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const HomePage = () => {
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/todo");
        if (!response.ok) {
          throw new Error("Veri alınamadı");
        }
        const data = await response.json();
        console.log(data);
        setTodoData(data.data);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };

    fetchData();
  }, []); // Boş dependency array, sadece bileşenin monte edilmesinde bir kere çalışmasını sağlar.

  console.log(todoData);

  return (
    <center>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Todo</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Tabs
        style={{ width: "40%", display: "flex", justifyContent: "center" }}
        defaultActiveKey="todo"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="todo" title="todo" style={{ width: "40%" }}>
          <ul className="todoList" style={{paddingRight:'32px'}}>
          {todoData.map(todo => (
            <li key={todo.id} style={{width:'100%', listStyleType:'none', border:'1px solid black', borderRadius:'5px', marginTop:'5px', backgroundColor:'007F73', color:'4CCD99'}}>{todo.name}</li>
          ))}
        </ul>
        </Tab>
        <Tab eventKey="end" title="end">
          end
        </Tab>
      </Tabs>
    </center>
  );
};

export default HomePage;
