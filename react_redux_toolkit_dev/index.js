const store = require('./app/store')
const cakeActions = require('./features/cake/cakeSlice').cakeActions
const icecreamActions = require('./features/icecream/icecreamSlice').icecreamActions
const fetchUsers = require('./features/user/userSlice').fetchUsers

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

store.dispatch(fetchUsers())

//unsubscribe()
