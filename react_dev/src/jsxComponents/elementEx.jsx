import React from 'react'

const Hello = () => {
    {/* return (
         <div>
             <h1>Hello World</h1>
         </div>
    )*/ }
    return React.createElement('div',{id:"div "},React.createElement("h2",{className:"hw"},"Hello World"))
}


export default Hello;