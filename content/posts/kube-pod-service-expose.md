+++
title = "K8 pod troubleshooting"
date = 2026-06-04
draft = false
tags = ["k8"]
+++

After launching pods how do you know that they are up and running? Or you deployed them and there is an error being thrown? These are some of the ways to inspect the pods and verify they are running properly.

## create a test pod to send a network request

```
kubectl run <tmp> --image=busybox --rm -it \
--restart=Never -- wget -t 3 -qO- <address/ip>
```

The flags:
- `--rm` is a kubectl flag. This will remove the pod once it finishes execution
- `-it` is a kubectl flag.
  - `i`, also `--stdin`, enables an input stream by keeping stdin open and attached to the container
  - `t`, also `--tty`, creates a pseudo terminal for interacting  
- `-qO-` is a wget flag for quietly get the response and print it to the terminal  

The `<address/ip>` is either the ip address of the pod or the dns address created by a service.

Example:  
```
# Create a namespace  
kubectl create ns high-five

# Create a pod in the namespace
kubectl -n high-five run imapod \
  --image=nginx \
  --port=80 \
  --labels=app=imapod \
  --expose \
  --restart=Never

# Verify that the "--expose" flag created a svc 
kubectl get svc -n high-five -o wide
kubectl get endpoints -n high-five -o wide

# Launch a test pod to send a network request to imapod
kubectl run tmp \
  --image=busybox \
  -n high-five \
  --restart=Never \
  --rm -it \
  -- wget -t 3 -qO- http://imapod 
```  



