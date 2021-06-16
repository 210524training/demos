# React Router

As discussed previously, in order to create a Single Page Application, we must have the functionality of a "Router". Since React can be used without needing to be a Single Page Application, the Routing functionality is not embedded within the "React" dependency.

Instead, it is separated into several others. There are different dependencies dependeing on your environment. For example, there is `react-router-dom` and `react-router-native`.

React Router provides several components in order to simulate navigate between the different "pages" of the application.

- `Router`
  - Various categories of the Router component
  - `BrowserRouter`
  - `HashRouter`
    - Used legacy web browsers I think
  - `MemoryRouter`
    - Useful for non-DOM platforms
- `Link`
  - Effectively just an anchor tag, except not actually navigating to a new webpage
  - Allows us to have hyperlinks to other "pages" of our SPA
  - `NavLink`
    - The same as `Link`, except supports special styling when it is the active route
- `Route`
  - The means by which we define specific URIs associated with specific components
  - Supports different means of matching URI patterns
  - Default is a fuzzy match
    - As long the URI includes *at least* the route, it will be rendered
  - Alternatively supports `exact` matching
    - The entire URI must exactly match the route path
  - Has 3 different means of defining the contents of the Route
    1. Having nested children elements
      - Will act as the contents of the Route
    2. Use the `component` prop
      - May pass in a Component as the value, and it will be rendered
      - Cannot pass Props to the passed in Component
    3. Use the `render` prop
      - May pass in a callback, that will return the JSX to render when invoked
- `Switch`
  - Allows us to define multiple `Route`s underneath, and at most 1 `Route` will be rendered
  - If multiple `Route`s would match, only the first that matches is rendered
  - Note that if you do *not* use a `Switch`, all matching `Route`s will be rendered on top of each other
- `Redirect`
  - If this component gets rendered *at all*, then the user will be redirected to the configured destination

## API

React Router comes with its own APIs, which are listed on its homepage.

History, Location, Params, RouteMatch.

For any Components underneath the `Router` Component, `React-Router` can use the `withRouter` Higher-Order Component to provide access to each of the APIs injected into each Component's Props.

This is primarily used for Class Components, since Function Components can simply use Hooks instead. But note that Function Components would still have access to them through their props.

- `History`
  - The web browser provides forward and back buttons to navigate through your navigation history
  - It only operates on loading new webpages
  - Since Single Page Applications are only a single web page, we would not have access to these buttons
  - The `History` API adds functionality to add/remove from the browser history associated with our SPA "pages"
  - We can `push` onto the history (which navigates us to a new location)
  - We can `replace` the current location on the history
    - This also navigates us, but we cannot get back via the back button
  - We can `goBack` or `goForward`
  - It gives us access to how long our history is and other information
  - Important Note, this `history` object is mutable
    - Which violates the normal standards of React Props
    - This is important because without it, we could not `push` or `replace` the history
    - However, due to this, we lose certain guarantees, so it makes it more difficult to compare
      data (compares are based on memory location)
  - `useHistory` hook
- `Location`
  - Has metadata about the current route
  - In addition to the information about the path, when we push onto the history and navigate,
    we can associate metadata with the navigation
  - The `location` prop has access to that metadata under `state` property
  - `useLocation` hook
- `Match`
  - Information about the current route
  - Includes the route params
    - `useParams` hook
  - `MatchPath`
    - Has information about whether current route matches certain patterns
    - `useRouteMatch` hook