---
title: 'Managing Multiple Git Profiles'
tags: ['git', 'cli']
excerpt: 'A quick guide to setting up multiple git profiles and swapping between them'
---

## Introduction

**Hello world**, my name is John Blackwell and this is my first blog post! I hope you find it helpful!

I am a relatively new JavaScript developer focusing on React. I graduated from a bootcamp program almost 2 years ago and eventually started working at an agency on several front end codebases. I found myself logging out of github pretty frequently to jump back and forth between accounts (personal and work). I got in the habit of developing some side projects on my work computer (I don't have a personal Mac and mostly wanted to do React Native professional development in my off time). I wanted to be able to commit from my personal Github and started looking into a way to change profiles with the command line.

I changed companies recently and had to go back through the process to set this flow up again and realized it might be worth documenting for anyone else who might be looking for a similar setup. So without further ado here's how to set up multiple git profiles on one machine. Full disclosure, I have only tried this setup for a Mac (if you want to expand upon this pattern for other OSes I'd be very curious to hear [how](https://github.com/jayblack388/another-attempt-at-a-portfolio/issues/1)). I'll be showing you how I set up my professional and personal keys as well as a few [aliases](#Setting-Up-Profile-Aliases) I use to make switching profiles easier.

## Setting Up Your First Git Profile

So we'll start from the very beginning. There's a pretty good chance you've already done this first step if you're currently able to push and pull through SSH. If that's the case you can jump to [Setting Up Subsequent Git Profiles](#Setting-Up-Subsequent-Git-Profiles). All of the instructions for setting up your SSH key pretty much come straight from this page on [github](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh). I recommend heading to Github and logging in with the account you want to set up first.
&nbsp;

### Checking for Existing Keys

First we need to check for any existing SSH keys that may have already been generated.
Open up a terminal and enter

```sh
ls -al ~/.ssh
```

&nbsp;  
This commmand will list all files in your .ssh directory, if they exist. By default public keys filenames are one of the following:

```
-   id_rsa.pub
-   id_ecdsa.pub
-   id_ed25519.pub
```

&nbsp;

### Generating a New Key

If you don't already have a key (or a .ssh directory), we'll generate it now. Open a terminal window (if you don't already have one open) and paste the following line in (substituting in the email of the first Github account you plan to use).

```sh
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

&nbsp;

This will create a new SSH key, using the email as a label. Next you will be prompted to "Enter a file in which to save the key". Github suggests just pressing enter to use the default option and you can totally do that. But, this is where my instructions diverge. I suggest using a more identifiable name for your SSH file. In my case I use `/Users/you/.ssh/id_rsa_professional` for work and `/Users/you/.ssh/id_rsa_personal` for side projects. After you've named your file you will be prompted to enter (and re-enter) a passphrase. You can set this up however you like (passphrases will be dependent on which SSH key you are accessing).

&nbsp;

### Adding your Key to your SSH-Agent

Now that we have a new SSH key we need to add it to the ssh-agent. We're back to Github's instructions again, and will be using the macOS `ssh-add` command and not any third party apps installed by homebrew or macports. First we need to start the ssh-agent. In your terminal enter `eval "$(ssh-agent -s)"`. You will then need to modify the `~/.ssh/config`. This is another place we need to make a slight alteration to Github's instructions. Inside of your config file you need to add your first profile.

```
Host github.com-professional
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa_professional

```

&nbsp;  

For subsequent profiles, you just need to add a similar block below.

```
Host github.com-professional
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa_professional

Host github.com-personal
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa_personal

```

&nbsp;  

Save your config and in your terminal add your new key by entering `ssh-add ~/.ssh/id_rsa_professional`


&nbsp;

### Adding your Key to your Github Account

Now that we have our key in our ssh-agent we need to add it to our Github account. First we need to copy our new SSH key. In your terminal use the command

```sh
pbcopy < ~/.ssh/id_rsa_professional.pub
```

Navigate to your logged in Github account (it should match the account you are currently setting up the profile for). From any page you should be able to click your Profile Picture and select **Settings**. In the user settings sidebar, click **SSH and GPG keys**. Click **New SSH Key** or **Add SSH Key**. In the Title field add a descriptive label (I typically use the machine from which the key originated). In the Key field, paste the key we just copied. Click **Add SSH Key** and enter your password if prompted.

&nbsp;

## Setting Up Subsequent Git Profiles

Ok so this part's pretty easy and looks pretty much like setting up your first profile.
Start by logging out of Github and logging in with the next account you want to set up. Then move to [Generating a New Key](#Generating-a-New-Key), using the email you just logged in with and a different, identifiable filename. When you [Add your SSH Key to your SSH-Agent](#Adding-your-Key-to-your-SSH-Agent) you won't need to start the agent again, but make sure to add the second profile to your config, and not replace the original profile. When you use `ssh-add`, make sure you use your new identifier. Once you move to [Adding your Key to Github](#Adding-your-Key-to-your-Github-Account), make sure you copy your new public key and that you are logged into the correct account when you set up your key in Github.

&nbsp;

## Setting Up Profile Aliases

I recently switched over to using zsh (thanks Catalina) and this will show how I set up my zsh aliases, but these worked just fine on bash as well.

```sh
alias clearprofile='ssh-add -D'
alias personal='git config user.email personal_email@home.com && ssh-add ~/.ssh/id_rsa_personal'
alias professional='git config user.email professional_email@company.com && ssh-add ~/.ssh/id_rsa_professional'
```

&nbsp;

I use `clearprofile` to clear all ssh keys. Then I use either `personal` or `professional` to change into the profile I want to use. It will ask you for your passphrase whenever you switch, but only then and not when you push/pull from remote.


&nbsp;

## Wrap Up

So there you have it. A couple of aliases to quickly switch between git profiles. If you wanted you can defintely add additional profiles (but I'm not totally sure of the use case for that). I hope this is able to help you be a little more efficient and able to accomplish something new. Thanks for reading!