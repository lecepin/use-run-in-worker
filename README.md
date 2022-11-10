# Run In Worker

## Install

```
npm i -S use-run-in-worker
```

## Usage

#### For React Hooks

```jsx
import UseRunInWorker from "use-run-in-worker";

const [sortWorker, { kill }] = UseRunInWorker(function () {});

sortWorker(numbers).then((data) => {
  console.log(data);
});
```

#### For CDN

```html
<script src="https://unpkg.com/use-run-in-worker/dist/runInWorker.js"></script>

<script>
  const run = runInWorker(function () {});

  run.start(1, 2).then(() => {});
</script>
```

---

modified from alewin/useWorker.
