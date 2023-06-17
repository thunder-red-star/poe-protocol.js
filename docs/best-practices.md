# Best Practices
## General
* Make sure your bot server's intended URL is open to the internet. Open your port, use a reverse proxy like nginx, or use 
a service that you can create tunnels with like ngrok, localtunnel, or Cloudflare's Argo Tunnel.
* Ensure that you pass a bot auth key to the bot server. This is a 32 character string that is used to authenticate the
requests coming from the Poe server. This is passed in as the second argument to `bot.start()`.
* This library does not store any info about users. If you want to create your own cache for that, then do it however 
you want.