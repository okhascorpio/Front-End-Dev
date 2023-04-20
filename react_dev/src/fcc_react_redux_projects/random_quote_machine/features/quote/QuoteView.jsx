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

    function handlePost(val) {
      let url = '';
      val === 'tweet' ? url =  `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.quote}" - ${quote.author}`)}` :
      url = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(
        quote.author
      )}&content=${encodeURIComponent(
        quote.text
      )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`

  
      window.open(url);
    }


    return (
        <div className='quote-back'>
            <div id='quote-box'><h2 className='quote-text'>{'"'+quote.quote+'"'}</h2>
                <i id='author'>{'-- '+quote.author}</i>
            </div>
            
            <div id="buttons">
              <button className="btn btn-new-quote m-1" onClick={() => { dispatch(fetchQuote()) }}>New Quote</button>
              <button className="btn btn-twitter m-1" onClick={() => { handlePost('tweet') }}>
                
                  <i className="fab fa-twitter"></i> Share to Twitter
                
              </button>
              <button className="btn btn-tmblr m-1" onClick={() => { handlePost('tumblr')}}>
            
                  <i className="fab fa-tumblr"></i> Share to Tumblr
                
              </button>
            </div>
            <p className="author text-center">Designed and Coded by<br/>Faheem Ahmed<br/>(React / Redux)</p>
        </div>
    )
}
