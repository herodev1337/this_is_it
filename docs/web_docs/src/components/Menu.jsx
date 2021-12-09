import React, { useState, useEffect } from 'react';
import Tree from 'src/components/Tree';

// const treeData = [
//   {
//     key: '0',
//     label: 'Games',
//     title: 'Games Folder',
//     icon: 'fas fa-folder',
//     children: [
//       {
//         key: '1',
//         label: 'Sqit',
//         title: 'Sqit Folder',
//         icon: 'fas fa-folder',
//         children: [
//           {
//             key: '1-0',
//             label: 'Game1',
//             title: 'First Sqit-Game Folder',
//             icon: 'fas fa-folder',
//             children: [
//               {
//                 key: '1-0-0',
//                 label: 'config',
//                 title: 'Game1 config',
//                 icon: 'fas fa-file',
//               },
//               {
//                 key: '1-0-0',
//                 label: 'sketch_builder',
//                 title: 'Game1 sketch_builder',
//                 icon: 'fas fa-file',
//               },
//             ],
//           },
//           {
//             key: '1-1',
//             label: 'config',
//             title: 'Configuration in general',
//             icon: 'fas fa-file',
//           },
//           {
//             key: '1-2',
//             label: 'helpers',
//             title: 'Helper file',
//             icon: 'fas fa-file',
//           },
//           {
//             key: '1-3',
//             label: 'sketch_builder',
//             title: 'Sketch_builder in general',
//             icon: 'fas fa-file',
//           },
//           {
//             key: '1-4',
//             label: 'Editor',
//             title: 'Editor file',
//             icon: 'fas fa-file',
//           },
//           {
//             key: '1-5',
//             label: 'Sketch',
//             title: 'Sketch file',
//             icon: 'fas fa-file',
//           },
//         ],
//       },
//     ],
//   },
// ];

const Menu = () => {
  const [treeData, setTreeData] = useState([])

  useEffect(async () =>{
    const data = await fetch(`/this_is_it/structure.json`).then((res) => res.json());
    
    if (data) setTreeData(data)
  }, [])

  return (
    // <div className={`menuHolder ${isOpen ? '' : 'hidden'}`}>
    <div className={`menuHolder`}>
      {/* <div className="menu" onClick={(e) => setOpen((v) => !v)}>
        <i className="fas fa-bars"></i>
      </div> */}
      {<div className="treeHolder"><Tree data={treeData} root={true} /></div>}
      {/* <div className="menu">
        <i className="fas fa-bars"></i>
      </div> */}
      {/* {"Navigation"} */}
      {/* <Tree data={treeData} /> */}
    </div>
  );
};

export default Menu;
