import * as React from "react";
import ClusterView from './views/ClusterView';
import NodeView from "./views/NodeView";
import {kObject} from "../kObjects/kObject"
import * as kObjects from "../kObjects/__index";
import * as dataParser from "../component_data/kDataParser";

function App(props: object) {
  const [dataProp, SetDataProp] = React.useState<kObject[]>([]);
  const [nodeViewPage, setNodeViewPage] = React.useState(false);
  const [view, setView] = React.useState('Cluster View')
  const [masterNode, setMasterNode] = React.useState("Kubernetes Cluster")
  const [namespace, setNamespace] = React.useState("Kubernetes Cluster")
  
  const deploymentStatus: any[] = [];
  const [deploymentStat, setDeployment] = React.useState<kObject[]>([]);

  const podDeployments: any[] = [];
  const [podDeployInfo, getDeploys] = React.useState<kObject[]>([]);
  const [podInfoObjects, getPods] = React.useState<kObject[]>([]);
  
  function parseData(relevantData: kObject[]) 
  {
    const data = dataParser.parseData(relevantData);
    SetDataProp(data);
  }

  return( !nodeViewPage ? 
    <div className="Tabs">
      <div className="ClusterView">
        <ClusterView 
        trigger={nodeViewPage}
        setTrigger={setNodeViewPage}
        dataArray={dataProp}
        deploymentStatus={deploymentStat}
        masterNode={masterNode}
        setMasterNode={setMasterNode}
        namespace={namespace}
        setNamespace={setNamespace}
        view={view}
        setView={setView}
        />
      </div>
      
    </div> 
    : 
    <div>
    <NodeView
        trigger={nodeViewPage}
        setTrigger={setNodeViewPage}
        dataArray={dataProp}
        masterNode={masterNode}
        setMasterNode={setMasterNode}
        namespace={namespace}
        podInfoObjects={podInfoObjects}
        podDeployments = {podDeployInfo}
        setNamespace={setNamespace}
        view={view}
        setView={setView}
      />
    </div>
  )
}

export default App;