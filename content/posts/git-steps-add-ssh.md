+++
title = "Add an ssh key to github"
date = 2026-05-27
draft = false
tags = ["git"]
+++

I have searched this enough times that I need to save the steps for 
future reference. Thanks Claude. The instructions on Github are good as 
well, but this adds a few extra checks and the `.ssh/config` file so 
that you don't need to run `ssh-add` in every terminal.

https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

**1. Check for an existing key first**

No point generating a new one if you already have a usable key.

```
ls -al ~/.ssh
```

Look for a file like `id_ed25519.pub` or `id_rsa.pub`. If one exists and you want to reuse it, skip to step 3.

**2. Generate a new key**

Ed25519 is the current recommended type (shorter, faster, secure):

```
ssh-keygen -t ed25519 -C "your_email@example.com"
```

When prompted:
- *File location*: press Enter to accept the default (`~/.ssh/id_ed25519`).
- *Passphrase*: optional but recommended. It encrypts the key on disk, so a stolen key file is useless without it. You can leave it blank by pressing Enter twice if you'd rather not type it each time.

**3. Start the ssh-agent and add your key**

The agent holds your decrypted key in memory so you aren't re-entering the passphrase constantly.

```
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

If you set a passphrase and don't want to run `ssh-add` every time you open a terminal, you can have the agent load it automatically. The clean way is a `~/.ssh/config` entry:

```
Host github.com
    AddKeysToAgent yes
    IdentityFile ~/.ssh/id_ed25519
```

**4. Copy the public key**

You're copying the `.pub` file. Never share or paste the private key (the one without `.pub`).

```
cat ~/.ssh/id_ed25519.pub
```

Select and copy the output. If you have `xclip` installed you can pipe it straight to the clipboard:

```
xclip -selection clipboard < ~/.ssh/id_ed25519.pub
```

**5. Add the key to your GitHub account**

In the browser: go to GitHub → click your profile photo → **Settings** → **SSH and GPG keys** → **New SSH key**. Give it a title (e.g. your machine's name), leave the type as "Authentication Key," paste the key into the box, and click **Add SSH key**.

**6. Test the connection**

```
ssh -T git@github.com
```

The first time, you'll be asked to confirm GitHub's fingerprint — type `yes`. If everything's set up, you'll see a message like:

```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

That "does not provide shell access" part is normal and expected — it's success, not an error.

---

NOTE: if you already have repos cloned over HTTPS, switch them to SSH with `git remote set-url origin git@github.com:user/repo.git` as we covered.


