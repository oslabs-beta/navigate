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
      <div style={{display:'coloum',  justifyContent: 'space-around', alignContent:'center', alignItems: 'center'}}>
          <button  value="getKubernetesData" onClick={()=> reRunGetKubernetesData()}> refresh </button>
      </div>
  )
}

export default FetchLiveData;
