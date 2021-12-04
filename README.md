
<p align="center"><img src="https://i.ibb.co/CVcHh4G/unnamed.png"/></p>

<p align="center"><img src='https://camo.githubusercontent.com/676841d37493a8028b6f708c5c0ee876b146b9d1b8e976400ed28bb071713525/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f6f736c6162732d626574612f4b757238'></p>

<p align="center">
A visual overview of your Kubernetes cluster - with network policies, scheduler decisions, and live logs.
</p>

## Visualize your cluster before it starts running
Whether the cluster is live or not, upload your YAML config files to **Navigate**. Here you can see the network structure of your cluster, observing
the connections between your stateful sets, deployments, services, and other Kubernetes objects. <br/><br/> 
<img src="https://i.ibb.co/stR0R1t/image.png"/>
<br/><br/> You can double check for mistakes!<br/><br/>
Click on the deployment nodes in your graph to zoom into the Node View, seeing the various containers and connections each deployment brings.
<br/>

<p align="center"><img src="https://media.giphy.com/media/2sEebgocxrpw0HJEu7/giphy.gif"/></p>

## Visualize all your network policies
Want to check that your network policies are correct? Use the "Network Policies" tab to view them all, one at a time.
![image](https://user-images.githubusercontent.com/5425746/139293239-f8c0db76-b6df-491a-a005-563456ca9060.png)


## Get aggregated Live Logs

While the cluster is live, see: 
  -  etcd/node scheduler decisions, aggregated across many different logs
  -  live deployment data, including statuses and conditions
  -  live pod data that you would normally only get with `kubectl` commands

<p align="center"><img src="https://media.giphy.com/media/I5qq9gUm9o67LkU4tf/giphy.gif"></p>

## How to use Navigate
Prerequisites: npm <br/>
<b>FOR WINDOWS USERS:</b> you will need to run `npm run server & npm run dev` instead - Electron app coming soon. <br/> <br/>
Here are the steps for getting started after cloning:

1. Run `npm install`, then run `npm run build` followed by `npm run both` in your terminal.
2. From there, the dev server should launch, and you will be prompted to upload your Kubernetes yaml config files. The app will display your cluster in a network graph without your Kubernetes cluster running. At this point, only deployments and pods can be interacted with in the graph.
3. To see live deployment and pod log data, your cluster needs to be currently running on your system.
4. If there are network policy objects within your files, the top left network policy tab will provide a dropdown menu so you can inspect each policy.

Currently, we are working on packaging and distributing our app cross-platform via electron. Right now the alpha version for macOS is out, which you can find on our <a href="http://navigates.io">website</a>.

## How to contribute
We're actively developing! If you've found a bug or want to help, feel free to take a look at our <a href="https://github.com/oslabs-beta/navigate/issues">Issues</a>.

## Contributors

<a href="https://linkedin.com/in/thebriankang/">Brian Kang</a> | <a href="https://www.linkedin.com/in/joel-park-208571212/">Joel Park</a> | <a href="https://www.linkedin.com/in/hemwatie/">Hemwatie Persaud</a>
