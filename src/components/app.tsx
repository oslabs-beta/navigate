import * as React from "react";
import ClusterView from './views/ClusterView';

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