import * as React from "react";
import ClusterView from './views/ClusterView';
import NodeView from "./views/NodeView";
//fetch data from backend

fetch('http://localhost:3000/getData')
  .then((data: any) => data.json())
  .then((data: any) => {
    console.log('GET request data response: ', data);
  })
  .catch((error) => {
    console.log('GET request error: ',error);
  });

function App(props: any) {
    return(
      <div className="Tabs">
        <div className="ClusterView">
          <ClusterView />
        </div>
      </div>
    )
}

export default App;