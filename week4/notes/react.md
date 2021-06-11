# React

React is a library created by Facebook that is used to create Nice looking User Interfaces.

## Declarative

According to React, they make it easy to create User Interfaces that can manage the application state effectively and cleanly.

They also optimize the rendering of the browser for improved performance.

## Component-Based

React represents web pages and User Interfaces in general as something that can be composed of small units of the webpage, called "Components". Each of these small units has a visual aspect, some internal data, and potentially some logic associated with it.

Entire complex webpages can be produced simply by reusing and weaving these components together.

## Component LifeCycle

When these components are used in the application, they go through several phases.

- `Mounting`
  - The Component is actually added to the DOM and rendered
  - It will execute any logic that is associated with this component
  1. `counstructor()`: The component is instantiated
    - We don't worry about this in Function Components
  2. `getDerivedStateFromProps()`: Gets the properties that were passed into the component
  3. `render()`: The component is actually rendered from JSX
  4. `componentDidMount()`: Called when the component has been mounted
    - Used to add custom behavior that is executed right when the component is first mounted
- `Updating`
  - Once a component has rendered, it can be updated if its `props` or its `state` changes.
  1. `getDerivedStateFromProps()`: Gets the properties that were passed into the component
  2. `shouldComponentUpdate()`: Optimization function that can be used to avoid re-rendering when not needed
    - Basically skip renders to save performance
    - A function that returns a boolean
    - If the function returns true, then the render continues to happen
  3. `render()`: The component is once again rendered from JSX
  4. `getSnapshotBeforeUpdate()`
  5. `componentDidUpdate()`: Just like `componentDidMount`
- `Unmounting`
  - This is going to result in this component being removed from the UI
  `componentWillUnmount()`: Similar to `componentDidMount()`, but it has to happen before the component is actually removed
    - We can't execute logic from something that no longer exists

## Single-Page-Applications (SPA)

A SPA is an application (frontend) that represents itself as a single webpage in the browser. This page dynamically changes its content without having to navigate to a new page.

### Pros/Cons

This has a few benefits. Traditionally, for large-scale websites, it can take a significant of time to load a new webpage. Since the request has to potentially travel through multiple proxies, maybe across the country or globe, and then spend time to populate/render a webpage, before finally sending a response that once again has to be routed through many proxies.

Furthermore, this would have to happen on every single web page. Every time you wanted new content, you had to load a new webpage. This process had a lot of overhead.

The architecture of a Single Page Application removes that overhead. In many cases this does have a net positive effect, but not all the time.

In some scenarios, the client computer may be very weak. These computers will then be responsible to execute a LOT of JavaScript in order to dynamically strip out and replace the web page content.

On the other hand, Search Engine Optimization (SEO) is a significant factor.

Companies like Google have programs called "Web Crawlers" that will navigate to your website, and click on all of the links (anchor tags) and use that information to track what your webpage has. However, these web crawlers will not execute any JavaScript.

If your webpage consists of an empty html file and just a lot of JavaScript, then when the Web Crawler reaches your web page, it will not find any information or any links to click through.
Your web page will not properly be indexed by Google.

There are some techniques that can be used to mitigate this. But it is a weakness of SPAs.

### Design Approach

The idea is to represent an *entire website* from a single HTML file (with a lot of JavaScript).
This includes the different URL structures to show different "pages".

We generally accomplish this with libraries or tools called "Routers".
These allow us to associate Components with certain URL structures. So that we you "navigate" and change the URL structure, the library will remove the old Component and mount a new Component associated with the new URL.

If you are not using one of these "Routers", then you are not creating a Single Page Application, it would just be a single page. Note that this is perfectly fine to do if you don't intend to have a Single Page Application, like Facebook.

## JSX

Stands for JavaScript and XML. If you are TypeScript, then we refer to it as TSX (TypeScript and XML), but it's not big of a deal. Many people just use "JSX" to refer to both JavaScript and TypeScript versions. You can be technical if you'd like, but it doesn't matter than much.

### What is JSX exactly?

JSX is special syntax that is transpiled into JavaScript through Babel plugins. Realistically, JSX/TSX ultimately just becomes JavaScript.

The manner in which it works is similar to the following example:

```JSX
const someJSX = (
  <div className="container">
    <h1>This is my Header!</h1>
  </div>
);
```

This looks similar to HTML, but note that the normal `class` attribute is instead `className`.
This is because JSX is really just JavaScript, and JavaScript already has the `class` keyword in use.
As such, there are several HTML attributes that have been renamed due to reserved keyword clashes.

```JavaScript
const someDiv = document.createElement(div);
someDiv.classNames = 'container';

const someHeader = document.createElement('h1');
someHeader.innerHTML = 'This is my Header!';

someDiv.appendChild(someHeader);

const someJSX = someDiv;
```

JSX is simply syntactic convenience to make DOM manipulation easier to write.

```JavaScript
ReactDOM.render(
  someJSX,
  document.findElementById('body')
);
```

Would effectively transpile to

```JavaScript
document.findElementById('body').append(someJSX);
```

You can use custom Components inside JSX, as well as inject other JSX into JSX.

```JSX
const otherJSX = (
  <div>
    <CustomReactComponent />
    { someJSX }
  </div>
);
```

The `{}` curly braces are used to inject some information from JavaScript into the JSX.
This can pretty much be anything. Can be other JSX, it could strings.
You can perform entire flow-control operations inside

```JSX
const includeJSX = true;
const someOtherJSX = <p>The someJSX variable will not be displayed</p>;
const otherJSX = (
  <div>
    <CustomReactComponent />
    { incldueJSX ? someJSX : someOtherJSX }
  </div>
);
```
## Toolchains

A toolchain is just term to refer to the collection of group tools we generally work with in some technology stack.

For example, for our batch, NodeJS is part of our toolchain.
You *might* say that React is part of our toolchain.

Toolchain often refers to lower-level constructs than just libraries such as React.

NPM is part of our toolchain, along with the AWS CLI.

A tool that is part of the React toolchain is `Create-React-App`.
`Create-React-App` is just a script that is accessible through `npx`.

It is a useful script to create project templates that use React. It has all of the configuration already created for you, a bunch of libraries are already included in the package.json.

For example, Jest is already configured, etc.
Functions very similar to the `express-generator-template` and `express-generator-template-typescript` scripts.

Project configuration can get quite complex, especially since React needs to use Babel to transpile the JSX. Configuring Babel can be quite difficult.

What we will likely do is use `create-react-app` to generate our project templates and then we will take over any configuration that we want to change. We will probably configure ESLint manually. We'll probably configure Jest at least partially. Amongst others.

We *could* configure Babel manually, but it's a pain. I probably won't bother to do so.

However, it would be a FANTASTIC experience if you were to create and configure your React application entirely from scratch without `create-react-app`. Doing so requires knowledge of all of the underlying tools and configurations. You'll learn a lot. Fair warning, it's quite a lot of work.

Another tool that is part of this toolchain is `webpack`. Webpack is a module bundler.
There are plugins that can be used to tie in assets like images or css along with the javascript. There are plugins that work with webpack to work like the `nodemon` package. It's fairly involved.