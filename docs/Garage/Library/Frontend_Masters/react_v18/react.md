# React  

### Strict Mode  

The intention of \<StrictMode\> is to inform developers of legacy code or updating 
changes that will have an impact on the future of the code. 

Strict mode double renders everything.  

### Custom Hooks  

Placing effects in custom hooks allow you to *test* the function. A custom hook 
is essentially a function calling another function. An example of a custom hook 
is in the file `usePizzaOfTheDay.jsx`. The custom hook, wich contacts an api, 
is called in the componenent `PizzaOfTheDay.jsx`.  

Naming the custom hook with the prefix `use` can potentially allow the React linter 
to catch errors in the hook.  

### useDebugValue()  

It creates a debug variable name for your values. Look at the example in 
`usePizzaOfTheDay.jsx`. When the project is running, you can check the 
`pizzaOfTheDay` variable in the inspector. There will be a snake case debug variable 
in the inspector.  

### React forms  

It is recommended to use `<button type="submit">` vs `<button onClick={()=>}>` 
because submit allows the user to submit the form by hitting `Enter`, as well as 
clicking the button.  

### Tanstack Router  

Focused on client-side routing.   

React Router would work as well. It does more server-side rendering.  

Install Tanstack:  

```  
npm install @tanstack/react-router@1.65.0
npm install -D @tanstack/router-plugin@1.65.0 @tanstack/router-devtools@1.65.0
```  

Add Tanstack to vite.config.js:  

```js title="vite.config.js"  
// at top
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// add before react() in plugins
plugins: [TanStackRouterVite(), react()],  
```

Add a new folder under `src` called `router`. Add a root folder, `__root.jsx` in 
that folder. This root fill will contain the root attributes that all routes will 
inherit. 

!!! tip ""  

	The `__` double underscore is called "dunder score". It is from python.  

Inside of `App.jsx`, add:  

``` js title="App.jsx"  
import { RouterProvider, createRouter } from "@tanstack/react-router";
import {routeTree } from "./routeTree.gen";

const router = createRouter({routeTree});  

const App = () => {

  return (
    <!-- Stuff -->  
    <RouterProvider router={route} />  
  );
};
```  

Create an index route in the file `index.lazy.jsx` located inside the `src +> routes` 
folder.  

  
``` js title="index.lazy.jsx"  
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
	<!-- code -->
  );
}
```

Move the components using the Tanstack rouning into the `routes` folder. Change 
the name of the component to lower case. Add `.lazy` before the file type. This 
will lazy load the component. Example is moving `Order.jsx` to `src => routes` 
and renaming to `order.lazy.jsx`.  

Inside the `order.lazy.jsx`, add code to give the component a route:    

``` js title="order.layz.jsx"  
import { createLazyFileRoute } from "@tanstack/react-router";  

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

function Order() {
  return (
    <!-- code -->
  );
};

export default Order;
```  

### Tanstack Query  

[Resource](https://github.com/btholt/citr-v9-project/tree/main/10-query)

Handles some of the function as `useEffect()`?  Built in caching. Always use this 
for api, is his recommendation.  

Install Tanstack Query:  

```  
npm i @tanstack/react-query@5.59.13
npm i -D @tanstack/react-query-devtools@5.59.13 @tanstack/eslint-plugin-query@5.59.7  
```  

Add this to the eslint.config.mjs file:  

```js title="eslint.config.mjs"  
// at top
import pluginQuery from "@tanstack/eslint-plugin-query";

// under reactPlugin.configs.flat["jsx-runtime"]
...pluginQuery.configs["flat/recommended"],

```  

Let's also add the dev tools, like we did for the router. In src/routes/__root.jsx:  

```js title="__root.jsx"    
// at top
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// under router dev tools
<ReactQueryDevtools />
```

Finally, we need to add the QueryClient. In App.jsx, add: 

```js title="App.jsx"   
// Add imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a property under the router
const queryClient = new QueryClient()

// Add the provider to the app
<QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
</QueryClientProvider>
```  

So react-query makes interacting with APIs very simple and makes it easy to read. 
You just read a hook and it'll either give you a isLoading status or the data. 
Once the data comes back, it'll refresh the component with the data. So let's start 
by writing our very simple fetch call. Create a folder called `api` inside of `src` and 
create `getPastOrders.js` and add:

src =\> api =\> getPastOrders.js:  

```js title="getPastOrders.js" 

export default async function getPastOrders(page) {
  const response = await fetch(`/api/past-orders?page=${page}`);
  const data = await response.json();
  return data;
}
```

Very simple request to an API that returns data. That's it!

Let's now go make `past.lazy.jsx` inside of `routes`: 

```js 

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders";

export const Route = createLazyFileRoute("/past")({
  component: PastOrdersRoute,
});

function PastOrdersRoute() {
  const [page, setPage] = useState(1);
  const { isLoading, data } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });
  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>LOADING …</h2>
      </div>
    );
  }
  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
```

`queryKey` inside of `useQuery()` is a key for a cache. If the query has been run 
before, the browser may have that query saved in cache. So, the browser will be 
quicker and just return the cahce, using the `queryKey`. Similar to Redis.  

useQuery() returns a lot of `is---` variables. Check them out, like `isLoading`.  

### Creating Modals  

[Resource](https://github.com/btholt/citr-v9-project/tree/main/11-modals)  

Create a file in src called `Modal.jsx`. Look at the code in the resource file. 
`useRef()` can only point at on thing, that is the `.current` of the elRef object. 
The object does not change? It is consistent through re-renders.  

Inside the useEffect() of the Modal.jsx file, a dispose type action needs to be 
performed:  

`return () => modalRoot.removeChild(elRef.current);`  

This is because every time the modal is called, it is creating a new modal 
\<div\> and not disposing the old one. This is preventing a **memory leak**.  

Inside of `past.lazy.jsx` there is `enabled` inside of useQuery. Using this will 
reach out to that cache and check for the requested object first? Double exclaimation 
is just converting truthy and falsy. It may not be required.  

```js  
  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    enabled: !!focusedOrder,
    staleTime: 24 * 60 * 60 * 1000, // one day in milliseconds,
  });
```


### Error Boundaries  

[Resource](https://github.com/btholt/citr-v9-project/tree/main/12-error-boundaries)  

An alternative to the React ErrorBoundary is found on npm [react-error-boundary](https://www.npmjs.com/package/react-error-boundary). 
This tutorial though uses the react version. If there is an error in the code, 
rather than allowing the whole app to crash, the error is contained within a 
boundary.  

This way requires a class component. Class components cannot use hooks.  

The example below shows a page that has a button to redirect back to the home page 
if there is an error. The error is suppose to be printed in the dev console in the 
web browser.  

ErrorBoundary.jsx:  

```js  
// mostly code from reactjs.org/docs/error-boundaries.html
import { Component } from "react";
import { Link } from "@tanstack/react-router";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this listing. <Link to="/">Click here</Link>{" "}
            to back to the home page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

The Error Boundary component must wrap the component that it is creating a boundary 
around. If it is within the component, it will not catch the error:  

```js  
function ErrorBoundaryWrappedPastOrderRoutes(props) {
  return(
    <ErrorBoundary> 
	  <PastOrderRoute {...props} /> 
	<ErrorBoundary>  
  );
}
```

### Uncontrolled Forms  

[Resource](https://github.com/btholt/citr-v9-project/tree/main/13-uncontrolled-forms)  

Uncontrolled means that the state is not being managed by the state of React. 

This is written in the src =\> api =\> `postContact.js` file.  
A new file is added in src=\> routes =\> `contact.lazy.jsx`.  

`useMutation()` from Tanstack is a form of `PUT` and `PATCH`.  
