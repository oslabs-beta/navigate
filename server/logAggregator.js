export default function parseSchedulerInformation(jsonObjs){
  try {
    const statusConditions= [];
    for(let i = 0; i < jsonObjs.length; i++){
      if(jsonObjs[i][0].status === undefined) continue;
      for(let j = 0; j < jsonObjs[i][0].status.conditions.length; j++){
        let conditionObject = {};
        conditionObject.name = jsonObjs[i][0].metadata.name;
        conditionObject.kind = jsonObjs[i][0].kind;
        if(jsonObjs[i][0].kind === 'Deployment'){
        try {
          conditionObject.time = jsonObjs[i][0].status.conditions[j].lastTransitionTime;
          conditionObject.event = jsonObjs[i][0].status.conditions[j].message;
          conditionObject.reason = jsonObjs[i][0].status.conditions[j].reason;
          conditionObject.type = jsonObjs[i][0].status.conditions[j].type;
          }
        catch (error) {
          console.log('Error inside deployment conditional of parseSchedulerInformation: ', error);
        }
      }
        else if(jsonObjs[i][0].kind === 'Pod'){
          try {
            conditionObject.time = jsonObjs[i][0].status.conditions[j].lastTransitionTime;
            conditionObject.event = `Pod deployment status: ${jsonObjs[i][0].status.conditions[j].type}`
          } catch (error) {
            console.log('Error in pod conditional of parseSchedulerInformation: ', error)
          }
        }
        statusConditions.push(conditionObject)
      }
    }
    return sortStatusConditions(statusConditions);
  } catch (error) {
      console.log('Error in parseSchedulerInformation', error)
  }
}

function sortStatusConditions(statusConditions){
  try {
    statusConditions.sort(function(a,b){
      return a.time.localeCompare(b.time)
    })
    return statusConditions;
  } catch (error) {
    console.log('Error in sortStatusConditions: ', error)
  }
}
