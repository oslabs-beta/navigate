/*
* utility script for kObjects 
*/

//allow for one line importing
export {default as container} from './container';
export {env} from './container';
export {default as kPod} from './kPod';
export {kDaemonSet} from './kDaemonSet';
export {default as kDeployment} from './kDeployment';
export {kReplicaSet} from './kReplicaSet';
export {kStatefulSet} from './kStatefulSet';
export {default as statefulContainer, volumeMount} from './statefulContainer';
export {default as volumeClaimTemplates} from './volumeClaimTemplates';
export {default as kService} from './kService';

//allow for object param declarations
export interface anyObject {
  [key: string]: any
}
