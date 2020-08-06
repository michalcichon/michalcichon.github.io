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

I have been using [**SourceTree**](https://www.sourcetreeapp.com) almost since its first release in 2013 when I used it to work with Mercurial repositories. Since I started using Git as it became more popular solution for distributed version control system, I have been still using SourceTree as my main tool for Git repositories.

[**kdiff3**](https://kdiff3.sourceforge.net) is with me for even longer time as I installed it for the first time on my computer at work 9 years ago. I love how it automatically resolves merge conflicts.

# RescueTime

![Example of RescueTime report]({{site.url}}/assets/2020-02-17/rescuetime.png)

[**RescueTime**](https://rescuetime.com) is a handy tool to keep focus ever day. I usually check my stats when I close my day so I can verify how much time I spend on real development work and I can decide if there is something to improve next day.

# feedly

![SourceTree]({{site.url}}/assets/2020-02-17/feedly.png)

Cras ac dolor nec justo sollicitudin pretium sit amet sed ligula. Mauris odio metus, auctor elementum dapibus sit amet, aliquam sit amet enim. Aenean ut porta lectus. Fusce porttitor aliquam velit sit amet consectetur. Vivamus congue justo sit amet imperdiet luctus. Proin quis cursus mi, sit amet fringilla risus. Nam ultricies tincidunt lacinia. Nullam eu justo non elit semper tincidunt sed et massa. Fusce quis quam purus. Suspendisse hendrerit fringilla dolor ut porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse sit amet mi imperdiet, hendrerit mauris sit amet, semper ex. In maximus metus vel massa aliquet pretium. Curabitur vitae nulla porta, lobortis elit nec, pellentesque sapien. Nunc luctus, turpis id fermentum dignissim, lorem risus placerat ipsum, accumsan dapibus dui mi vel felis. Ut sed ornare augue, in imperdiet lorem.

# Basic unlined notebook

![SourceTree]({{site.url}}/assets/2020-02-17/notebook.jpg)

Cras ac dolor nec justo sollicitudin pretium sit amet sed ligula. Mauris odio metus, auctor elementum dapibus sit amet, aliquam sit amet enim. Aenean ut porta lectus. Fusce porttitor aliquam velit sit amet consectetur. Vivamus congue justo sit amet imperdiet luctus. Proin quis cursus mi, sit amet fringilla risus. Nam ultricies tincidunt lacinia. Nullam eu justo non elit semper tincidunt sed et massa. Fusce quis quam purus. Suspendisse hendrerit fringilla dolor ut porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse sit amet mi imperdiet, hendrerit mauris sit amet, semper ex. In maximus metus vel massa aliquet pretium. Curabitur vitae nulla porta, lobortis elit nec, pellentesque sapien. Nunc luctus, turpis id fermentum dignissim, lorem risus placerat ipsum, accumsan dapibus dui mi vel felis. Ut sed ornare augue, in imperdiet lorem.
