// components/HomePage.js
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import TodoList from "../components/TodoList";
import './homePage.css'
const HomePage = () => {
  const [todoData, setTodoData] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  //Fetch data from  API
  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/todo");
      if (!response.ok) {
        throw new Error("Veri alınamadı");
      }
      const data = await response.json();
      setTodoData(data.data);
    } catch (error) {
      console.error("Veri alınamadı:", error);
    }
  };
//POST Todo
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: todoInput,
          description: descriptionInput,
        }),
      });
      if (!response.ok) {
        throw new Error("Todo eklenemedi");
      }
      setTodoInput("");
      setDescriptionInput("");
      fetchData();
    } catch (error) {
      console.error("Todo eklenemedi:", error);
    }
  };


  // DELETE Todo 
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todo/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Todo silinemedi");
      }
      fetchData();
    } catch (error) {
      console.error("Todo silinemedi:", error);
    }
  };


  // Complete Todo ---Put

  const handleComplete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      });
      if (!response.ok) {
        throw new Error("Todo tamamlanamadı");
      }
      fetchData();
    } catch (error) {
      console.error("Tamamlama işlemi başarısız oldu:", error);
    }
  };

  return (
    <center>
      <Form onSubmit={handleSubmit} style={{width:'60%'}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Todo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Tabs
        style={{
          width: "40%",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
        defaultActiveKey="todo"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="todo" title="todo" style={{ width: "40%" }}>
          <TodoList
            todos={todoData.filter((todo) => !todo.completed)}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        </Tab>
        <Tab
          eventKey="end"
          title="end"
          style={{ textDecoration: "line-through", width: "40%" }}
        >
          <TodoList
            todos={todoData.filter((todo) => todo.completed)}
            onDelete={handleDelete}
          />
        </Tab>
      </Tabs>
    </center>
  );
};

export default HomePage;
