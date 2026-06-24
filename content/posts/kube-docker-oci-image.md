+++
title = "K8 building docker and oci images"
date = 2026-06-01
draft = false
tags = ["k8", "ckad"]
+++

Building images and creating Dockerfiles will make an appearance on the 
CKAD exam. This is a little study sheet on the topic. Some of these examples 
are from [killercoda scenarios by Omkar Shelke][killercoda]

### Scenario: Buildx Docker and OCI images (credit Shelke)

This Dockerfile is located in `/opt/course/21/workdir`:
```
FROM alpine:3.18
LABEL maintainer="team@retail-co.example"
RUN apk add --no-cache curl
COPY greeting.txt /greeting.txt
CMD ["sh", "-c", "echo '🚀 RetailCo Analytics API v1.0' && cat /greeting.txt && sleep 3600"]
```

Build the docker file and save as:
- Docker archive at: /opt/course/21/docker/myapp-docker.tar
- OCI archive at: /opt/course/21/oci/myapp-oci.tar

Solution:
```
docker buildx build \
  -t retailco/analytics-api:v1 . \
  --output type=docker,dest=/opt/course/21/docker/myapp-docker.tar
```
```
docker buildx build \
  -t retailco/analytics-api:v2 . \
  --output type=oci,dest=/opt/course/21/oci/myapp-oci.tar
```


Verify the docker image loads: 
`cd /opt/course/21/docker`  
`docker load -i ./myapp-docker.tar`  
`docker images`

Verify the oci archive: 
`cd /opt/course/21/oci`  
`tar -tf /opt/course/21/oci/myapp-oci.tar | head`
What is the tar command above doing? `man tar` shows that `t` is 
listing contents of an archive. `f` is defining the archive file name. 
Pipe `head` is limiting the results to the top 10 lines.  





<!-- reference links --> 
[killercoda]: 
