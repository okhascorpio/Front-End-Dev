import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchQuote } from './quoteSlice'
import '../../styles/styles.css'
export const QuoteView = () => {
    const dispatch = useDispatch()
    const quote = useSelector(state => state.quote.quote)
    useEffect(() => {
        dispatch(fetchQuote())
    }, [dispatch])

    return (
        <div className='quote-back'>
            <div id='quote-box'><h2 className='quote-text'>{'"'+quote.quote+'"'}</h2>
                <i id='author'>{'-- '+quote.author}</i>
            </div>
            
            <div id="buttons">
              <button className="btn btn-secondary m-1" onClick={() => { dispatch(fetchQuote()) }}>New Quote</button>
              <button className="btn btn-success m-1">
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
            <p className="author text-center">Designed and Coded by<br/>Faheem Ahmed<br/>(React / Redux</p>
        </div>
    )
}
