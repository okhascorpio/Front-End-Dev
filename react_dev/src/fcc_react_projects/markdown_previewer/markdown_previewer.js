import React from "react";
// Dependencies bootstrap, marked. 

const initialValue = `
Paragraph
# Heading 1
## Heading2
[Google](https://www.google.com)
Inline code \`<div></div>\`
This is block code.
\`\`\`
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
- list item 1
- list item 2
> This is a level 1 block quote.
![FCC](https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png)
**Bolded Text**
`
   //a heading element (H1 size), a sub heading element (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text.   
;
class App extends React.Component {

  state= {
    text: initialValue
  }
  
  handleChange = (event) => {
    this.setState({
      text: event.target.value
    })
    
  }
  render() {
    const {text} = this.state;
    const markdown = marked(text, {breaks: true});
    return (
      <div className="col">
        <h1 className="text-center mt-5">Markdown Previewer</h1>
        <div className="row-6" >
          <h2 className="text-center mt-5">Add Text Here</h2>
         <div className="d-flex justify-content-center align-items-center">
          <textarea className="col-md-6 p-2 h-400"id="editor" value={text} onChange={this.handleChange}/>
          </div>
          </div>
        <div className="row-6">
          <h2 className="text-center mt-5">Markdow Preview</h2>
            <div className="mb-5 p-2" id="preview" dangerouslySetInnerHTML={{ __html: markdown }} />
          </div>
      </div>
      )
   }
}

ReactDOM.render(<App/>, document.getElementById('root'))