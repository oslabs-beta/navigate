import * as React from "react";
import ClusterView from './views/ClusterView';
import NodeView from "./views/NodeView";
import { kDeployment } from "../kObjects/kDeployment";
import Container, {env} from "../kObjects/container";
function App() {
  const kDeployArray: kDeployment[] = [];
  const [dataIsReady, setReady] = React.useState(false);
  const [dataProp, SetDataProp] = React.useState<typeof kDeployArray | undefined>([]);
  React.useEffect(getData, []);
  
  //fetch data from backend, push to kDeployArray
  function getData(): void {
    fetch('http://localhost:3000/getData')
      .then((data: any) => data.json())
      .then((data: any) => {
        console.log(data)
        parseData(JSON.parse(data));
        setReady(true);
      })
      .catch((error) => console.log('GET request error: ',error));
  }

  function parseData(relevantData: any[]) 
  {
    relevantData.forEach((ele: any) => {
      const newDeployment = new kDeployment(
        ele.metadata.name,
        ele.spec.template.metadata.labels.name,
        ele.spec.replicas,
      );
      kDeployArray.push(newDeployment);
    });
    SetDataProp(kDeployArray);
  }
  return( dataIsReady ? 
    <div className="Tabs">
      <div className="ClusterView">
        <ClusterView dataArray={dataProp}/>
      </div>
    </div> : ""
  )
}

export default App;


// function parseData(relevantData: any[]) 
// {
//   relevantData.forEach((ele: any) => {
//     const newDeployment = new kDeployment(
//       ele.metadata.name,
//       ele.spec.template.metadata.labels.name,
//       ele.spec.replicas,
//       new Container(
//         ele.spec.template.spec.containers.name,
//         ele.spec.template.spec.containers.image,
//         new env(
//           ele.spec.template.spec.containers.env[0].name,
//           ele.spec.template.spec.containers.env[0].value
//         ),
//         ele.spec.template.spec.containers.ports.containerPort,
//       )
//     );
//     kDeployArray.push(newDeployment);
//   });
//   SetDataProp(kDeployArray);
// }