import * as React from "react";

function FetchLiveData(props: any) {

  const reRunGetKubernetesData = () => {
    function requestUpdate() {
        fetch('http://localhost:3000/update')
          .then(response => console.log("Successful reRunGetKubernetesData"))
          .catch(error => console.log('POST ERROR: ' + error));
      }
    requestUpdate();
  }

  return  (
      <div>
          <h1>wheres my button</h1>
          <button  value="getKubernetesData" onClick={()=> reRunGetKubernetesData()}> </button>
      </div>
  )
}

export default FetchLiveData;
