+++
title = "K8 base64 and jsonpath"
date = 2026-06-06
draft = false
tags = ["k8", "ckad"]
+++  

Base 64 encoding doesn't offer real security since anyone can use the `base64` 
command to decode the string. Secrets are still stored in this format. Here are 
steps for decoding the string.  

In versions prior to Kubernetes 1.22, creating a ServiceAccount automatically 
generated an associated Secret. Later versions require creating the associated 
Secret manually. Here I am going to create a ServiceAccount, attach a Secret,
decode the Secret token, and store the decoded Secret in a file.  

[Manually create a long-lived API token for a ServiceAccount][manual_secret]


```
# create a namespace  
kubectl create ns village

# create a service account in village
kubectl create sa -n village village-sa

# attach a secret to the service account
kubectl apply -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: village-secret
  namespace: village
  annotations:
    kubernetes.io/service-account.name: village-sa 
type: kubernetes.io/service-account-token
EOF

# save the token as a terminal variable 
TOKEN=$(k get secret -n village village-secret -o jsonpath='{.data.token}')

# decode and save the token to a new file 
echo $TOKEN | base64 -d > token
```
 
<!-- reference links -->
[manual_secret]: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#manually-create-a-long-lived-api-token-for-a-serviceaccount "Manually create a long-lived API token for a ServiceAccount"  

