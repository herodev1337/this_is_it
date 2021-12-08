import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './App.scss';
import Tree from './components/Tree';
// import md_file from "root/docs/sqit/Sketch.md"

const docs = {
  games: {
    root: {
      sqit: {
        root: [
          'config.md',
          'helpers.md',
          'sketch_builder.md',
          'Sketch.md',
          'Editor.js',
        ],
        game1: { root: ['config.md', 'sketch_builder.md'] },
      },
    },
  },
  // Test data for debugging
  // knowledge: { root: ['Berufstracker.md', 'sonesachen.md'] },
  hub: {
    root: {
      puf: 1,
      duf: 2,
      guf: {
        x: 1,
        y: 2,
      },
    },
  },
};

const treeData = [
  {
    key: '0',
    label: 'Games',
    title: 'Games Folder',
    icon: '',
    children: [
      {
        key: '1',
        label: 'Sqit',
        title: 'Sqit Folder',
        icon: '',
        children: [
          {
            key: '1-0',
            label: 'Game1',
            title: 'First Sqit-Game Folder',
            icon: '',
            children: [
              {
                key: '1-0-0',
                label: 'config.md',
                title: 'Game1 config.md',
                icon: '',
              },
              {
                key: '1-0-0',
                label: 'sketch_builder.md',
                title: 'Game1 sketch_builder.md',
                icon: '',
              },
            ],
          },
        ],
      },
    ],

    // games: {
    //   root: {
    //     sqit: {
    //       root: [
    //         'config.md',
    //         'helpers.md',
    //         'sketch_builder.md',
    //         'Sketch.md',
    //         'Editor.js',
    //       ],
    //       game1: { root: ['config.md', 'sketch_builder.md'] },
    //     },
    //   },
    // },
    // // Test data for debugging
    // // knowledge: { root: ['Berufstracker.md', 'sonesachen.md'] },
    // hub: {
    //   root: {
    //     puf: 1,
    //     duf: 2,
    //     guf: {
    //       x: 1,
    //       y: 2,
    //     },
    //   },
    // },
  },
];

const get_nested_keys = (obj) => {
  let curKeys = Object.keys(obj);

  for (let i = 0; i < curKeys.length; i++) {
    const next = obj[curKeys[i]];
    // console.log(next, curKeys[i]);
    if (typeof next !== 'object' || next instanceof Array) {
      continue;
    } else {
      curKeys[i] = [curKeys[i], get_nested_keys(next)];
    }
  }
  return curKeys;
};

function findAllByKey(obj, keyToFind) {
  return Object.entries(obj).reduce(
    (acc, [key, value]) =>
      key === keyToFind
        ? acc.concat(value)
        : typeof value === 'object'
        ? acc.concat(findAllByKey(value, keyToFind))
        : acc,
    []
  );
}

const childs = (obj) => {
  const keys = Object.keys(obj);

  const somes = [];
  for (let i = 0; i < keys.length; i++) {
    let some = keys[i];
    const curObj = obj[some];
    let chils = [];
    // console.log(some)
    if (typeof curObj === 'object' && !(curObj instanceof Array)) {
      chils = childs(curObj);
      some = some === 'root' ? chils : [some, chils];
    }
    // if (some === "root") some = ""
    if (some === 'root') return;
    somes[i] = (
      <div className="child" key={uuidv4()}>
        |-{some}
      </div>
    );
    // const some = <div >{[keys[i], chils]}</div>
    // console.log(some.props.children)
    // somes[i] = some
  }

  return somes;
};

const construct = () => {
  const keys = Object.keys(docs);

  let somes = [];
  for (let i = 0; i < keys.length; i++) {
    // const child = <div>child text</div>;
    const chils = childs(docs[keys[i]]);
    const some = (
      <div className="parent" key={uuidv4()}>
        {[keys[i], chils]}
      </div>
    );
    // console.log(some.props.children);
    somes[i] = some;
  }

  return somes;
};

function App() {
  const [text, setText] = useState('');
  const route = useLocation().pathname;

  // console.log(route.split('/'));

  useEffect(async () => {
    // const loc = window.location.origin
    const md = await fetch(`/docs/${route}.md`).then((res) => res.text());

    if (!md) {
      setText('# Not Found :/');
      return;
    }
    setText(md);
  }, []);

  return (
    <>
      {/* <div className="navBarWrapper">
        <div className="navBar">
          {Object.keys(docs).map((v) => {
            const obj = docs[v]

            return <div>{v}</div>
            
          })}
          {construct()}
        </div>
      </div> */}
      <Tree data={treeData} />
      {/* {text && <ReactMarkdown className="mdContent" children={text} />} */}

      <ReactMarkdown
        className="mdContent"
        children={text}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            console.log(match)
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={dark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  padding:"0",
                  background: "#0a0a0a66 !important"
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
