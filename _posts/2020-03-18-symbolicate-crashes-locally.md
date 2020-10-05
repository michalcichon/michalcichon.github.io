---
layout: post
title:  "How to symbolicate crash logs locally in a more efficient way"
description: "Usually my crash logs get symbolicated on external services like Fabric or Firebase but from time to time it's more convenient for me to symbolicate on the local machine. I used to use a pair of clunky tools to achive that but fortunately there is quite hidden but nice to use tool from Xcode that can be used almost out of the box..."
date:   2020-03-18 09:00:00 +0200
categories: ios
keywords: crash logs
tags: ios tools
thumbnail: code.png
image: "assets/thumbnails/code.png" # Image for RSS
background: "#d74d00"
comments: true
---

Usually my crash logs get symbolicated on external services like Fabric or Firebase but from time to time it's more convenient for me to symbolicate on the local machine. I used to use a pair of clunky tools to achive that but fortunately there is quite hidden but nice to use tool from Xcode that can be used almost out of the box. 😏

First I had to add the location of `crashsymbolicate` into my PATH. By the way, I use Zsh and [Oh My Zsh](https://ohmyz.sh) which I recommend for all powerish users of macOS. The easier way to do it to edit `~/.zshrc` file:

```sh
vim ~/.zshrc
```

We uncomment and add `export PATH` part of the config. `crashsymbolicate` is a part of `DVTFoundation` but requires an additional export to the currently use Xcode path, so the easiest way to do so is to set `$(xcode-select --print-path)`. It should be assigned to `DEVELOPER_DIR` variable.

```sh
export PATH=$HOME/bin:/usr/local/bin:/Applications/Xcode.app/Contents/SharedFrameworks/DVTFoundation.framework/Versions/A/Resources:$PATH
export DEVELOPER_DIR=$(xcode-select --print-path)
```

![Configuration of PATH and DEVELOPER_DIR]({{site.url}}/assets/2020-03-18/zshrc.png)

If you still use Bash you can find your `PATH` variable defined in `~/.bashrc` file:

```sh
vim ~/.bashrc
```

Now, we can simply go to the location of our crashlog, copy the dSYM into the same location and run the script.

dSYM file can be found in App Store (formerly iTunes) Connect. Go to you application page, and on Activity tab click on a build and under "Includes Symbols" you should see "Download dSYM" link. If there is none, then you probably should check your build script. It is important to download dSYM from App Store Connect if you build with enabled bitcode (and it is enabled by default), because your binary is recompiled on App Store side and there is no other way to get those dSYMs then from App Store web service. If you don't use bitcode you can use dSYM generated with your build process.

```sh
symbolicatecrash MyApp.crash MyApp.app.dSYM > desymbolicated.crash
```

As you can see I use `>` to save the result of sybolicatecrash to a file. Thanks for that when we run this command, `desymbolicated.crash` can be than used with Xcode or analyzed in more readable form. 🙌