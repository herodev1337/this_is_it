import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

Array.prototype.nestedMap = function(func){
  const arr = this

  const mapthrough = (val) => {
    let lets;
    if (val instanceof Array) {
      return mapthrough(val)
    } else {
      return func(val)
    }
    // return val
  }
  arr.map((val) => {
    mapthrough(val)
  })
}

const docs = {
  sqit: {
    root: [
      'config.md',
      'helpers.md',
      'sketch_builder.md',
      'Sketch.md',
      'Editor.js',
    ],
    game1: ['config.md', 'sketch_builder.md'],
  },
  // Test data for debugging
  knowledge:["Berufstracker.md", "sonesachen.md"],
  // hub:{
  //   puf:1,
  //   duf:2,
  //   guf:{
  //     x:1,
  //     y:2
  //   }
  // }
};

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
  return Object.entries(obj)
    .reduce((acc, [key, value]) => (key === keyToFind)
      ? acc.concat(value)
      : (typeof value === 'object')
      ? acc.concat(findAllByKey(value, keyToFind))
      : acc
    , [])
}

function App() {
  const routes = get_nested_keys(docs);
  const [childs, setChilds] = useState([])
  const [isOpen, setOpen] = useState(false)

  const onClick = (e) => {
    const tar = e.target.innerText
    const some = findAllByKey(docs, tar)

    // console.log(newOpen)
    if (some.length === 1 && some.every((el) => typeof el === "object")){
      console.log(Object.keys(some[0]))
      const newOpen = !isOpen;
      
      setOpen(newOpen)
      
      setChilds(newOpen ? Object.keys(some[0]).map((v)=> <div>{v}</div>) : [])
    }

  }

  return (
    routes.map((val, i) => {
      if (val instanceof Array) {
        val = val.filter((v) => typeof v === "string")[0]
      }
        return <div key={uuidv4()} onClick={onClick}>{val}
        {childs}
        </div>
      }
    )
  );
}

export default App;
