+++
title = "Pod vs Container security context"
date = 2026-05-26
draft = false
tags = ["k8"]
+++

[A security context defines privilege and access control settings for a Pod or Container.][securityContext]

When setting permissions within a security context, know what the values 
for UID mean. Conventional UID ranges (varies a little by distro):

- `0` — root
- `1–999` — system/service accounts (daemons, etc.)
- `1000+` — regular human users

View the differences between the two in terminal by running the `explain` command 
```
kubectl explain pod.spec.securityContext --recursive
kubectl explain pod.spec.containers.securityContext --recursive
``` 

Most fields are shared between Pod and Container level. The table below shows 
which fields are applied to which fields. 

When a field is set at both levels, the **Container-level value 
overrides the Pod-level value** for that container.


| Field | Pod | Container | Description |
|-------|:---:|:---------:|-------------|
| `runAsUser` | ✓ | ✓ | UID the container process runs as. Container-level overrides Pod-level. |
| `runAsGroup` | ✓ | ✓ | Primary GID for the container process. |
| **runAsNonRoot** | ✓ | ✓ | If true, kubelet refuses to start the container when it would run as UID 0. |
| `seLinuxOptions` | ✓ | ✓ | SELinux labels (user, role, type, level) applied to the container/Pod. |
| `seccompProfile` | ✓ | ✓ | Seccomp filtering profile (e.g. `RuntimeDefault`, `Localhost`, `Unconfined`). |
| `appArmorProfile` | ✓ | ✓ | AppArmor confinement profile. |
| `windowsOptions` | ✓ | ✓ | Windows-specific settings (GMSA, runAsUserName, host process). |
| `fsGroup` | ✓ |  | Supplemental GID applied to mounted volumes so the container can read/write them. |
| `fsGroupChangePolicy` | ✓ |  | When to recursively chown/chmod volume contents to match `fsGroup` (`Always` or `OnRootMismatch`). |
| `supplementalGroups` | ✓ |  | Extra GIDs added to the first process in each container. |
| `supplementalGroupsPolicy` | ✓ |  | Whether to merge or replace groups defined in the container image (`Merge` / `Strict`). |
| `sysctls` | ✓ |  | Namespaced kernel parameters (sysctls) to set for the Pod. |
| `privileged` |  | ✓ | Grants the container near-full host access (essentially root on the node). |
| **allowPrivilegeEscalation** |  | ✓ | Controls whether a process can gain more privileges than its parent (e.g. via setuid). |
| **readOnlyRootFilesystem** |  | ✓ | Mounts the container's root filesystem as read-only. |
| `capabilities` |  | ✓ | Add or drop individual Linux capabilities (e.g. drop `ALL`, add `NET_BIND_SERVICE`). |
| `procMount` |  | ✓ | Controls masking of `/proc` (`Default` or `Unmasked`). |


### Capabilities

The available *capabilities* can be found in the man pages:  
`man capabilites`  

The man pages list the capabilities with `CAP_`. Drop the CAP_ when adding 
a capability.  

Explicitly adding a capability will override a default deny all: 

```yaml
securityContext:
  capabilities:
    drop: ["ALL"]
    add: ["NET_BIND_SERVICE"] 
```


<!-- reference links -->
[securityContext]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/ "Configure a Security Context"  
