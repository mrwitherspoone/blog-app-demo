# Blog with Nested Comments

## Description
This is an app written with a node back-end and a React SPA front-end. The simple 
frontend lists the blog and comments entries.  It uses the back-end to do all the regular crud options.
The back-end uses json files as it's persistance store.

## Requirements
* back-end API
    * CRUD operations for a post (minimum fields: title, author, content, timestamp)
    * CRUD operations for comments (minimum fields: author, content) on a post, including threaded comments. Threaded comments means that a comment can be a reply to the post itself, or to another comment on the post, thus leading to a thread of comments.
    * Persisting the data somewhere (this can even be in memory)
* front-end
    * Create a simple React application that consumes the API and interacts as an interface for the endpoints. Use whatever React setup you prefer, as long as you can explain your choices.
    * The interface should match functionality to the CRUD endpoints in the API, meaning you can create, update, edit and delete posts and comments. 
 
## Installation
I won't belabor you with overly detailed instructions, or production deployment level documentation.


The React front-end requires > Node 14. In fact if you want to skip over a bunch of deprecation warnings you might want to nvm use 14 when building the UI.

To start the back-end rest API (runs on port 3000):

```bash
cd blog-api
npm install
npm start
```

To start the front-end React app in development mode (runs on port 5000)

```bash
cd blog-ui
npm install
npm start
```

To bundle up the front-end for faster non-dev performance
```bash
cd blog-ui
npm install
npm run build 
npm run-script start:prod
```


App should now be available in your browser
```
http://localhost:5000/
```


## Development
Since this is an example app, things that would normally be done in production are missing such as real logging, unit tests, careful css design (it is really, really ugly ), UX fineries like loading indicators, performance improvements, monitoring, etc.

I did use Typescript for the back-end because, I like it better and can develop in it much faster. The data layer ws abstracted away in a file, like you would in real life so that you could swap it away for a real persistance layer. I did skip cleaning up orphaned comments when parents are deleted chalking that up to an academic exercise.  The naming conventions I used in the React app are off, but I wanted to get this to you sooner rather than later.