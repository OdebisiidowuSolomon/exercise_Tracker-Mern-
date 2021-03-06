import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

// const port = process.port || "http://localhost:5000";

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.state = { exercises: [] };
  }
  port = process.port || "http://localhost:5000";

  componentDidMount() {
    Axios.get(this.port + "/exercises/")
      .then((res) => {
        this.setState({ exercises: res.data });
      })
      .catch((err) => console.log(err));
  }

  deleteExercise = (id) => {
    Axios.delete(this.port + "/exercises/" + id)
      .then((res) => {
        console.log(res.data);
        this.setState({
          exercises: this.state.exercises.filter((el) => el._id !== id),
        });
      })
      .catch((err) => console.log(err));

    // this.setState({
    //   exercises: this.state.exercises.filter((el) => el._id !== id),
    // });
  };

  exercisesList() {
    return this.state.exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exercisesList()}</tbody>
        </table>
      </div>
    );
  }
}
