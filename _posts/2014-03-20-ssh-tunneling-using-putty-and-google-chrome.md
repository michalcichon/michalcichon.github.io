---
layout: post
title:  "SSH Tunneling using PuTTY and Google Chrome"
description: "I will show you how to configure a simple SSH tunnel with PuTTY and Google Chrome"
date:   2014-03-20 10:09:00 +0200
categories: tools
keywords: ssh, tunneling, ssh-tunneling
---

Sometimes we need to have a tunnel to pass our internet traffic trough external server. We usually do that when we have some limitations from our internet provider and want to enter pages we normally don't have access. In this short tutorial I will show you how to do that using PuTTY (SSH) and Google Chrome.

**Creating SSH Tunnel in PuTTY**
First thing we need to do is creating connection. Open PuTTY and configure your connection providing host address and port number. For SSH we use port 22.

![Step 1]({{site.url}}/assets/2014-03-20/tunnel-1.jpg)

Go to Connection → SSH → Tunnels option in the tree view (left panel).

![Step 2]({{site.url}}/assets/2014-03-20/tunnel-7.png)

Now we need to do as follows: choose Dynamic, fill in the source port (for example 9999, but feel free to use any available port) and click 'Add' button. Now it should be something in format D{PORT_NUMBER} on the list above. Click on 'Open'.

Next, log in to your server as usual:

![Step 3]({{site.url}}/assets/2014-03-20/tunnel-8.png)

Since now we have our own proxy server on 127.0.0.1:9999.

**Using a tunnel in Google Chrome**
Now the crucial part of the configuration. We need to configure proxy in Chrome. It is not intuitive because when we want to set it in Chrome by Chrome's setting, we get Control Panel and its Networking configuration. We don't want to change configuration for whole PC but only for Chrome browser so we need to do this other way.

In Firefox we have nice configuration manager when we can choose proxy server for Firefox itself but there is no such thing in Chrome. The solution is using parameters when we start the browser. We could provide them by Command Prompt by going to Google Chrome location and execute:

`chrome.exe --proxy-server="socks5://127.0.0.1:9999"`

But using Windows shortcuts is much easier. Just copy your Chrome shortcut to Desktop and change its name to something like Chrome - tunnel for easier recognition. Right click on it and choose `Properties` from the menu  (I have Polish version of Windows so it's `Właściwości` on my PC).

![Step 4]({{site.url}}/assets/2014-03-20/tunnel-5.png)

Now just provide parameters in Setting window and click on 'OK'.

![Step 5]({{site.url}}/assets/2014-03-20/tunnel-6.png)

Make sure you are providing the correct port number. I used 9999 but you can use whatever you want but the same in PuTTY and Chrome.

After these steps you should have your tunnel set up correctly.
