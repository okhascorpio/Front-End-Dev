import React, { useState, useEffect } from "react";
import './index.css';

function QuoteMachine() {
  const [quotes, setQuotes] = useState([]);

  const getQuotes = async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/okhascorpio/Front-End-Dev/main/react_dev/src/fcc_react_projects/random_quote_machine/quotes.json");
      const data = await response.json();
      setQuotes(data.quotes);
    } catch (error) {
      console.log(error);
    }
  };

  const [quote, setQuote] = useState({});

  const getQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    console.log(randomQuote);
    setQuote(randomQuote);
  };
  

  useEffect(() => {
    getQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length) {
      getQuote();
    }
  }, [quotes]);
  
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
              <div id="author" class="text-center mr-3 mt-5">
                <span>- {quote.author}</span>
              </div>
            
            <div
              id="buttons"
              className="d-flex align-items-center justify-content-between mt-5 w-100"
            >
              <button id="new-quote" className="btn btn-primary m-1" onClick={getQuote}>
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
                  <i className="fab fa-twitter"></i> Share to Twitter
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
                  <i className="fab fa-tumblr"></i> Share to Tumblr
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default QuoteMachine;