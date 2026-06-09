+++
title = "K8 only allow ingress on pods in the same namespace"
date = 2026-05-28
draft = false
tags = ["k8", "ckad"]
+++

In the instance when you want to isolate pods within a namespace from 
pods in another namespace, you can create a network policy. Selecting 
the pods to apply the policy can be a bit of a head scratch. Usually
you would use a label as a way to target the pods that will recieve 
the network policy. That could lead to a lot of different `matchLabels` 
under the `podSelector`. 

The best way to apply to ALL pods is to use an empty object:  
`podSelector: {}`  

The empty object will apply to all pods. What limits the selection 
of pods to the namespace is applying the netowrk policy to 
one namespace. In the case of this netpol, the metadata section 
will target the namespace `isolated`

Create the resources. Place two pods in the `isolated-ns` namespace. 
The other pod will be in the default namespace.   
```
kubectl create ns isolated-ns
kubectl run -n isolated-ns pod-a --image=nginx --labels=app=pod-a
kubectl run -n isolated-ns pod-b --image=nginx --labels=app=pod-b
kubectl run outside --image=nginx --labels=app=outside
```

Test communication between pod `other` in the default ns and `pod-b` 
in `isolated-ns`.  

Test communication between pod `pod-a` in `isolated-ns` and `pod-b` 
in `isolated-ns`.

Both curl commands should return an nginx html message. 
```
kubectl get po -n default -n isoldated -o wide

kubectl exec outside -- curl --max-time 3 <ip-address-of-pod-b>
kubectl exec -n isolated pod-a -- curl --max-time 3 <ip-address-of-pod-b>
```
Create the network policy that applies to `isolated-ns` and targets all
pods.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: isolated-only
  namespace: isolated-ns
spec:
  podSelector: {} # selects all pods to apply netpol
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector: {} # ingress from all pods within ns
```

Try the commands for curl again. This time, the `outside` pod will 
timeout. 
 

```
kubectl exec outside -- curl --max-time 3 <ip-address-of-pod-b>
kubectl exec -n isolated pod-a -- curl --max-time 3 <ip-address-of-pod-b>
```
