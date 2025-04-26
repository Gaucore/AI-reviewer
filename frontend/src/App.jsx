import React, { useEffect, useState } from 'react'
import './app.css'
import 'prismjs/themes/prism-tomorrow.css'
import prism from 'prismjs'
import Editor from 'react-simple-code-editor'
import axios from 'axios'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'


function App() {
  const [code, setCode] = useState(`function sum(){
    return 1+1}`)
    const [review, setReview] = useState('')
  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode(){
    try {
      console.log('Sending code for review:', code);
      const response = await axios.post("http://localhost:3000/api/ai/get-review", {code});
      setReview(response.data)
    } catch (error) {
      console.error('Error reviewing code:', error.response?.data || error.message);
    }
  }

  return (
    <>
    <main>
    <div className='left'>
      <div className='code'>
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => prism.highlight(code, prism.languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            border:'1px solid #ddd',
            borderRadius:'0.7rem',
            height:'100%',
            width:'100%'
          }}
        />
      </div>
      <div className='review' onClick={reviewCode}> review</div>
    </div>
    <div className='right'>
          <Markdown style={
            {
              rehypePlugins:[rehypeHighlight]
            }
          }>{review}</Markdown>
    </div>
    </main>
    </>
  )
}


function sum(){
  return 1+1
}
export default App

