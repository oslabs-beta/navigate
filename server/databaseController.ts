import * as fs from "fs";
import {Request, Response, NextFunction} from 'express';
import getYAMLData from "./yamlParser";

interface someObject {
    [key: string]: any
}

const databaseController: someObject = {};

databaseController.getData = (req: Request, res: Response, next: NextFunction) => {
  const data = getYAMLData();
  console.log(data);
  res.locals.data = data;
  return next();
}

databaseController.getLiveData = (req: Request, res: Response, next: NextFunction) => {
  console.log('live dataaa');
  try {
    res.locals.pollingData = [
        {
            "apiVersion": "apps/v1",
            "kind": "Deployment",
            "metadata": {
                "annotations": {
                    "deployment.kubernetes.io/revision": "1",
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"apps/v1\",\"kind\":\"Deployment\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"mafia\",\"name\":\"mafia-backend\"},\"name\":\"mafia-backend\",\"namespace\":\"mafia\"},\"spec\":{\"replicas\":1,\"selector\":{\"matchLabels\":{\"app\":\"mafia\"}},\"template\":{\"metadata\":{\"labels\":{\"app\":\"mafia\",\"name\":\"mafia-backend\"}},\"spec\":{\"containers\":[{\"env\":[{\"name\":\"REDIS_HOST\",\"value\":\"redis-service.mafia\"}],\"image\":\"taleodor/mafia-express@sha256:8328cd7de911367ef2a52a60f8696720e89c152c9a437983c7eccf411b0ede75\",\"name\":\"mafia-backend-container\",\"ports\":[{\"containerPort\":3000}]}]}}}}\n"
                },
                "creationTimestamp": "2021-10-09T16:06:11Z",
                "generation": 1,
                "labels": {
                    "app": "mafia",
                    "name": "mafia-backend"
                },
                "name": "mafia-backend",
                "namespace": "mafia",
                "resourceVersion": "3324",
                "uid": "717f5f2e-5d28-4beb-966d-51b1ef144860"
            },
            "spec": {
                "progressDeadlineSeconds": 600,
                "replicas": 1,
                "revisionHistoryLimit": 10,
                "selector": {
                    "matchLabels": {
                        "app": "mafia"
                    }
                },
                "strategy": {
                    "rollingUpdate": {
                        "maxSurge": "25%",
                        "maxUnavailable": "25%"
                    },
                    "type": "RollingUpdate"
                },
                "template": {
                    "metadata": {
                        "creationTimestamp": null,
                        "labels": {
                            "app": "mafia",
                            "name": "mafia-backend"
                        }
                    },
                    "spec": {
                        "containers": [
                            {
                                "env": [
                                    {
                                        "name": "REDIS_HOST",
                                        "value": "redis-service.mafia"
                                    }
                                ],
                                "image": "taleodor/mafia-express@sha256:8328cd7de911367ef2a52a60f8696720e89c152c9a437983c7eccf411b0ede75",
                                "imagePullPolicy": "IfNotPresent",
                                "name": "mafia-backend-container",
                                "ports": [
                                    {
                                        "containerPort": 3000,
                                        "protocol": "TCP"
                                    }
                                ],
                                "resources": {},
                                "terminationMessagePath": "/dev/termination-log",
                                "terminationMessagePolicy": "File"
                            }
                        ],
                        "dnsPolicy": "ClusterFirst",
                        "restartPolicy": "Always",
                        "schedulerName": "default-scheduler",
                        "securityContext": {},
                        "terminationGracePeriodSeconds": 30
                    }
                }
            },
            "status": {
                "availableReplicas": 1,
                "conditions": [
                    {
                        "lastTransitionTime": "2021-10-09T16:06:11Z",
                        "lastUpdateTime": "2021-10-09T16:06:46Z",
                        "message": "ReplicaSet \"mafia-backend-6d5d7c9b8f\" has successfully progressed.",
                        "reason": "NewReplicaSetAvailable",
                        "status": "True",
                        "type": "Progressing"
                    },
                    {
                        "lastTransitionTime": "2021-10-09T16:34:41Z",
                        "lastUpdateTime": "2021-10-09T16:34:41Z",
                        "message": "Deployment has minimum availability.",
                        "reason": "MinimumReplicasAvailable",
                        "status": "True",
                        "type": "Available"
                    }
                ],
                "observedGeneration": 1,
                "readyReplicas": 1,
                "replicas": 1,
                "updatedReplicas": 1
            }
        }
  ];
    return next();

  } catch (error) {
    console.log('Error inside databaseController.getLiveData: ', error);
    return next();
  }
}

export default databaseController;