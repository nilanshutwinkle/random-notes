# Kubernetes

## Links

* [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)

## Basics

* **Kubernetes** automates the distribution and scheduling of application containers across a cluster in a more efficient way.
* A **Kubernetes cluster** consists of two types of resources:
  - The **Master** coordinates all activities in the cluster, including scheduling, maintaining state, scaling, and updating
  - **Nodes** are VMs or physical computers that act as the workers that run applications
* Each node has a **Kubelet**, which is an agent for managing the node and communicating with the Kubernetes master
* A Kubernetes cluster that handles production traffic should have a minimum of three nodes
* The nodes communicate with the master using the Kubernetes API, which the master exposes
  - End users can also use the Kubernetes API directly to interact with the cluster

## Commands

### kubectl commands

```
kubectl version         # verify installed
kubectl cluster-info    # list Master and KubeDNS
kubectl get nodes       # list all Nodes in cluster
```

### minikube commands

```
minikube version        # verify installed
minikube start
```

## Vocab

* **kubectl**: Kubernetes CLI
* **minikube**: local Kubernetes cluster intended for application development
