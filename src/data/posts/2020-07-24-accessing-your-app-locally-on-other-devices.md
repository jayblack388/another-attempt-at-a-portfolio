---
title: "Accessing Your App Locally on Other Devices"
tags: ["dev", "server", "cross device", "localhost", "cli"]
excerpt: "Ever needed to access your development server from another device?"
date: "7-24-20"
---

## Motivation

I recently needed to test some ui across a few different devices that I own (mac, pc, iphone) and didn't want to get into something like browserstack or virtual machines to test each one out. I found that from my Mac, I could host my react app and rails server at 0.0.0.0, and I could access either app from my local ip followed by the target port. I thought this was pretty cool because I got the hot reloading from React across all three of my devices. First you'll need to...

### Start your App from a Bound IP

```shell
  # for react app, needs the HOST environmental variable first, or in a .env file
  HOST=0.0.0.0 yarn start 
  # for rails app, -b flag is for ip binding, can use other flags in conjunction as well
  rails server -b 0.0.0.0 
```

Then on the same device you'll want to...

### Retrieve your local IP address

#### Windows

Open your terminal of choice and type

```shell
  ipconfig
```

Then look for your `IPv4 Address` in the returned list, that's your local IP address, it typically starts with 192.168

#### Mac

Open your terminal of choice and type

```shell
  ipconfig getifaddr en0
```

The returned value is your local IP address, it typically starts with 192.168

### Access your app from another device

Now from another device you can go to your browser (or make requests to)

```shell
  http://<YOUR_LOCAL_IP>:<PORT_WHERE_APP_IS_HOSTED>
  # typically it looks something like
  http://192.168.1...:3000
```

### Wrapping up

🚀 Cool! So now you can visit your page and do some cross device testing, or access a development api from a separate development app (probably some more use cases I haven't thought of). And, like I mentioned if you're working on a React app (or something else with hot reloads) you'll see those updates in any device that's connected.
