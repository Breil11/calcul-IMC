import React, { useState } from "react";

import { Li } from "./components/Li/Li";

import "./App.css";

const interpretations = new Map();
interpretations.set(18.5, "Vous ètes en insuffisance pondérale");
interpretations.set(24.9, "Vous avez un poids normal");
interpretations.set(29.9, "Vous ètes en surpoids");
interpretations.set(30, "Vous ètes en obésité, c'est grave");


function App() {
  const [imcs, setImcs] = useState(
    window.localStorage.getItem("imcs")
      ? JSON.parse(window.localStorage.getItem("imcs"))
      : []
  );
  const [imc, setImc] = useState(undefined);

  const handleChange = (evt) => {
    const weight = document.querySelector("[name=weight]").value;
    const size = document.querySelector("[name=size]").value;

    if (!weight || !size) {
      return;
    } else {
      const imc = (weight / Math.pow(size, 2)).toFixed(2);

      let theInterpretation = null;

      interpretations.forEach((interpretation, imcKey) => {
        if (!theInterpretation && imc < imcKey) {
          //console.log(interpretation);
          theInterpretation = interpretation;
        }
      });

      setImc(
        new Date().toLocaleDateString("fr-FR") +
          " Votre IMC est de:    " +
          imc +
          " " +
          theInterpretation
      );
    }
  };

  const handleClick = (evt) => {
    evt.preventDefault();

    const newImcs = [imc, ...imcs];

    setImcs(newImcs);

    window.localStorage.setItem("imcs", JSON.stringify(newImcs));
  };

  return (
    <div className="App">
      <h1>Calcule d'IMC</h1>
      
      {/* <p className="picture">
        <img src="C:\wamp64\www\react3\react-native\IMC\app-imc\images\imc2.jpg" alt="pp" width="500" height="600"></img>
      </p> */}
      <div className="wrapper">
        <p><u>Entrez votre poids </u>👇🏾</p>
        <form>
          <input
            onChange={handleChange}
            name="weight"
            type="number"
            placeholder=" poids en kg"
          />
          <p><u>Entrez votre taille </u>👇🏾</p>
          <input
            onChange={handleChange}
            name="size"
            type="number"
            placeholder=" taille en m"
          />
          <button onClick={handleClick}>Calculer</button>
        </form>

        <div className="interpretation">{imc && <div>{imc}</div>}</div>

        <ul>
          {imcs.map((i) => (
            <Li key={i} imc={i} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
