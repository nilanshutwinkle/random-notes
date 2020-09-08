# Purpose

Small reference application running in Kubernetes.

# Instruction

To build image:

    docker build -t simple-node .

To run container:

    docker run --rm -p 3000:3000 simple-node
