import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function FlowerForm(props) {
  const [sepal_length, setSepal_length] = useState("");
  const [sepal_width, setSepal_width] = useState("");
  const [petal_length, setPetal_length] = useState("");
  const [petal_width, setPetal_width] = useState("");
  const [learning_rate, setLearning_rate] = useState("");
  const [epochs, setEpochs] = useState("");
  const [predictedData, setPredictedData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const [predictedFlowerName, setPredictedFlowerName] = useState("");

  const apiUrl = "http://localhost:3000/run";

  const sendData = (e) => {
    e.preventDefault();
    const data = {
      sepal_length: sepal_length,
      sepal_width: sepal_width,
      petal_length: petal_length,
      petal_width: petal_width,
      learning_rate: learning_rate,
      epochs: epochs,
    };
    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log(response);
        setPredictedData(response.data);
        var index = (response.data.row1).findIndex(v => Math.round(v)===1);
        if(index ===0){
          setPredictedFlowerName("Setosa");
          console.log("index: "+index);
        }
        else if(index ===1){
          setPredictedFlowerName("Virginica");
          console.log("index: "+index);
        }
        else if(index ===2){
          setPredictedFlowerName("Versicolor");
          console.log("index: "+index);
        }
        else{
          console.error("error: index"+index);
        }
         
        setShowLoading(false);
        //props.history.push("/showDetails");
      })
      .catch((err) => console.log(err));
  };

  function goBack() {
    setShowLoading(true);
  }

  return (
    <div>
      {showLoading === true ? (
        <div>
          <Jumbotron className="text-center">
            <h3>Flower Form</h3>
          </Jumbotron>
          <Container>
            <Form onSubmit={sendData} className="col-md-10 offset-md-1">
              <Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>Sepal Length</Form.Label>
                  <Form.Control
                    name="sepal_length"
                    id="sepal_length"
                    placeholder=""
                    type="number"
                    step="any"
                    onChange={(e) => setSepal_length(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Sepal Width</Form.Label>
                  <Form.Control
                    name="sepal_width"
                    id="sepal_width"
                    placeholder=""
                    type="number"
                    step="any"
                    onChange={(e) => setSepal_width(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>Petal Length</Form.Label>
                  <Form.Control
                    name="petal_length"
                    id="petal_length"
                    placeholder=""
                    type="number"
                    step="any"
                    onChange={(e) => setPetal_length(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Petal Width</Form.Label>
                  <Form.Control
                    name="petal_width"
                    id="petal_width"
                    placeholder=""
                    type="number"
                    step="any"
                    onChange={(e) => setPetal_width(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>Learning Rate</Form.Label>
                  <Form.Control
                    name="learning_rate"
                    id="learning_rate"
                    placeholder="0.07"
                    type="number"
                    step="any"
                    onChange={(e) => setLearning_rate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Epochs</Form.Label>
                  <Form.Control
                    name="epochs"
                    id="epochs"
                    type="number"
                    placeholder="200"
                    step="any"
                    onChange={(e) => setEpochs(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <Button className="btn btn-block" type="submit">
                  Submit
                </Button>
              </Row>
            </Form>
          </Container>
        </div>
      ) : (
        <div>
          <Container>
            <div className="jumbotron text-center">
              <h2>Prediction Results</h2>
              <h3 className="text-danger">Predicted Flower : {predictedFlowerName}</h3>
            </div>
            <div className="row">
              <div className="col-md-4 offset-md-4">
                <table className="App-table table table-striped ">
                  <thead className="thead-light">
                    <tr>
                      <th>Test Results</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="App-td">
                        {predictedData.row1.map((value, index) => (
                          <p key={index}>{value}</p>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
              <div className="text-center col-md-4 offset-md-4">
                <button className="btn btn-primary btn-block" onClick={goBack}>
                  Back
                </button>
              </div>
          </Container>
        </div>
      )}
    </div>
  );
}
export default withRouter(FlowerForm);
