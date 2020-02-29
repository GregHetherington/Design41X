# Design41X
React JS client side, Node JS server

By: Greg Hetherington

### Start Client and Server Proxy on same port
- `cd api`
- `npm run dev` 
- open `localhost:3000`

### Client Setup: React JS
- `cd api/client`
- `npm start` 
- open `localhost:3000`

### Server Setup: Node JS using Express
- `cd api`
- `npm start` 
- open `localhost:9000`

### How to Deploy
- `git add .`
- `git commit -am 'prepare to deploy'`
- `git subtree push --prefix api heroku master`