---
layout: post
title:  "My favorite tools to boost productivity"
description: "On my daily basis I use a lot of different tools which I believe boost my productivity. In this short article I would like to list them and give you a few words on why I choose to use them and how I benefit from using them."
date:   2020-02-17 09:00:00 +0200
categories: ios
keywords: productivity zsh 
tags: tools
comments: true
---

On my daily basis I use a lot of different tools which I believe boost my productivity. In this short article I would like to list them and give you a few words on why I choose to use them and how I benefit from using them.

# Zsh and Oh My Zsh

![Oh My Zsh]({{site.url}}/assets/2020-02-17/zsh.png)

[**Z shell (Zsh)**](https://en.wikipedia.org/wiki/Z_shell) is a nice replacement for the standard Bash shell. I like the way **Z shell** recursively expands and completes paths and variables, and how it deals with the spelling correction. This is a definitelly a huge boost when I use Terminal. I am not a power user of Unix nevertheless I feel the difference and there is [**Oh My Zsh**](https://ohmyz.sh) that helps configuring Zsh to make the overall experience even better. I highly recommend these tools.

**Zsh** is available by default on macOS and it is easy to change the default shell with the following command.

```bash
chsh -s /bin/zsh
```

Installing **Oh My Zsh** is also easy and the one-line command used to fetch and run the instalation script is available on [their website](https://ohmyz.sh).

# iTerm, vim and aliases

![My Vim setup]({{site.url}}/assets/2020-02-17/vim.png)

Sometimes I need to modify files on a remote server. I use my own `.vim` configuration that I created by adjusting some example I found online. On mac I use [**iTerm2**](https://www.iterm2.com) which is, I believe, a nice replacement for the built-in macOS Terminal. It also gives some autocompletion features available by `⌘+;` shortcut, themes etc.

As I abovementioned I'm not a unix power user so I utilize heavely on aliases. In my `.zshrc` you can find a lot of aliases like this one:

```sh
alias git-remove-issue-branches="git branch | grep \"issue/\" | xargs git branch -D"
alias git-remove-orig-files="find . -name '*.orig' -delete"
```

# SourceTree and kdiff3

![SourceTree]({{site.url}}/assets/2020-02-17/sourcetree.png)

I have been using [**SourceTree**](https://www.sourcetreeapp.com) almost since its first release in 2013 when I used it to work with Mercurial repositories. When I started using Git as it became more popular solution for distributed version control system, I was still using SourceTree as my main tool for Git repositories.

[**kdiff3**](https://kdiff3.sourceforge.net) is with me for even longer time as I installed it for the first time on my computer at work 9 years ago. I love how it automatically resolves merge conflicts. I like the way it allows to check base, local and remote changes on one screen. Simple and useful. 

# RescueTime

![Example of RescueTime report]({{site.url}}/assets/2020-02-17/rescuetime.png)

[**RescueTime**](https://rescuetime.com) is a handy tool to keep focus ever day. I usually check my stats when I close my day so I can verify how much time I spend on real development work and I can decide if there is something to improve next day.

# feedly

![SourceTree]({{site.url}}/assets/2020-02-17/feedly.png)

Sometimes I need a few minutes to learn about what's happening in the world around me, but I don't like to waste my time searching for information or browsing news websites. That's why I subscribe to some RSS sources that I believe are worth reading. [**feedly**](https://feedly.com/) is a perfect tool to easily manage [RSS](https://en.wikipedia.org/wiki/RSS) I can recommend to everyone who is not afraid of ancient technology like RSS and wants to organize their news sources.

# Basic unlined notebook

![SourceTree]({{site.url}}/assets/2020-02-17/notebook.jpg)

The last and the most important tool I use every day is a plain, unlined notebook. I tried many todo apps, Evernote, OneNote etc. but the flexibility that comes with using a basic paper and pen is something I can't easily substitute. 
