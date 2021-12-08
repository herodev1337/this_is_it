import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Tree = ({ data = [] }) => {
  return (
    <div className="treeContainer">
      <ul className="treeList">
        {data.map((tree) => (
          <TreeNode key={uuidv4()} node={tree} />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ node }) => {
  const [isVisible, setVisible] = useState(false);
  const hasChild = node.children ? true : false;

  return (
    <li key={uuidv4()} className="treeNode">
      <div>
        <div className="toggle" onClick={(e) => setVisible((v) => !v)}>
          {hasChild && (
            <div
              className={`nodesToggle ${isVisible ? 'active' : ''}`}
            //   onClick={(e) => setVisible((v) => !v)}
            >
              <i className="fas fa-caret-right"></i>
            </div>
          )}

          <div className="treeHead">
            <i className={`${node.icon}`}></i>
            {node.label}
          </div>
        </div>

        {
          hasChild && isVisible && <Tree data={node.children} />

          // <div className="treeContent">
          //     <ul className="treeList">
          //         <Tree data={node.children}/>
          //     </ul>
          // </div>
        }
      </div>
    </li>
  );
};

export default Tree;
