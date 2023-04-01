import React, { useState, useEffect } from "react";
import quotes from "./quotes.json";
import "./index.css";

function QuoteMachine() {
  const [quote, setQuote] = useState({});

  const getQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.quotes.length);
    const randomQuote = quotes.quotes[randomIndex];
    console.log(randomQuote);
    setQuote(randomQuote);
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center mx-auto"
      style={{ minHeight: "30vh", maxWidth: "1200px" }}
    >
      <div className="row quote-back pt-5 pb-5 mx-3 my-3">
        <div className="col mx-auto">
          <h1 className="text-center">Random Quote Generator</h1>
          <div className="row">
            <div id="quote-box" className="col-11 mx-auto mt-5 mb-5 p-3">
              <div id="text">
                <h2 className="text-center mt-5">
                  <i className="fa fa-quote-left"></i>
                  <span>{quote.quote}</span>
                  <i className="fa fa-quote-right"></i>
                </h2>
              </div>
              <div id="author" class="text-right mr-3 mt-5">
                <span>- {quote.author}</span>
              </div>
            </div>
            <div
              id="buttons"
              className="d-flex align-items-center justify-content-center mx-auto"
            >
              <button className="btn btn-primary m-1" onClick={getQuote}>
                New Quote
              </button>
              <button className="btn btn-primary m-1">
                <a
                  id="tweet-quote"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `"${quote.quote}" - ${quote.author}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-twitter"></i> Share to Twitter
                </a>
              </button>
              <button className="btn btn-primary m-1">
                <a
                  href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(
                    quote.author
                  )}&content=${encodeURIComponent(
                    quote.text
                  )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-tumblr"></i> Share to Tumblr
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteMachine;
