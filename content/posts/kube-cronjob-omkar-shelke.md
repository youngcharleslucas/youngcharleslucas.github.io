+++
title = "K8 cronjob setup"
date = 2026-06-05
draft = false
tags = ["k8", "ckad"]
+++

I am running through k8 practice scenarios for the ckad exam. This problem is 
from `killercoda.com`, by Omkar Skelke:

https://killercoda.com/omkar-shelke25

I want to walk through my problem solving process for providing a cronjob solution.

## Scenario 

In the batch namespace, create a CronJob named task-cron with the following requirements:

Schedule: run every 5 minutes

Image: busybox

Command:

/bin/sh -c "echo Processing && sleep 30"
The Job should fail if it runs longer than 40 seconds

Limit retries to 2 before the Job is marked as failed

Each Job run must complete 4 successful Pods

At most 2 Pods should run in parallel

Completed Jobs should be automatically deleted 120 seconds after finishing

## Solution  

I check to see if the namespace already exists:
`kubectl get ns` 

Generate a template for the cronjob using imperative commands:  
`kubectl create cronjob -h` 
```
kubectl create cronjob task-cron \
  --image=busybox \
  --schedule="*/5 * * * *" \
  --dry-run=client -o yaml \
  -- /bin/sh -c "echo Processing && sleep 30" > cj.yaml
```

Open the `cj.yaml` created template to add the fields that were not available as flags:
```
apiVersion: batch/v1
kind: CronJob
metadata:
  name: task-cron
  namespace: batch
spec:
  jobTemplate:
    metadata:
      name: task
    spec:
      activeDeadlineSeconds: 40 # Added
      backoffLimit: 2 # Added
      completions: 4 # Added
      parallelism: 2 # Added
      ttlSecondsAfterFinished: 120 #Added
      template:
        metadata: {}
        spec:
          containers:
          - command:
            - /bin/sh
            - -c
            - echo Processing && sleep 30
            image: busybox
            name: task
            resources: {}
          restartPolicy: Never
  schedule: '*/5 * * * *'
status: {}
```

I found the additional fields to add from the `Job` api spec in the 
kubernetes documentation: [JobSpec][api]

Be aware that `schedule` is set to **every** 5 minutes. That is done using 
`*/5`. If the vaule were only `5` in the minute space, then the job would 
only execute 5 minutes past the hour.  

Check that the cronjob ran by executing `kubectl get cronjob -n batch` and look at the 
`Last Schedule` value. Null would mean the cronjob has not run.  

You can also check the jobs and cronjob with `describe`.

<!-- reference links -->  
[api]: https://kubernetes.io/docs/reference/kubernetes-api/batch/job-v1/#JobSpec "JobSpec"




