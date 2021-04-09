# Very Tiny Router

## A very tiny router (source agnostic) for Frontity.

### Router action

```jsx
const Button = () => {
  const { actions } = useConnect();

  const handleClick = () => {
    actions.router.set("/");
  };

  return <button onClick={handleClick}>Go Home</button>;
};
```

### Link component

```js
import Link from "@orballo/very-tiny-router/link";

const Component = () => {
  return <Link link="/">Go Home</Link>;
};
```
