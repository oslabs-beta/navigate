import * as React from "react";
import ClusterView from './views/ClusterView';
import NodeView from "./views/NodeView";
import {kObject} from "../kObjects/kObject"
import * as kObjects from "../kObjects/__index";
import * as dataParser from "../component_data/kDataParser";

interface IProps {
  jsonFiles: string[],
  rendered: boolean,
  //needone for function
}

const App = (props: any) => {
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
  React.useEffect(parseData, []);
  React.useEffect(fetchDeploymentLive, []);
  React.useEffect(fetchPodLive, []);
  React.useEffect(fetchLiveData, []);
  
  function fetchLiveData(): void {
    fetch('http://localhost:3000/statusConditions')
      .then((data: Response) => data.json())
      .then((data: string[]) => {
        data.forEach((data: string) => {
          deploymentStatus.push(data);
        })
        setDeployment(deploymentStatus)
      })
    .catch((error) => console.log('GET /statusConditions response error: ', error));
  }

  function fetchDeploymentLive(): void {
    fetch('http://localhost:3000/getLiveDeploymentData')
      .then((data: Response) => data.json())
      .then((data: string[]) => {  
        data.forEach((data: string) => {
          podDeployments.push(data);
        })
        getDeploys(podDeployments)
      })
    .catch((error) => console.log('GET /getLiveDeploymentData response error: ', error));
  }

  function fetchPodLive(): void {
    fetch('http://localhost:3000/getLivePodData')
      .then((data: Response) => data.json())
      .then((data: any) => {
        data.forEach((data: any) => {
          podInfoObjects.push(data);
        })
        getPods(podInfoObjects)
      })
    .catch((error) => console.log('GET /getLivePodData response error: ', error));
  }

  function parseData(): void
  {
    const data = dataParser.parseData(props.jsonFiles);
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