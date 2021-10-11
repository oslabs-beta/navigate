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
  React.useEffect(getData, []);
  
  //fetch data from backend, push to kDeployArray
  function getData(): void {
    fetch('http://localhost:3000/getData')
      .then((data: any) => data.json())
      .then((data: any) => {
        parseData(JSON.parse(data));
        setReady(true);
      })
      .catch((error) => console.log('GET request error: ',error));
  }

  function parseData(relevantData: any[]) 
  {
    relevantData.forEach((ele: any) => {
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
    });
    SetDataProp(kDeployArray);
  }
  return( !nodeViewPage ? 
    <div className="Tabs">
      <div className="ClusterView">
        <ClusterView 
        trigger={nodeViewPage}
        setTrigger={setNodeViewPage}
        dataArray={dataProp}
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