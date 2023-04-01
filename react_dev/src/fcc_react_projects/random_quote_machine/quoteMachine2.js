import React from "react";
import "./quote.css";
const data =
  "https://raw.githubusercontent.com/okhascorpio/Front-End-Dev/main/react_dev/src/fcc_react_projects/random_quote_machine/quotes.json";

class QuoteMachine extends React.Component {
  state = {
    quotes: [],
    index: 0,
  };

  componentDidMount() {
    fetch(data)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ quotes: res.quotes }, this.getRandomIndex);
      });
  }

  getRandomIndex = () => {
    const { quotes } = this.state;
    const index = Math.floor(Math.random() * quotes.length);
    this.setState({ index });
  };

  render() {
    const { quotes, index } = this.state;
    const quote = quotes[index];
    console.log(index);
    return (
      <div className="row">
        <div className="quote-back d-flex align-items-center justify-content-center mx-auto">
          <div className="col-6 box p-4 rounded" id="quote-box">
            {quote && (
              <div>
                <div>
                  {" "}
                  <p id="quote" className="text-center h3 m-4">
                    {quote.quote}
                  </p>
                  <cite id="author" className="mr-1 mb-5">
                    - {quote.author}
                  </cite>
                </div>

                <div
                  id="btns"
                  className="d-flex align-items-center justify-content-between w-100"
                >
                  <span>
                    <button className="btn btn-primary m-1">
                      <a
                        id="tweet-quote"
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          `"${quote.quote}" - ${quote.author}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-twitter"></i>
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
                        <i className="fa fa-tumblr"></i>
                      </a>
                    </button>
                  </span>
                  <button
                    className="btn btn-primary m-1"
                    onClick={this.getRandomIndex}
                  >
                    New Quote
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteMachine;
