import React, { useState, useEffect } from "react";
//import "./App.css";
//import quotes from "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
import quotes from "./quotes.json";
function QuoteMachine() {
    const [quote, setQuote] = useState({});

    const getQuote = () => {

        const randomIndex = Math.floor(Math.random() * quotes.quotes.length);
        const randomQuote = quotes.quotes[randomIndex];
        //console.log(randomQuote);
        setQuote(randomQuote);
    };

    useEffect(() => {
        getQuote();
    }, []);

    return (
        <div className="App">
            <h1>Random Quote Generator</h1>
            <div className="quote-box">
                <div className="quote-text">
                    
                    <h2><i className="fa fa-quote-left"></i><span>{quote.quote}</span><i className="fa fa-quote-right"></i></h2>
                    
                </div>
                <div className="quote-author">
                    <span>- {quote.author}</span>
                </div>
                <div className="button-container">
                    <button onClick={getQuote}>New Quote</button>
                    <button>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                `"${quote.text}" - ${quote.author}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa fa-twitter"></i> Share to Twitter
                        </a>
                    </button>
                    <button>
                        <a
                            href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(
                                quote.author
                            )}&content=${encodeURIComponent(quote.text)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa fa-tumblr"></i> Share to Tumblr
                        </a>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuoteMachine;
