+++
title = "Quick study topics Ckad"
date = 2026-06-19
draft = true
tags = ["k8", "ckad"]
+++

## Create a pod and a script to check it's status  

Create a single Pod of image httpd:2.4.41-alpine in Namespace default. The Pod should be named pod1 and the container should be named pod1-container.

Your manager would like to run a command manually on occasion to output the status of that exact Pod. Please write a command that does this into /opt/course/2/pod1-status-command.sh on ckad5601. The command should use kubectl.


**Part 1 — Create the Pod**

**Imperative path (generate, then edit):**  
`kubectl run pod1 --image=httpd:2.4.41-alpine --dry-run=client -o yaml > pod1.yaml`

That gives you a pod named pod1, but with the container also named pod1. Open the 
file and change the container name to pod1-container. Final YAML:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod1
  namespace: default
spec:
  containers:
  - name: pod1-container
    image: httpd:2.4.41-alpine
```

Then create it:
`kubectl apply -f pod1.yaml`  

If you don't care about the container name and just want the pod up fast, 
`kubectl run pod1 --image=httpd:2.4.41-alpine` works in one shot — but it'll name 
the container pod1, which doesn't satisfy this task. So the dry-run-then-edit 
route is the one that actually meets the spec.

**Verify:**  
`kubectl get pod pod1`  

**Part 2 — The status command file**  

You need to write a kubectl command into a shell script file. 
Then write the command into the file. A clean choice that outputs the pod's status:
`echo 'kubectl -n default describe pod pod1 | grep -i status:' > /opt/course/2/pod1-status-command.sh`  

If your manager wants just the phase (e.g. Running) rather than the fuller describe output, jsonpath is tidier:
`echo 'kubectl -n default get pod pod1 -o jsonpath="{.status.phase}"' > /opt/course/2/pod1-status-command.sh`  

Either satisfies "output the status of that exact Pod" — the `describe | grep` version shows the status line in 
context, the jsonpath version returns the single phase value. Pick based on what "status" means to your manager.

Confirm the file and that the command actually runs:
`cat /opt/course/2/pod1-status-command.sh`
`sh /opt/course/2/pod1-status-command.sh`

One thing worth flagging: the task says the command should be runnable manually "on occasion," so it doesn't 
need to be executable or have a shebang — it just needs to contain a working kubectl command. But if 
you want to be safe, you can `chmod +x` it and add `#!/bin/bash` at the top; that never hurts.

## Creat a job  

Team Neptune needs a Job template located at /opt/course/3/job.yaml. This Job should run image busybox:1.31.0 and execute sleep 2 && echo done. It should be in namespace neptune, run a total of 3 times and should execute 2 runs in parallel.

Start the Job and check its history. Each pod created by the Job should have the label id: awesome-job. The job should be named neb-new-job and the container neb-new-job-container.

Same pattern as before — the imperative `create job` gets you most of the scaffold, but `completions`, `parallelism`, the pod label, and the container name all have to be edited in afterward since the CLI doesn't expose flags for them.

### Generate the template imperatively

```bash
kubectl -n neptune create job neb-new-job \
  --image=busybox:1.31.0 \
  --dry-run=client -o yaml \
  -- sh -c "sleep 2 && echo done" \
  > /opt/course/3/job.yaml
```

A few notes on that command: everything after `--` becomes the container's command, so `sh -c "sleep 2 && echo done"` is what runs. The `--dry-run=client -o yaml` means nothing is created yet — it just emits the manifest to the file.

## Edit the file to meet the remaining requirements

Open `/opt/course/3/job.yaml` and add the four things the flags couldn't set: `completions: 3`, `parallelism: 2`, the pod label `id: awesome-job`, and the container name. Final result:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: neb-new-job
  namespace: neptune
spec:
  completions: 3
  parallelism: 2
  template:
    metadata:
      labels:
        id: awesome-job
    spec:
      containers:
      - name: neb-new-job-container
        image: busybox:1.31.0
        command:
        - sh
        - -c
        - sleep 2 && echo done
      restartPolicy: Never
```

Two things to be careful about. The `id: awesome-job` label goes under `spec.template.metadata.labels` — that's the *pod* template's labels, which is what the task asks for ("each pod created by the Job"). Don't put it on the Job's own `metadata.labels` by mistake. And leave `restartPolicy: Never` (the dry-run adds it for you) — Jobs can't use the default `Always`, so removing it would break things.

### Start it and check history

```bash
kubectl -n neptune create -f /opt/course/3/job.yaml
```

Now watch it work. With `completions: 3` and `parallelism: 2`, you'll see two pods spin up at once, then a third once one of the first two finishes:

```bash
kubectl -n neptune get job neb-new-job
kubectl -n neptune get pods -l job-name=neb-new-job
```

"Check its history" really just means inspecting the Job's progress and the pods it spawned. The Job's `COMPLETIONS` column will tick up to `3/3` when done. For more detail, `describe` shows the event timeline of pods created:

```bash
kubectl -n neptune describe job neb-new-job
```

And to confirm the work actually ran, grab logs from one of the pods — you should see `done`:

```bash
kubectl -n neptune logs -l id=awesome-job
```

That last command doubles as a check that your pod label landed correctly, since it selects on `id=awesome-job` rather than the auto-generated `job-name` label.

## Question 4 | Helm Management

Team Mercury asked you to perform some operations using Helm, all in Namespace mercury:

- Delete release internal-issue-report-apiv1
- Upgrade release internal-issue-report-apiv2 to any newer version of chart killershell/nginx available
- Install a new release internal-issue-report-apache of chart killershell/apache. The Deployment should have two replicas, set these via Helm-values during install
- There seems to be a broken release, stuck in pending-install state. Find it and delete it

 
Answer:

Helm Chart: Kubernetes YAML template-files combined into a single package, Values allow customisation

Helm Release: Installed instance of a Chart

Helm Values: Allow to customise the YAML template-files in a Chart when creating a Release

 
**Step 1**  

First we should delete the required release:
```
➜ helm -n mercury ls

NAME                            NAMESPACE    ...   STATUS      CHART

internal-issue-report-apiv1     mercury      ...   deployed    nginx-18.1.14    

internal-issue-report-apiv2     mercury      ...   deployed    nginx-18.1.14     

internal-issue-report-app       mercury      ...   deployed    nginx-18.1.14


➜ helm -n mercury uninstall internal-issue-report-apiv1

release "internal-issue-report-apiv1" uninstalled


➜ helm -n mercury ls

NAME                            NAMESPACE    ...   STATUS      CHART

internal-issue-report-apiv2     mercury      ...   deployed    nginx-18.1.14     

internal-issue-report-app       mercury      ...   deployed    nginx-18.1.14
```  
 
**Step 2**  

Next we need to upgrade a release, for this we could first list the charts of the repo:
```  
➜ helm repo list

NAME            URL                  

killershell     http://localhost:6000


➜ helm repo update

Hang tight while we grab the latest from your chart repositories...

...Successfully got an update from the "killershell" chart repository

Update Complete. ⎈Happy Helming!⎈


➜ helm search repo nginx --versions

NAME                CHART VERSION    DESCRIPTION                                       

killershell/nginx   18.2.0       NGINX Open Source is a...

killershell/nginx   18.1.15      NGINX Open Source is a...

killershell/nginx   18.1.14      NGINX Open Source is a...

killershell/nginx   13.0.0       NGINX Open Source is a...

Here we see that two newer chart versions are available. But the question only requires us to upgrade to any newer chart version available, so we can simply run:

➜ helm -n mercury upgrade internal-issue-report-apiv2 killershell/nginx

Release "internal-issue-report-apiv2" has been upgraded. Happy Helming!

NAME: internal-issue-report-apiv2

LAST DEPLOYED: Mon Aug 25 14:21:24 2025

NAMESPACE: mercury

STATUS: deployed

REVISION: 2

TEST SUITE: None


➜ helm -n mercury ls

NAME                            NAMESPACE   ...   STATUS            CHART

internal-issue-report-apiv2     mercury     ...   deployed          nginx-18.2.0  

internal-issue-report-app       mercury     ...   deployed          nginx-18.1.14

internal-issue-report-daniel    mercury     ...   pending-install   nginx-18.1.14

Looking good!

    INFO: Also check out helm rollback for undoing a helm rollout/upgrade
```  

 
Step 3

Now we're asked to install a new release, with a customised values setting. For this we first list all possible value settings for the chart, we can do this via:
```  
➜ helm show values killershell/apache

global:

  imageRegistry: ""

  imagePullSecrets: []

kubeVersion: ""

nameOverride: ""

fullnameOverride: ""

commonLabels: {}

commonAnnotations: {}

extraDeploy: []

image:

  registry: docker.io

  repository: httpd

  pullPolicy: IfNotPresent

  pullSecrets: []

  debug: false

replicaCount: 1

revisionHistoryLimit: 10

podAffinityPreset: ""

podAntiAffinityPreset: soft

extraPodSpec: {}
```  

Or to parse yaml and render with colors:

`helm show values killershell/apache | yq e`

This can be a huge list for larger Helm charts. We should find the setting replicaCount: 1 on top level. This means we can run:
```  
➜ helm -n mercury install internal-issue-report-apache killershell/apache --set replicaCount=2

NAME: internal-issue-report-apache

LAST DEPLOYED: Mon Aug 25 14:23:38 2025

NAMESPACE: mercury

STATUS: deployed

REVISION: 1

TEST SUITE: None
```  

If we would also need to set a value on a deeper level, for example image.debug, we could run:
```  
helm -n mercury install internal-issue-report-apache killershell/apache \

  --set replicaCount=2 \

  --set image.debug=true
```  
Install done, let's verify what we did:
```  
➜ helm -n mercury ls

NAME                            NAMESPACE   ...   STATUS            CHART

internal-issue-report-apache    mercury     ...   deployed          apache-11.2.20    

internal-issue-report-apiv2     mercury     ...   deployed          nginx-18.2.0  

internal-issue-report-app       mercury     ...   deployed          nginx-18.1.14

internal-issue-report-daniel    mercury     ...   pending-install   nginx-18.1.14


➜ k -n mercury get deploy internal-issue-report-apache

NAME                           READY   UP-TO-DATE   AVAILABLE   AGE

internal-issue-report-apache   2/2     2            2           64s
```  

We see a healthy deployment with two replicas!

 
**Step 4**  

Find and delete the broken release:
```  
➜ helm -n mercury ls

NAME                            NAMESPACE   ...  STATUS            CHART

internal-issue-report-apache    mercury     ...  deployed          apache-11.2.20

internal-issue-report-apiv2     mercury     ...  deployed          nginx-18.2.0

internal-issue-report-app       mercury     ...  deployed          nginx-18.1.14

internal-issue-report-daniel    mercury     ...  pending-install   nginx-18.1.14


➜ helm -n mercury uninstall internal-issue-report-daniel

release "internal-issue-report-daniel" uninstalled
```  
Thank you Helm for making our lives easier! (Till something breaks)


**Question 5 | ServiceAccount, Secret**  

Configure Service Accounts for Pods Secrets

Team Neptune has its own ServiceAccount named neptune-sa-v2 in Namespace neptune. A coworker needs the token from the Secret that belongs to that ServiceAccount. Write the base64 decoded token to file /opt/course/5/token on ckad7326.

 
Answer:

Secrets won't be created automatically for ServiceAccounts, but it's possible to create a Secret manually and attach it to a ServiceAccount by setting the correct annotation on the Secret. This was done for this task.
```  
k -n neptune get sa # get overview

k -n neptune get secrets # shows all secrets of namespace

k -n neptune get secrets -oyaml | grep annotations -A 1 # shows secrets with first annotation
```  

If a Secret belongs to a ServiceAccount, it'll have the annotation `kubernetes.io/service-account.name`. Here the Secret we're looking for is neptune-secret-1.

```  
➜ k -n neptune get secret neptune-secret-1 -o yaml

apiVersion: v1

data:

...

  token: ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkltNWFaRmRxWkRKMmFHTnZRM0JxV0haT1IxZzFiM3BJY201SlowaEhOV3hUWmt3elFuRmFhVEZhZDJNaWZRLmV5SnBjM01pT2lKcmRXSmxjbTVsZEdWekwzTmxjblpwWTJWaFkyTnZkVzUwSWl3aWEzVmlaWEp1WlhSbGN5NXBieTl6WlhKMmFXTmxZV05qYjNWdWRDOXVZVzFsYzNCaFkyVWlPaUp1WlhCMGRXNWxJaXdpYTNWaVpYSnVaWFJsY3k1cGJ5OXpaWEoyYVdObFlXTmpiM1Z1ZEM5elpXTnlaWFF1Ym1GdFpTSTZJbTVsY0hSMWJtVXRjMkV0ZGpJdGRHOXJaVzR0Wm5FNU1tb2lMQ0pyZFdKbGNtNWxkR1Z6TG1sdkwzTmxjblpwWTJWaFkyTnZkVzUwTDNObGNuWnBZMlV0WVdOamIzVnVkQzV1WVcxbElqb2libVZ3ZEhWdVpTMXpZUzEyTWlJc0ltdDFZbVZ5Ym1WMFpYTXVhVzh2YzJWeWRtbGpaV0ZqWTI5MWJuUXZjMlZ5ZG1salpTMWhZMk52ZFc1MExuVnBaQ0k2SWpZMlltUmpOak0yTFRKbFl6TXROREpoWkMwNE9HRTFMV0ZoWXpGbFpqWmxPVFpsTlNJc0luTjFZaUk2SW5ONWMzUmxiVHB6WlhKMmFXTmxZV05qYjNWdWREcHVaWEIwZFc1bE9tNWxjSFIxYm1VdGMyRXRkaklpZlEuVllnYm9NNENUZDBwZENKNzh3alV3bXRhbGgtMnZzS2pBTnlQc2gtNmd1RXdPdFdFcTVGYnc1WkhQdHZBZHJMbFB6cE9IRWJBZTRlVU05NUJSR1diWUlkd2p1Tjk1SjBENFJORmtWVXQ0OHR3b2FrUlY3aC1hUHV3c1FYSGhaWnp5NHlpbUZIRzlVZm1zazVZcjRSVmNHNm4xMzd5LUZIMDhLOHpaaklQQXNLRHFOQlF0eGctbFp2d1ZNaTZ2aUlocnJ6QVFzME1CT1Y4Mk9KWUd5Mm8tV1FWYzBVVWFuQ2Y5NFkzZ1QwWVRpcVF2Y3pZTXM2bno5dXQtWGd3aXRyQlk2VGo5QmdQcHJBOWtfajVxRXhfTFVVWlVwUEFpRU43T3pka0pzSThjdHRoMTBseXBJMUFlRnI0M3Q2QUx5clFvQk0zOWFiRGZxM0Zrc1Itb2NfV013

kind: Secret

...
```  

This shows the base64 encoded token. To get the decoded one we could pipe it manually through base64 -d or we simply do:
```  

➜ k -n neptune describe secret neptune-secret-1

...

Data

====

token:      eyJhbGciOiJSUzI1NiIsImtpZCI6Im5aZFdqZDJ2aGNvQ3BqWHZOR1g1b3pIcm5JZ0hHNWxTZkwzQnFaaTFad2MifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJuZXB0dW5lIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6Im5lcHR1bmUtc2EtdjItdG9rZW4tZnE5MmoiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoibmVwdHVuZS1zYS12MiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjY2YmRjNjM2LTJlYzMtNDJhZC04OGE1LWFhYzFlZjZlOTZlNSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpuZXB0dW5lOm5lcHR1bmUtc2EtdjIifQ.VYgboM4CTd0pdCJ78wjUwmtalh-2vsKjANyPsh-6guEwOtWEq5Fbw5ZHPtvAdrLlPzpOHEbAe4eUM95BRGWbYIdwjuN95J0D4RNFkVUt48twoakRV7h-aPuwsQXHhZZzy4yimFHG9Ufmsk5Yr4RVcG6n137y-FH08K8zZjIPAsKDqNBQtxg-lZvwVMi6viIhrrzAQs0MBOV82OJYGy2o-WQVc0UUanCf94Y3gT0YTiqQvczYMs6nz9ut-XgwitrBY6Tj9BgPprA9k_j5qEx_LUUZUpPAiEN7OzdkJsI8ctth10lypI1AeFr43t6ALyrQoBM39abDfq3FksR-oc_WMw

ca.crt:     1066 bytes

namespace:  7 bytes
```  

Copy the token (part under token:) and paste it using vim.

``` 
vim /opt/course/5/token
```  
File /opt/course/5/token should contain the token:
```  
# /opt/course/5/token

eyJhbGciOiJSUzI1NiIsImtpZCI6Im5aZFdqZDJ2aGNvQ3BqWHZOR1g1b3pIcm5JZ0hHNWxTZkwzQnFaaTFad2MifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJuZXB0dW5lIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6Im5lcHR1bmUtc2EtdjItdG9rZW4tZnE5MmoiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoibmVwdHVuZS1zYS12MiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjY2YmRjNjM2LTJlYzMtNDJhZC04OGE1LWFhYzFlZjZlOTZlNSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpuZXB0dW5lOm5lcHR1bmUtc2EtdjIifQ.VYgboM4CTd0pdCJ78wjUwmtalh-2vsKjANyPsh-6guEwOtWEq5Fbw5ZHPtvAdrLlPzpOHEbAe4eUM95BRGWbYIdwjuN95J0D4RNFkVUt48twoakRV7h-aPuwsQXHhZZzy4yimFHG9Ufmsk5Yr4RVcG6n137y-FH08K8zZjIPAsKDqNBQtxg-lZvwVMi6viIhrrzAQs0MBOV82OJYGy2o-WQVc0UUanCf94Y3gT0YTiqQvczYMs6nz9ut-XgwitrBY6Tj9BgPprA9k_j5qEx_LUUZUpPAiEN7OzdkJsI8ctth10lypI1AeFr43t6ALyrQoBM39abDfq3FksR-oc_WMw
```  


## Question 6 | ReadinessProbe


Create a single Pod named pod6 in Namespace default of image busybox:1.31.0. The Pod should have a readiness-probe executing cat /tmp/ready. It should initially wait 5 and periodically wait 10 seconds. This will set the container ready only if the file /tmp/ready exists.

The Pod should run the command touch /tmp/ready && sleep 1d, which will create the necessary file to be ready and then idles. Create the Pod and confirm it starts.

 
Answer:

`k run pod6 --image=busybox:1.31.0 --dry-run=client -oyaml --command -- sh -c "touch /tmp/ready && sleep 1d" > 6.yaml`
`vim 6.yaml`  

Search for a readiness-probe example on https://kubernetes.io/docs, then copy and alter the relevant section for the task:
```  
# 6.yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: pod6
  name: pod6
spec:
  containers:
  - command:
    - sh
    - -c
    - touch /tmp/ready && sleep 1d
    image: busybox:1.31.0
    name: pod6
    resources: {}
    readinessProbe:                             # add
      exec:                                     # add
        command:                                # add
        - sh                                    # add
        - -c                                    # add
        - cat /tmp/ready                        # add
      initialDelaySeconds: 5                    # add
      periodSeconds: 10                         # add
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```  

Then:

`k -f 6.yaml create`

Running k get pod6 we should see the job being created and completed:
```  
➜ k get pod pod6

NAME   READY   STATUS              RESTARTS   AGE
pod6   0/1     ContainerCreating   0          2s

➜ k get pod pod6
NAME   READY   STATUS    RESTARTS   AGE
pod6   0/1     Running   0          7s

➜ k get pod pod6
NAME   READY   STATUS    RESTARTS   AGE
pod6   1/1     Running   0          15s
```  

## Question 7 | Pods, Namespaces

The board of Team Neptune decided to take over control of one e-commerce webserver from Team Saturn. The administrator who once setup this webserver is not part of the organisation any longer. All information you could get was that the e-commerce system is called my-happy-shop.

Search for the correct Pod in Namespace saturn and move it to Namespace neptune. It doesn't matter if you shut it down and spin it up again, it probably hasn't any customers anyways.

Let's see all those Pods:
```  
➜ k -n saturn get pod

NAME                READY   STATUS    RESTARTS   AGE
webserver-sat-001   1/1     Running   0          111m
webserver-sat-002   1/1     Running   0          111m
webserver-sat-003   1/1     Running   0          111m
webserver-sat-004   1/1     Running   0          111m
webserver-sat-005   1/1     Running   0          111m
webserver-sat-006   1/1     Running   0          111m
```  
The Pod names don't reveal any information. We assume the Pod we are searching has a label or annotation with the name my-happy-shop, so we search for it:
```  
k -n saturn describe pod # describe all pods, then manually look for it

# or do some filtering like this

k -n saturn get pod -o yaml | grep my-happy-shop -A10
```  
We see the webserver we're looking for is webserver-sat-003
```  
k -n saturn get pod webserver-sat-003 -o yaml > 7_webserver-sat-003.yaml # export

vim 7_webserver-sat-003.yaml
```  
Change the Namespace to neptune, also remove the status: section, the token volume, the token volumeMount and the nodeName, else the new Pod won't start. The final file could look as clean like this:
```  
# 7_webserver-sat-003.yaml

apiVersion: v1
kind: Pod
metadata:
  annotations:
    description: this is the server for the E-Commerce System my-happy-shop
  labels:
    id: webserver-sat-003
  name: webserver-sat-003
  namespace: neptune # new namespace here
spec:
  containers:
  - image: nginx:1.16.1-alpine
    imagePullPolicy: IfNotPresent
    name: webserver-sat
  restartPolicy: Always
```  

Then we execute:
```  
k -n neptune create -f 7_webserver-sat-003.yaml  

➜ k -n neptune get pod | grep webserver
webserver-sat-003               1/1     Running            0          22s
```  
It seems the server is running in Namespace neptune, so we can do:
`k -n saturn delete pod webserver-sat-003 --force --grace-period=0`  

Let's confirm only one is running:
```  
➜ k get pod -A | grep webserver-sat-003

neptune        webserver-sat-003         1/1     Running            0          6s
```  

This should list only one pod called webserver-sat-003 in Namespace neptune, status running.

## How to pass in secrets  

[Distribute Credentials Securely Using Secrets](https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/)  

**volume**  
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secret-test-pod
spec:
  containers:
    - name: test-container
      image: nginx
      volumeMounts:
        # name must match the volume name below
        - name: secret-volume
          mountPath: /etc/secret-volume
          readOnly: true
  # The secret data is exposed to Containers in the Pod through a Volume.
  volumes:
    - name: secret-volume
      secret:
        secretName: test-secret
```  

**env**  
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: env-single-secret
spec:
  containers:
  - name: envars-test-container
    image: nginx
    env:
    - name: SECRET_USERNAME
      valueFrom:
        secretKeyRef:
          name: backend-user
          key: backend-username
```  

**envFrom** 
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: envfrom-secret
spec:
  containers:
  - name: envars-test-container
    image: nginx
    envFrom:
    - secretRef:
        name: test-secret
```   
## Create a pv,pvc,deploy



Create a new PersistentVolume named earth-project-earthflower-pv. It should have a capacity of 2Gi, accessMode ReadWriteOnce, hostPath /Volumes/Data and no storageClassName defined.

Next create a new PersistentVolumeClaim in Namespace earth named earth-project-earthflower-pvc . It should request 2Gi storage, accessMode ReadWriteOnce and should not define a storageClassName. The PVC should bound to the PV correctly.

Finally create a new Deployment project-earthflower in Namespace earth which mounts that volume at /tmp/project-data. The Pods of that Deployment should be of image httpd:2.4.41-alpine.

**Create ns**

`k create ns earth`

**Create the PersistentVolume:** 
persistent volumes are **cluster scoped**. They are not bound by a namespace. 
Any object in the cluster, from any namespace, can claim it.

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: earth-project-earthflower-pv
spec:
# storageClassName: NOT SET!
  capacity:
    storage: 2Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /Volumes/Data
```

**Create PersistentVolumeClaim:**  
pvcs are namespaced. The accessModes must match between a pv and pvc for them to bind

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: earth-project-earthflower-pvc
  namespace: earth
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 2Gi
```  

**Create deployment and mount the pvc:**  

The wiring happens in two linked places: spec.template.spec.volumes declares a 
pod volume named data that points at the PVC by claimName, and volumeMounts inside 
the container mounts that same named volume at /tmp/project-data. The name: data is 
just a local handle 

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: project-earthflower
  namespace: earth
spec:
  replicas: 1
  selector:
    matchLabels:
      app: project-earthflower
  template:
    metadata:
      labels:
        app: project-earthflower
    spec:
      containers:
        - name: project-earthflower
          image: httpd:2.4.41-alpine
          volumeMounts:
            - name: data
              mountPath: /tmp/project-data
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: earth-project-earthflower-pvc
```


**Applying and verifying:**  
Drop everything into one file (separated by ---) and apply, or apply each piece:

`kubectl apply -f earth.yaml`

Then check the binding actually happened:

`kubectl -n earth get pvc earth-project-earthflower-pvc`
`kubectl get pv earth-project-earthflower-pv`

You want to see `STATUS: Bound` on both, with the PVC's `VOLUME` column showing `earth-project-earthflower-pv`. 
Then confirm the pod is running and the mount is live:
`kubectl -n earth get pods`  
`kubectl -n earth exec deploy/project-earthflower -- df -h /tmp/project-data`

A couple of things that commonly trip people up: if the PVC sits in `Pending`, it's almost always 
a storage-class or capacity mismatch — double-check that neither side has a 
storageClassName and that the request isn't larger than the PV. And remember hostPath only makes 
sense on single-node clusters (like minikube or kind); on a real multi-node cluster the pod could 
land on a node where /Volumes/Data doesn't exist.


