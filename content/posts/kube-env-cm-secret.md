+++
title = "ways to throw secrets and config maps into a container for CKAD"
date = 2026-05-31
draft = true
tags = ["kubernetes", "ckad"]
+++

I am going over the many ways that config maps and secrets can be added to a 
container for the CKAD exam. The different methods that can be used include:

- using the `env` field (import a single key)
- using the `envFrom` field (import entire config map/secret)
- volume mounts

Environment variables can also be added inline, which is defined directly in 
the pod definition file under the containers field. But I just want to cover
adding config maps and secrets.

Quick definition of the configMap and secret api:

**configMap**: stores *non-confidential data* as a key-value pair. Used to 
decouple environmental-specific configuration from container images. 
[ConfigMaps][configMap]

**secret**: default for Kubernetes is to store secrets as base64 encoded strings 
in `etcd`. Not secure. There are steps to properly handle secrets on the 
Kubernetes docs. Also a key-value pair. [Secrets][secrets] 

## env field

[EnvVar][env-field]

Pod json path: `jsonpath='{.spec.containers[0].env}'`  

`kubectl explain pod.spec.containers.env --recursive`  

Imperative command for creating a config map or secret:  

`kubectl create cm sample-cm --from-literal=sample=http://url.com`  
`kubectl describe cm sample-cm`  

`kubectl create secret generic sample-secret --from-literal=password=1234`  
`kubectl describe secrets sample-secret`  

Both config map and secrets are inserted by a single key the same way into 
a pod container's definition. They will appear under the `valueFrom` field:  

```yaml
# pod definition yaml
# .spec.containers[0]
env:
- name: SAMPLE # this is how the config env will appear in the container
  valueFrom:
    configMapKeyRef:
      name: sample-cm # name of the config (not the key)
      key: sample
- name: PASS # new name for the secret
  valueFrom:
    secretKeyRef:
      name: sample-secret
      key: password
```

Apply the pod definition file. Get the pod environment variables with:  
`kubectl exec <podName> -c <containerName> -- printenv`  

## envFrom field  

[EnvFromSource][env-from-field]

Pod json path: `jsonpath='{.spec.containers[0].envFrom}'`  

`kubectle explain pod.spec.containers.envFrom --recursive`  

This yaml will add the config map and secrets from above into a pod's container: 
```yaml
# Pod definition yaml  
# .spec.containers[0].envFrom

envFrom:
- configMapRef:
  name: sample-config
- secretRef:
  name: sample-secret  
```  

## adding config maps and secrets from volumes  

I will add in the config map and secrets above to an example from the kubernetes 
docs [Populate a Volume with data stored in a ConfigMap][volume-config] and 
adding a separate container for the secret using the [Pod API for SecretVolumeSource][secret-volume]  

```yaml
apiVersion: v1 
kind: Pod 
metadata: 
  name: test-pod 
spec: 
  containers: 
    - name: test-config 
      image: registry.k8s.io/busybox:1.27.2 
      command: [ "/bin/sh", "-c", "ls /etc/config/ && sleep 3600" ] 
      volumeMounts: 
      - name: config-volume 
        mountPath: /etc/config 
    - name: test-secret 
      image: registry.k8s.io/busybox:1.27.2 
      command: [ "/bin/sh", "-c", "ls /etc/secret/ && sleep 3600" ] 
      volumeMounts: 
      - name: secret-volume 
        mountPath: /etc/secret 
  volumes: 
    - name: config-volume 
      configMap: 
        name: sample-cm 
    - name: secret-volume 
      secret: 
        secretName: sample-secret 
  restartPolicy: Never 
```

To access the secret and config above, you won't see the envs when you try 
`printenv` inside the containers. Instead you will have to print the envs from 
their mount paths inside the containers:  

`kubectl exec test-pod -c test-secret -- cat etc/secret/password`
`kubectl exec test-pod -c test-config -- cat etc/config/sample`


<!-- reference links -->
[configMap]: https://kubernetes.io/docs/concepts/configuration/configmap/ "ConfigMaps"
[secrets]: https://kubernetes.io/docs/concepts/configuration/secret/ "Secrets"
[env-field]: https://kubernetes.io/docs/reference/kubernetes-api/core/pod-v1/#EnvVar
[env-from-field]: https://kubernetes.io/docs/reference/kubernetes-api/core/pod-v1/#EnvFromSource
[volume-config]: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#populate-a-volume-with-data-stored-in-a-configmap  
[secret-volume]: https://kubernetes.io/docs/reference/kubernetes-api/core/pod-v1/#SecretVolumeSource  
