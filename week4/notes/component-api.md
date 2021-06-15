# Component API

The Component API is the collection of structural characteristics that make up a component.

For example, we have the Props API and State API. Along with that, we have Context, among others.

- `Props`
  - Data that is handed to a component as HTML attributes
  - This data is immutable
  - When props are changed by a parent component, the component will be updated
  - For function components, props are the input parameters of the function
- `State`
  - Internal data of a component
  - Function Components use the `useState` hook
  - Class Components declare a member variable called `state`
    - Note that Class Components can only have 1 variable called state, and all data must be properties underneath state
      - It becomes very important to spread the state as you use `setState`
    - Function Components can declare multiple, independent, fields of data with multiple calls to `useState`
  - State is mutable (sort of)
    - Technically, it is immutable, but we are provided a setter function that will produce new immutable data
      in its place
      - This has implications in other areas of React, such as how the `useEffect` hook will "snapshot" props and state
  - There is an anti-pattern where some might declare state in a component with the same value as a prop
    - This is not recommended, becuase you do not want to duplicate data
    - If the parent component changes the prop, the child component will not see the updated change
    - One exception to this is if you might rename the incoming prop to `defaultColor` or similar,
      which clearly conveys the meaning that if the default changes, the child component does not necessarily need to update
    - You make sure that the prop is named in a fashion that makes the interaction of the duplicated data clear
- `Context`
  - Context is an API to attempt to provide some form of global state so that large component hierarchies
    do not need to pass props over and over again.
  - It is structured in a manner where you create a "Context" as a container for some data
    - E.g User Data
  - You wrap the entire Component Hierarchy in a Context "Provider" tag/component, which provides access to that
    context to all children
  - For any specific child component, they can access it, by wrapping themselves in a "Consumer" component
  - Particularly so for Class Components, Context became clunky to use when providing and consuming multiple pieces of data
    - One idea people had was to store all of their data within a single context
    - The downside to this is that all components use any of the data will re-render even when unrelated data changes
    - Causes a significant loss
- `Refs`
  - A way to provide a reference to a DOM element
  - Class Components would use `createRef`
  - Function Components would use `useRef` hook
  - Refs come in 2 varieties: Mutable and Immutable
    - Depends on the type declarations
    - Once transpiled to JS, all refs are mutable
- etc

```typescript
const context = React.createContext<User>(iniitalData);
export default context;
```

```jsx
import userContext from 'location';

function MyComponent() {
  return (
    <userContext.Provider value={initialData}>
      <MyNestedComponent />
    </userContext.Provider>
  );
}
```

```jsx
import React, { useContext } from 'react';
import userContext from 'location';

function MyNestedComponent() {

  const [userData, setUserData] = useContext(userContext);

  // Return JSX
}
```

```jsx
import userContext from 'location';

class MyNestedComponentClass extends React.Component {

  render() {
    <userContext.Consumer>
    { value => /* Some JSX that is created using value */}
    </userContext.Consumer>
  }
}
```