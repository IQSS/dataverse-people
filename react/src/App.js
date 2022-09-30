import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import "./App.css";

// not sure why rows can't be defined in MyTable
var rows = [];

const MyTable = ({ children }) => {
  //const [show, toggleShow] = useState(true);
  // added
  const [data, setData] = useState(null);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);

  // for useEffect see https://blog.logrocket.com/modern-api-data-fetching-methods-react/
  useEffect(() => {
    // Note that this URL is set from .env.local when you run `npm run build`
    var url = process.env.REACT_APP_API_URL;
    if (url === undefined) {
      url = "http://localhost:8080/micro/resources/message";
    }
    console.log("Fetching from API URL: " + process.env.REACT_APP_API_URL);
    fetch(url)
      .then((response) => response.text())
      .then((tsvdata) => {
        //console.log(data);
        var x = tsvdata.split("\n");
        for (var i = 1; i < x.length; i++) {
          // i=1 to skip header row
          var y = x[i].split("\t");
          x[i] = y;
          var name = y[0];
          var tzOverride = y[1];
          var tz = y[11];
          var matrix = y[2];
          var tzFromInstallation = tz === undefined ? "" : tz;
          var tzFinal = tzOverride === "" ? tzFromInstallation : tzOverride;
          var hostname = y[3];
          var aRow = {};
          aRow.github = name;
          aRow.hostname = hostname;
          aRow.matrix = matrix;
          aRow.tz = tzFinal;
          rows.push(aRow);
        }

        setData(tsvdata);
      });
  }, []);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th></th>
          <th>GitHub</th>
          <th>Installation</th>
          <th>Matrix</th>
          <th>Timezone</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          rows.map((item, index) => (
            <tr key={index}>
              <td>
                <img
                  src={`https://avatars.githubusercontent.com/${item.github}?v=4`}
                  width="21"
                  alt="GitHub profile"
                ></img>
              </td>
              <td>
                <a href={`https://github.com/${item.github}`}>{`${item.github}`}</a>
              </td>
              <td>
                <a href={`http://${item.hostname}`}>{`${item.hostname}`}</a>
              </td>
              <td>
                <a href={`https://view.matrix.org/room/!AmypvmJtUjBesRrnLM:matrix.org/members/${item.matrix}`}>
                  {item.matrix.split(":")[0]}
                </a>
              </td>
              <td>{item.tz}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

const App = () => (
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      {/*
      <h1 className="header">Welcome To React-Bootstrap</h1>
      */}
      <MyTable></MyTable>
      {/*
      <ExampleToast>
        We now have Toasts
        <span role="img" aria-label="tada">
          🎉
        </span>
      </ExampleToast>
      */}
    </Container>
  </Container>
);

export default App;
