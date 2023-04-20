const store = require('./app/store')
const fetchQuote = require('./features/quote/quoteSlice').fetchQuote

console.log('initital state ',store.getState())
const unsubscribe = store.subscribe(()=> {
    console.log('Updated state ', store.getState())
})

/* store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.ordered())
store.dispatch(icecreamActions.ordered())
store.dispatch(cakeActions.restocked(6))
store.dispatch(icecreamActions.restocked(5)) */

store.dispatch(fetchQuote())