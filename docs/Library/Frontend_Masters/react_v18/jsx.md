# JSX  

Vite prefers the tags to end in `.jsx`. But for the most part, .jsx is interchangable 
with `.js`.  

## Setting up a Proxy Server with Vite  

For this example, there is a local server running on port 3000 that contains 
apis. The Vite React project is running on port 5173. To eliminate CORS errors, 
Vite can establish a proxy server and tells the react project that the *target*, 
which is the api server, is actually running on port 5173 also. This will give 
the appearance that both the frontend client and the api server are on the same 
port.  

Inside of `vite.config.js`, modify it to look like this:  

``` json title="vite.config.js"  

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/public": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});

```

To run the api server, it is found in the supplied code for repository 
`citr-v9-project` by Brain Holt. There is a folder called `api`. Open a command 
prompt from that folder. Run `npm i`, then `npm run dev` to get the server running.  

!!! tip ""
	
	When building component, like Order component, it is better to declare 
	it with `function` rather than as an annonymous function. A component created 
	with `function` will show up in the console as a function if there is an error 
	or for logging. Annonymous functions are not identified as function, making tracing 
	them down in the stack trace a little harder.  

The parenthesis on arrow functions means *continued on next row*:  

```js  
{cart.map((item, index) => ( <!-- This parenthesis here -->
<li key={index}>
  <span className="size">{item.size}</span> –
  <span className="type">{item.pizza.name}</span> –
  <span className="price">{item.price}</span>
</li>
))```
