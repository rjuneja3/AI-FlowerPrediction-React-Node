import React, { useState, useEffect } from "react";
import axios from "axios";

import { withRouter } from "react-router-dom";

// React Bootstrap UI imports
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";


function FormDataResults(props) {
  const [sepal_length, setSepal_length] = useState("");
  const [sepal_width, setSepal_width] = useState("");
  const [petal_length, setPetal_length] = useState("");
  const [petal_width, setPetal_width] = useState("");
  const [learning_rate, setLearnRate] = useState("");
  const [epochs, setEpochs] = useState("");
  const [predictedData, setPredData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const [predictedFlowerName, setPredFlowerName] = useState("");

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
        setPredData(response.data);
        var index = (response.data.row1).findIndex(v => Math.round(v)===1);
       switch(index){
         case 0:
          setPredFlowerName("Setosa");
          break;
        case 1:
          setPredFlowerName("Virginica");
          break;
        case 2:
          setPredFlowerName("Versicolor");
          break;
        default:
          console.error("error: "+index);
          break;
       }

        setShowLoading(false);
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
            <h2>Enter the data to predict the flower</h2>
          </Jumbotron>
          <Container className="mainForm">
            <Form onSubmit={sendData} className="col-md-10 offset-md-1">
              <Row>
                <Form.Group as={Col} md="3">
                  <Form.Label>Sepal Length</Form.Label>
                  <Form.Control name="sepal_length" id="sepal_length" placeholder="5.1" type="number" min="0" max="10" step="0.1" onChange={(e) => setSepal_length(e.target.value)}/>
                </Form.Group>
               
                <Form.Group as={Col} md="3">
                  <Form.Label>Sepal Width</Form.Label>
                  <Form.Control name="sepal_width" id="sepal_width" placeholder="3.5" type="number" min="0" max="5"  step="0.1" onChange={(e) => setSepal_width(e.target.value)}/>
                </Form.Group>
              
                <Form.Group as={Col} md="3">
                  <Form.Label>Petal Length</Form.Label>
                  <Form.Control name="petal_length" id="petal_length" placeholder="1.5" type="number" min="0" max="8" step="0.1" onChange={(e) => setPetal_length(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} md="3">
                  <Form.Label>Petal Width</Form.Label>
                  <Form.Control name="petal_width" id="petal_width" placeholder="1.2" type="number"  min="0" max="4" step="0.1" onChange={(e) => setPetal_width(e.target.value)} />
                </Form.Group>
              
                <Form.Group as={Col} md="6">
                  <Form.Label>Learning Rate</Form.Label>
                  <Form.Control name="learning_rate" id="learning_rate" placeholder="0.08" type="number" min="0" max="1" step="0.01" onChange={(e) => setLearnRate(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Epochs</Form.Label>
                  <Form.Control name="epochs" id="epochs" type="number" placeholder="250" step="10" min="0" max="500" onChange={(e) => setEpochs(e.target.value)} />
                </Form.Group>
              </Row>
              
              <Row className="mt-3 ">
              
                <Button className="btn btn-block btn-danger" type="submit">
                  Predict
                </Button>
              
              </Row>
            </Form>
            <div className="text-center">
            <img src="http://www.pngall.com/wp-content/uploads/5/Watercolor-Flower-PNG-Transparent-HD-Photo.png"></img>
            </div>
            </Container>
        </div>
      ) : (
        <div>
          <Container>
            <div className="jumbotron text-center">
              <h2>Results</h2>
              <h3>Predicted Flower: <span>{predictedFlowerName}</span></h3>
            </div>
            <div className="row text-center">
              <div className="col-md-4 offset-md-4">
                <table className="App-table table table-striped table-dark table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Prediction Results</th>
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
                <button className="btn btn-danger btn-block" onClick={goBack}>Go Back</button>
              <img width="500px"src="https://www.nicepng.com/png/full/9-95905_flower-floral-design-clip-art-clipart-watercolor-flower.png"></img>
                </div>
              
          </Container>
        </div>
      )}
    </div>
  );
}
export default withRouter(FormDataResults);
