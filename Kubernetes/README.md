# Kubernetes

## Links

* [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)

## Concepts

* **Kubernetes** automates the distribution and scheduling of application containers across a cluster in a more efficient way.

### Clusters
* A **Kubernetes cluster** consists of two types of resources:
  - The **Master** coordinates all activities in the cluster, including scheduling, maintaining state, scaling, and updating
  - **Nodes** are VMs or physical computers that act as the workers that run applications
* Each node has a **Kubelet**, which is an agent for managing the node and communicating with the Kubernetes master, and a container runtime (e.g., Docker, rkt)
* A Kubernetes cluster that handles production traffic should have a minimum of three nodes
* The nodes communicate with the master using the Kubernetes API, which the master exposes
  - End users can also use the Kubernetes API directly to interact with the cluster

### Deployment
* Create a **Deployment** configuration in order to deploy containerized application
  - Specify the container image for your application and the number of replicas
* Once the application instances are created, a **Kubernetes Deployment Controller** continuously monitors those instances
  - If the Node hosting an instance goes down or is deleted, the Deployment controller replaces the instance with an instance on another Node in the cluster
* A **Pod** is a group of one or more containers, with shared storage/network, and a specification for how to run the containers
  - A Pod always runs on a Node.
  - By default they are visible from other pods and services within the same kubernetes cluster, but not outside that network
* The API server will automatically create an endpoint for each pod, based on the pod name, that is also accessible through the proxy
  - `http://${HOST}:${PORT}/api/v1/namespaces/default/pods/${POD_NAME}/proxy/`

## Commands

### kubectl commands

```shell
kubectl version             # verify installed
kubectl cluster-info        # list Master and KubeDNS
kubectl proxy               # Proxy to forward commands into cluster's private network

# USAGE: kubectl <action> <resource>

# USAGE: kubectl get        # list resources
kubectl get nodes           # list all Nodes
kubectl get deployments     # list all Deployments
kubectl get pods            # list all Pods

# USAGE: kubectl run <name> --image=<image-path> --port=<port>    # Create Deployment
kubectl run kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1 --port=8080

# USAGE: kubectl describe   # show detailed information about a resource
kubectl describe pods

export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')

# USAGE: kubectl logs       # print the logs from a container in a pod
kubectl logs $POD_NAME

# USAGE: kubectl exec       # execute a command on a container in a pod
kubectl exec $POD_NAME env
kubectl exec -ti $POD_NAME bash   # Start shell
```

### minikube commands

```shell
minikube version          # verify installed
minikube start
```

## Vocab

* **kubectl**: Kubernetes CLI. Uses the Kubernetes API to interact with the cluster.
* **minikube**: local Kubernetes cluster intended for application development
