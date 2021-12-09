import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './App.scss';
import Menu from './components/Menu';


function App() {
  const [text, setText] = useState('');
  const route = useLocation().pathname;

  // console.log(route.split('/'));

  useEffect(async () => {
    // const loc = window.location.origin
    const md = await fetch(`/this_is_it/docs/${route}.md`).then((res) => res.text());

    if (!md) {
      setText('# Not Found :/');
      return;
    }
    setText(md);

    const aTags = document.querySelectorAll("a")
    aTags.forEach(a=>{
      if (!a.href.includes(".md")) a.setAttribute("target", "_blank")
      a.href = a.href.replace(".md", "");
    })

  }, []);

  return (
    <>
      <Menu/>
      
      <ReactMarkdown
        className="mdContent"
        children={text}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={dark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  padding: '0',
                  background: '#0a0a0a66 !important',
                }}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </>
  );
}

export default App;
