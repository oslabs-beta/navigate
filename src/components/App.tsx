import * as React from "react";
import ClusterView from './views/ClusterView';
import NodeView from "./views/NodeView";
import { kDeployment } from "../kObjects/kDeployment";
import Container, {env} from "../kObjects/container";
import kService from "../kObjects/kService";
import {kObject} from "../kObjects/kObject"
import statefulContainer, {volumeMount} from "../kObjects/statefulContainer";
import { kStatefulSet } from "../kObjects/kStatefulSet";
import volumeClaimTemplates from "../kObjects/volumeClaimTemplates";

function App() {
  const kObjArray: kObject[] = [];
  const [dataIsReady, setReady] = React.useState(false);
  const [dataProp, SetDataProp] = React.useState<typeof kObjArray | undefined>([]);
  const [nodeViewPage, setNodeViewPage] = React.useState(false);
  const [masterNode, setMasterNode] = React.useState('default')
  const [namespace, setNamespace] = React.useState('default')
  
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

  function parseData(relevantData: any[]) 
  {
      for(let i = 0; i < relevantData.length; i++){
      // Since each YAML file can have multiple objects, [0] assumes that there is only one object per file.
      let ele = relevantData[i][0];
      // Checks to see if kubernetes object is a deployment 
      if(ele.kind === 'Deployment') {
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
          ele.metadata.namespace,
          ele.kind,
          ele.metadata.name,
          ele.spec.template.metadata.labels.name,
          ele.spec.replicas,
          newContainer,
        );
        kObjArray.push(newDeployment);
      }
      else if(ele.kind === 'StatefulSet') {
        const newVolumeMount = new volumeMount(
          ele.spec.template.spec.containers[0].volumeMounts[0].mountPath,
          ele.spec.template.spec.containers[0].volumeMounts[0].name,
        )
        const newStatefulContainer = new statefulContainer(
          ele.spec.template.spec.containers[0].name,
          ele.spec.template.spec.containers[0].image,
          ele.spec.template.spec.containers[0].ports[0].containerPort,
          newVolumeMount
        )
        const newVolumeClaimTemplates = new volumeClaimTemplates(
          ele.spec.volumeClaimTemplates[0].metadata.name,
          ele.spec.volumeClaimTemplates[0].spec.accessModes,
          ele.spec.volumeClaimTemplates[0].spec.resources.requests.storage
        )
        const newKStatefulSet = new kStatefulSet(
          ele.metadata.namespace,
          ele.kind,
          ele.metadata.name,
          ele.spec.replicas,
          ele.spec.serviceName,
          newStatefulContainer,
          newVolumeClaimTemplates
        )
        kObjArray.push(newKStatefulSet)
      }
      else if(ele.kind === 'Service'){
        // console.log(ele)
        const newkSerivce = new kService(
          ele.metadata.namespace,
          ele.metadata.name,
          ele.kind,
          ele.spec.ports[0].port,
          ele.spec.ports[0].targetPort,
          ele.spec.selector.name ? ele.spec.selector.name : ele.spec.selector['app.kubernetes.io/name'],
          ele.spec.type,
        )
        kObjArray.push(newkSerivce)
      }
    };
    SetDataProp(kObjArray)
    
  }

  return( !nodeViewPage ? 
    <div className="Tabs">
      <div className="ClusterView">
        <ClusterView 
        trigger={nodeViewPage}
        setTrigger={setNodeViewPage}
        dataArray={dataProp}
        deploymentStatus={deploymentStatus}
        masterNode={masterNode}
        setMasterNode={setMasterNode}
        namespace={namespace}
        setNamespace={setNamespace}
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
        setNamespace={setNamespace}
      />
    </div>
  )
}

export default App;

