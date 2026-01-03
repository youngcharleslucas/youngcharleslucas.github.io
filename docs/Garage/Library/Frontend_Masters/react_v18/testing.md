# Testing  

## Vitest Setup  

[Resource for final test project](https://github.com/btholt/citr-v9-project/tree/main/14-testing)  

Vitest replaces Jest, but mimics Jest.  

Install the following:  

`npm install -D vitest@2.1.3 @testing-library/react@16.0.1 happy-dom@15.7.4` 

Create a folder src =\> `__tests__`. It is a magical name meaning that the testing 
will be looking for this name. All files inside this folder will be inside considered 
tests.  

It is good practice to label all the test files with the suffix `test`, like 
`App.test.jsx`.  

Add a script inside of `package.json` for executing Vitest:  

`"test": "vitest"`  

In the `vite.config.js` file add the following after and at the same level of 
"pluggins":  

```json  
test: {
  envirionment: "happy-dom", 
} 
```  

**Note**: happy-dom will probably be replaced by playwright in the future. 

Execute all test with:  

`npm run test`  
or  
`npm test`  
or  
`npm t`  


### Clean up 

The `screen` object holds on to state. So previous test results will show up in 
new tests. To clear the old test, one way is to add `cleanup` and `afterEach` to 
the test component:  

```js  
import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";  

afterEach(cleanup);
``` 

You could also call cleanup() at the end of every test method instead.  

Adding async to the testing methods has no negative affect if the component does 
not call async. His examlpes use async just in case the component gets an async 
method in the future:  

` test("alt text renders on image", async () => { ...`  

### Vitest Mock  

Install:  
`npm i -D vitest-fetch-mock@0.3.0`  

The mock api is in the file `contact.lazy.node.test.jsx`  

some things that are being tested:  
```js  
const requests = fetchMocker.requests(); <!-- Everything returned by mocker ---> 
expect(requests.length).toBe(1); <!-- Make sure only one call was returned ---> 
expect(requests[0].url).toBe("/api/contact"); <!-- Called the right api ---> 
expect(fetchMocker).toHaveBeenCalledWith("/api/contact", {
body: JSON.stringify(testData),
headers: {
  "Content-Type": "application/json",
},
method: "POST",
});
```

## Testing Custom Hooks  

`usePizzaOfTheDay.node.test.jsx` is the test hook example. The code below is what 
is going on:  

```js  
import { expect, test, vi } from "vitest";  
import {render } from "@testing-library/react";  
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../usePizzaOfTheDay"' 

const fetchMocker = createFetchMock(vi);  
fetchMocker.enableMocks();  

const testPizza = { 
  id: "calabrese", 
  name: "The Calabrese Pizza ", 
  category: "Supreme", 
  description: "lol pizza from Calabria", 
  image: "/public/pizzas/calabrese.webp", 
  siz: { S: 12.25, M: 16.25, L: 20.25 }, 
};  

// A hook cannot exist outside of a component. So a component for the hook must be made:  

function getPizzaOfTheDay() {
  let pizza; 
  
  function TestComponent() {
    pizza = usePizzaOfTheDay(); 
    return null;  
  }
  
  render(<TextComponent />); 
  
  return pizza;
}  

test("gives null when first called", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza)); 
  const pizza = getPizzaOfTheDay(); 
  expect(pizza).toBeNull();  
});  
```

If you look at the example in the git repository, it is simplified to use 
`renderHook()` which generates mock data instead of calling `fetch.mockResponseOnce()`. 


## Snapshot Testing  

Low effort and low accuracy for coverage of 100% of the code. Because it isn't the 
most accurate at testing, it is not considered reliable. It is easy to implement 
though.  

For the Cart component:

Cart.text.jsx  

```js  
import { expect, test } from "vitest"; 
import { render } from "@testing-library/react"; 
import Cart from "../Cart";  

test("snapshot with neothing in cart", () +> {
  const { asFragment } = render(<Cart cart={{}} />); 
  expect(asFragment()).toMatchSnapshot();  
});  
```  

This will generate a folder called "__snapshots__". What is happening is that a 
file is being created of what the component is suppose to look like. Then every 
following time that the component is rendered, it is compared to the snapshot.  


## Vite Code Coverage  

Install:  

`npm i -D @vitest/coverage-v8@2.1.3`  

In `vite.config.js` add the following underneath `plugins`:  

```js  

test: {
  environment: "happy-dom", 
  coverage: {
    reporter: [ "text", "json", "html"], 
  },
},

```  

Inside of package.json scripts add:  

```json  
"coverage": "vitest --coverage"  
```  

Then to execute the test coverage report `npm run coverage`.  The results 
generated will appear in the console and also a new directory will be created in 
the root folder containing an html document displaying the coverage.  

### Vitest UI  

Another fun little tool let's you use is Vitest UI. It allows you to see and 
manage all your tests from the web browser. Let's add it.

```
npm i -D @vitest/ui@2.1.3
```

And in your package.json

```
// in scripts
"test:ui": "vitest --ui"
```

Now from the command line run npm run test:ui and it should pop up your browser 
with the Vitest UI open. Super convenient, particularly in places you need to 
run individual tests repeatedly and you don't have the VS Code extension. The 
module graph is a cool visualization as well.  

Install the `Vitest` VS Code extension.  

### Browser Test  

Playwright offers browser testing. It is still experimental in this 
turtorial, so I am not going to include it.  


## Istanbul  

React 19 may not support the V8 version of testing used earlier. In that 
case, you will have to install `Istanbul` for code coverage.  

Intall:  
`npm install -D @vitest/istanbul`  

Then move the coverage configuration to the vitest.workspace.js file:

```js  

export default defineWorkspace([
  {
    extends: "./vite.config.js",
    test: {
      // ...
      // add to the end of the happy-dom test object 
      coverage: {
        provider: "istanbul"
        reporter: ["text", "json", "html"],
      },
    },
  },
  {
    extends: "./vite.config.js",
    test: {
      // ...
      // add to the end of the browser test object 
      coverage: {
        reporter: ["text", "json", "html"],
      },
    },
  },
]);
```



