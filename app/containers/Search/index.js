import React, { useEffect, useState } from 'react';
import './SearchWrapper.css';
import { getTree, findDescenders } from 'api/treeServices';
import SingleSelector from 'components/SingleSelector/';

function NodeTable(props) {
  return <table className='user-request-table'>
    <thead className='th' >
      <tr>
        <th scope="col">
          {'#'}
        </th>
        <th scope="col">
          {'name'}
        </th>
        <th scope="col">
          {'height'}
        </th>
      </tr>
    </thead>
    <tbody>
      {!!props.tNodes.length &&
        props.tNodes.map((node, i) => (
          <tr key={node._id}>
            <td scope="row">{i}</td>
            <td>{node.name}</td>
            <td>{node.height}</td>
          </tr>
        ))}
    </tbody>
  </table>;
};

function SearchWrapper() {

  useEffect(() => {
    getNodeInfo();
  }, []);

  const [tNodes, setTNodes] = useState([]);
  const [leaf, setLeaf] = useState(false);
  const [nodeOptions, setNodeOptions] = useState([]);

  const getNodeInfo = async () => {
    const tNodes = await getTree();
    const nodeList = tNodes.map(node => ({ key: node._id, label: node.name }))
    setNodeOptions(nodeList)
  }

  const search = async id => {
    const tNodes = await findDescenders(id);
    if (tNodes.length > 0){
      setTNodes(tNodes);
      setLeaf(false);
    }
    else{
      setTNodes([]);
      setLeaf(true);
    }
  };

  return (
    <div className="search-container">
      <SingleSelector onSearch={search} options={nodeOptions} />
      {tNodes.length > 0 && <NodeTable tNodes={tNodes} />}
      {leaf && <h3>{'is leaf :)'}</h3>}
    </div>
  );
}

export default SearchWrapper;
