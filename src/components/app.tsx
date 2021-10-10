import * as React from "react";
import ClusterView from './views/ClusterView';
import NodeView from "./views/NodeView";
import { kDeployment } from "../kObjects/kDeployment";
import Container, {env} from "../kObjects/container";

function App() {
  const kDeployArray: kDeployment[] = [];
  const [dataIsReady, setReady] = React.useState(false);
  const [dataProp, SetDataProp] = React.useState<typeof kDeployArray | undefined>([]);
  const [nodeViewPage, setNodeViewPage] = React.useState(false);
  const deploymentStatus: any[] = [];
  React.useEffect(getData, []);
  
  //fetch data from backend, push to kDeployArray
  function getData(): void {
    fetch('http://localhost:3000/getData')
      .then((data: any) => data.json())
      .then((data: any) => {
        // Data will be an array of objects. Each object represents a different YAML file.
        parseData(data);
        setReady(true);
      })
      .catch((error) => console.log('GET /getData response error: ', error));
  }

  async function fetchLiveData() {
    await fetch('http://localhost:3000/getLiveData')
      .then((data: any) => data.json())
      .then((data: any) => {
        data.forEach((element: any) => {
          deploymentStatus.push(element);
      })
    })
    .catch((error) => console.log('GET /getLiveData response error: ', error));
  }
  fetchLiveData();

  function parseData(relevantData: any[]) 
  {
      for(let i = 0; i < relevantData.length; i++){
      // Since each YAML file can have multiple objects, [0] assumes that there is only one object per file.
      let ele = relevantData[i][0];

      // Checks to see if kubernetes object is a deployment 
      if(ele.kind !== 'Deployment') continue;
      const newEnv = new env(
        ele.spec.template.spec.containers[0].env[0].name,
        ele.spec.template.spec.containers[0].env[0].value,
      );
      const newContainer = new Container(
        ele.spec.template.spec.containers[0].name,
        ele.spec.template.spec.containers[0].image,
        newEnv,
        ele.spec.template.spec.containers[0].ports[0].containerPort,
      );
      const newDeployment = new kDeployment(
        ele.metadata.name,
        ele.spec.template.metadata.labels.name,
        ele.spec.replicas,
        newContainer,
      );
      kDeployArray.push(newDeployment);
    };
    SetDataProp(kDeployArray);
  }

  return( !nodeViewPage ? 
    <div className="Tabs">
      <div className="ClusterView">
        <ClusterView 
        trigger={nodeViewPage}
        setTrigger={setNodeViewPage}
        dataArray={dataProp}
        deploymentStatus={deploymentStatus}
        />
      </div>
      
    </div> 
    : 
    <div>
    <NodeView
        trigger={nodeViewPage}
        setTrigger={setNodeViewPage}
        dataArray={dataProp}
      />
    </div>
  )
}

export default App;