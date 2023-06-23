---
title: 'WebRTC App Ideas'
date: '2023-06-03'
---

Today I want to summarize the work I have been doing with my webrtc learning.

At first my goal was to build and deploy a remote camera app hosted on website with no/low cost. The problem it trys to solve is to make use of old phones and use them as security cameras/monitors in your home. Ideally it should require some sort of tri-pods to fix the camera angles but that was not a concern initially.

## Initial Success

I started with a vue js frontend, and got it working fairly well with interval uploads to s3. Made it to a point where user can set up timer and upload small videos (5s) to s3, and created an api gateway to handle the security of it.

## First Try

Then I started testing my backend skill to try to implement a barebone signal server in C and libwebsockets. Got it to the point of providing working websocket connections to clients to handle the initial signalling process. But fell short when trying to set up https. I have configured the app to find the certificates in the provided directories, but no secure connections are opened.

## Second Try

Then I re-wrote the entire thing in node with express, and https and ws, was able to serve secure connections finally. And then, with help of docker, I was able to set up and run both signal server and coturn server on a single vm borrowed on GCP. Then the app was running pretty smoothly.

## Issues

However, the cost of a 1-core (.5 to 2 actually) and 1gb server is around 7 dollars per month. Plus I do not have any trusted SSL certificate so everytime I want to connect, I would need to first load the API and manually trust it in any modern browser before trying to connect.

## Failed attempt to address

Then I started optimizing. I noticed that GCP cloud run has a free tier and would automatically expose a https endpoint so I don't even need my own certificates, that is two birds in one stone. So I happily tried uploading the docker container for my node server to cloud run from GCP, but found out that it's actually hard to make it work the same way as vm because it kept trying to spin up a brand new instance whenever a new request comes in, and the server logic is built on an in-memory storage that different request have shared access on.

## Delimma

Now I am in a delimma where I'm not sure where to go next.

On one hand, I can keep the working project on a dedicated VM and throw 7 dollars away each month, while trying to find a good cert provider. Or delegate the in-memory storage to another free database provider on GCP like firebase. It might be a challenge to emulate the client-client communication channel that WebRTC signal process requires. The key there would be to find a way to add event listener on new rows being added.

If I can draw a diagram to see what the process is like, maybe I can design a websocket-less equivalent api server with persistent storage.

I can also look into kubernetes and how it could help me with managing the service, but that likely won't be free.