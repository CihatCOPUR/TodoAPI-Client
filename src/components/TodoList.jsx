import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const TodoList = ({ todos, onDelete, onComplete }) => {
  // Todos dizisini tersine çevirerek en son eklenen todo'nun ilk sırada olmasını sağlar
  const sortedTodos = [...todos].reverse();

  return (
    <ul className="todoList" style={{ paddingRight: "32px" }}>
      {sortedTodos.map((todo) => (
        <Card key={todo.id} style={{ margin: "20px 0px 20px 0px" }}>
          <Card.Body>
            <Card.Title>{todo.name}</Card.Title>
            <Card.Text>{todo.description}</Card.Text>
            {!todo.completed && (
              <Button
                variant="success"
                style={{ marginRight: "10px" }}
                onClick={() => onComplete(todo._id)}
              >
                Complete
              </Button>
            )}
            <Button variant="danger" onClick={() => onDelete(todo._id)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </ul>
  );
};

export default TodoList;
