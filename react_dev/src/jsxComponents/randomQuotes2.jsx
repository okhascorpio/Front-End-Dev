import React, { useState, useEffect } from "react";

function QuoteMachine() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => setQuote(data.content));
  };

  const tweetQuote = () => {
    window.open(`https://twitter.com/intent/tweet?text=${quote}`);
  };

  const tumblrQuote = () => {
    window.open(
      `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=&content=${quote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`
    );
  };

  return (
    <div>
      <h1>Random Quote Generator</h1>
      <h2>"{quote}"</h2>
      <button onClick={getQuote}>New Quote</button>
      <button onClick={tweetQuote}>Share on Twitter</button>
      <button onClick={tumblrQuote}>Share on Tumblr</button>
    </div>
  );
}


export default QuoteMachine;
