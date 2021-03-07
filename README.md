## Discord IP Bot

Got a dedicated server you want to run at home for your friends, but don't want to pay for a Dynamic DNS service to maintain a static IP?

This little webhook app for discord can solve that problem and you can run it on an old laptop, Pi or containerize it on the same host as the dedicated server.

### What it does

All this does is simply send a message to a channel of your choice (using a webhook) with the current IP of the server. Nothing more, nothing less.

## Setup

You can simply clone the repository and run:

```
yarn install
echo WEBHOOK_URL=<your-webhook-url> > .env
```

Replace <your-webhook-url> with the URL of the webhook.

## Running

Simply run the start script, `yarn start`.
