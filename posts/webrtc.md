---
title: 'webrtc app'

date: '2023-08-01'

---

Today I debugged my webrtc chat app, I had an issue of remote peer not connecting when they are on different network (one on wifi, the other on 
cellular. Naturally, I suspected the turn server setup is not good. So I spun up an ec2 instance on AWS and configured a CoTURN server.

Sadly that doesn't fix the issue either. Then I looked into the remote peer connection status log and webrtc internals page. And I noticed that
the peer connection is exchanging ice candidates, but the connection failed to establish. Maybe it's because there is not suitable ice candidate pair?
How does ice candidates work? I need to dig deeper tomorrow.

