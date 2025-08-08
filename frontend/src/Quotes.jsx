import { useState } from "react";
import React from "react";
import axios from "axios";

function Quotes() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  function getQuote() {
    axios.get("http://localhost:5000/", {crossdomain: true,}).then(response => {
        setText(response.data.text);
        setAuthor(response.data.author);
    })
  }

  return (
    <>
      <div>Quotes</div>
      <button onClick={getQuote}>generate</button>
      <h1>{text}</h1>
      <h3>{author}</h3>
    </>
  );
}

export default Quotes;
