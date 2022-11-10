---
title: Simple Usage
order: 1
---

本 Demo 演示一行文字的用法。

```jsx
import React from "react";
import ReactDOM from "react-dom";
import UseRunInWorker from "use-run-in-worker";

let turn = 0;
function infiniteLoop() {
  const lgoo = document.querySelector(".animate");
  turn += 8;
  lgoo.style.transform = `rotate(${turn % 360}deg)`;
}

const App = () => {
  const numbers = [...Array(50_000)].map(() =>
    Math.floor(Math.random() * 1000000)
  );
  const [sortWorker, { status, kill }] = UseRunInWorker(bubleSort);

  React.useEffect(() => {
    const loopInterval = setInterval(infiniteLoop, 100);
    return () => clearInterval(loopInterval);
  }, []);

  return (
    <div>
      <p>运行效果请参考上方的 FPS </p>
      <p style={{ textAlign: "center" }}>
        <img
          className="animate"
          src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE3MDYuNjY3IiBoZWlnaHQ9IjE3MDUuMzMzIiB2aWV3Qm94PSIwIDAgMTI4MCAxMjc5Ij48cGF0aCBkPSJNNTkwIDM2Yy0yOC4yIDIuMy00MiA5LjMtNDYuNSAyMy43LTEuNiA0LjktMS43IDcuNC0uOSAyMC4yIDEuMyAyMS43LjkgMzMuNS0xLjQgNDAuNy01LjcgMTcuOS0yMS4zIDMwLjYtNDkgMzkuNy0zNS42IDExLjgtNjAuMSAxMC4yLTc2LjUtNS4xLTUuOS01LjYtMTAuMi0xMS44LTE4LjctMjctOC4zLTE1LTEyLjYtMjAuMy0xOS4xLTIzLjYtMTAuNS01LjItMjMuMi0zLjEtNDMuNCA3LjItMjQuMSAxMi4zLTQ0LjYgMjguNy01MC41IDQwLjUtNS45IDExLjctMy45IDIwLjEgOS42IDQwLjQgNC43IDcgOS45IDE1LjQgMTEuNSAxOC41IDcuOCAxNS4zIDcuNyAyOS43LS4xIDQ2LjUtOC43IDE4LjgtMzEuNiA0Mi45LTUwLjggNTMuNS0xNSA4LjMtMzAuNiA5LTQ2LjMgMi4xLTIuNS0xLjEtMTAuNC01LjYtMTcuNC05LjgtNy4xLTQuMy0xNS4yLTguNy0xOC05LjgtNi42LTIuNS0xNS0yLjUtMjAuOS4yLTExIDQuOC0yNS4xIDIzLTM3LjcgNDguNS05LjkgMjAuMi0xMi45IDM0LjEtOS43IDQ1IDIgNi45IDExLjMgMTUuMSAyNC44IDIyLjEgMzYuNCAxOC45IDQ2IDMyLjQgNDQuNyA2My0xLjMgMzIuMS0xMy45IDYyLjktMzAuOCA3NS43LTEwLjQgNy44LTIwLjUgOS45LTQ2LjcgOS43LTIxLjctLjEtMjYuMS44LTMzIDYuNy01IDQuMi04LjQgMTEuMy0xMC44IDIxLjktMi43IDEyLjItMi41IDQ4LjQuMyA2MS42IDQuMyAyMCAxMi4yIDI5LjYgMjYuOSAzMi43IDIuNy42IDEyIDEuNiAyMC41IDIuMiAzNS45IDIuNSA0NC42IDUuMiA1OC4yIDE3LjkgMTMuNyAxMi45IDI0LjcgNDMuOCAyNC43IDY5LjUgMCAxNi45LTMuOCAyNy4yLTEzLjkgMzcuMy01IDUtMTIgOS42LTMxLjQgMjAuNC0xMC41IDUuOC0xNSA5LjgtMTguMSAxNi4xLTUuMiAxMC40LTMuMiAyMS44IDcuMyA0My4zIDEyLjggMjUuOSAyNy44IDQ1LjIgNDAuMSA1MS45IDQuNCAyLjQgNyAzLjEgMTMuNiAzLjQgMTAuOC42IDE1LjUtLjkgMzcuNS0xMS43IDI3LTEzLjQgMzUuMS0xNC41IDU1LjgtNy45IDEyLjkgNC4xIDE3LjIgNi40IDI2LjMgMTQuMiAyMC43IDE3LjcgMzIuOCAzOC41IDMyLjggNTYuMSAwIDExLjItMi42IDE4LjEtMTQuNCAzNy45LTkuNCAxNS44LTExLjYgMjEuMy0xMS42IDI4LjkgMCAxNC45IDEzLjQgMjggNDkuNiA0OC43IDIwLjEgMTEuNCAyOC45IDE0LjQgNDAuNyAxMy44IDE0LjctLjggMjAuMy01LjYgMzQtMjguOCAxNy4zLTI5LjEgMjguMy0zNi4zIDU5LjQtMzguOSA2LjctLjUgMTMuMi0xLjUgMTQuMy0yLjEgNC0yLjEgMjEuOSAyLjUgMzUuNiA5LjEgMTUuNCA3LjUgMjUuNCAxNy45IDI5LjYgMzAuOSAxLjggNS41IDIuMiAxMCAyLjcgMzAuNS44IDI3LjQgMS40IDI5LjkgOS4xIDM2LjkgNy42IDYuOCAxNi45IDkuNyAzOS4zIDEyLjEgNy4zLjcgMTQuNSAxLjggMTYgMi40IDQuMiAxLjYgMjIuMyAxLjMgMjkuMi0uNCAxNC4yLTMuNyAyMi42LTkuOSAyNy43LTIwLjJsMy4yLTYuNi43LTIyLjZjLjYtMTkuNCAxLTIzLjYgMi45LTI5LjUgNC45LTE1LjMgMTQuMS0yNC45IDM3LjItMzguNSA0LjgtMi44IDkuNi02LjQgMTAuNy03LjkgNC44LTYuOCAzMy43LTExLjMgNTAuMi03LjggMTcgMy42IDI3LjEgMTIuOSA0MC44IDM3LjYgNy4yIDEzIDEyLjMgMTkuNCAxNy41IDIyLjUgOC43IDUuMSAxOC43IDUgMzUuOC0uNCA1LjEtMS42IDExLjMtMy4yIDEzLjctMy41IDUuMS0uOCAxNi41LTYuMyAyMy4zLTExLjIgNy4xLTUuMyAxOC0xNy40IDIxLjYtMjQuMiAxLjctMy4yIDMuOS04LjcgNC44LTEyLjEgMi42LTEwLjUuNC0xNi45LTEzLTM3LjctNC4yLTYuNC04LjUtMTQuMS05LjYtMTcuMS0zLTgtMy42LTE4LjQtMS42LTI3LjQgMS41LTYuNyAzLjYtMTEuNCAxNC40LTMyLjQgMS43LTMuMyAzLjYtNy40IDQuMi05LjEgMS43LTQuNyAxNC43LTE3LjQgMjQuMy0yMy44IDExLjUtNy43IDE5LjktMTAuNyAzMS4zLTExLjMgMTMuNy0uOCAxOSAxLjEgNDQuMyAxNS42IDEzLjQgNy42IDE5LjcgOS42IDI3LjcgOC44IDcuNS0uOCAxNC4zLTQuOCAyMi4yLTEzLjEgOC44LTkuMyAxNS4xLTE5IDIzLjQtMzYuMiAxMy43LTI4LjUgMTQuNC00NSAyLjQtNTYuOS0zLjktMy44LTguOS02LjktMjEuNi0xMy4yLTIzLjItMTEuNi0zMS4zLTE4LjktMzUuOC0zMi41LTguNy0yNi43LTIuOC02NS4xIDEzLjktODkuNCAzLjMtNC44IDEzLjktMTIuMyAyNi0xOC41bDguNC00LjIgMjEuNS0uN2MxOC41LS43IDIyLjMtMS4xIDI3LjItMi45IDE2LjctNi40IDIyLjgtMjUuOCAyMC43LTY2LjItMS42LTMwLjgtNy4zLTQ1LjQtMjAuMy01Mi4yLTUuMi0yLjYtMTUuMS0zLjItMzQuNy0xLjktOC43LjUtMTcuNC41LTIxLjUgMC0yMy41LTMuMS00MS44LTI0LjgtNTAuOC02MC41LTUuMS0yMC4xLTUuNi0zNS4zLTEuNS00Ny43IDQuMy0xMi43IDEzLjUtMjIgMzUuNC0zNS40IDE3LjEtMTAuNiAyMy43LTE2LjcgMjUuOS0yNC4yIDMuMS0xMC41IDEuMi0yMC03LjMtMzcuNS0xMi4yLTI0LjgtMzAuMi00OC00MS42LTUzLjUtNi41LTMuMS0xNC44LTMuNy0yMS40LTEuNS0yLjguOS0xMS4zIDUuOC0xOC45IDExLTcuNiA1LjEtMTYgMTAuNC0xOC43IDExLjgtMjUuMyAxMi43LTUxLjkgNC04MS4zLTI2LjctMjAuMy0yMS4zLTI3LjktMzkuOC0yMy45LTU4LjIgMS45LTkgNS4zLTE2LjUgMTQuMi0zMS45IDExLjEtMTkuMSAxMi42LTI3LjUgNy0zOC40LTUuMy0xMC41LTIxLjktMjMuNC00NS0zNC45LTE3LjEtOC41LTI1LjQtMTEuMy0zNS41LTExLjktNy40LS41LTkuMy0uMi0xMy44IDEuNy03LjggMy40LTEyLjIgOS4xLTIxLjggMjguNS00LjYgOS4zLTEwLjMgMTkuNS0xMi43IDIyLjUtMTQuNiAxOC40LTM5LjUgMjMuMS03NS4zIDE0LTM0LjQtOC43LTUyLjctMjMuNS01Ny40LTQ2LjQtLjctMy4yLTEuMy0xNC45LTEuNS0yNi0uMy0yMi40LTEuMy0yNy41LTYuNS0zMy44LTMuOC00LjYtMTMuMy05LjQtMjIuNC0xMS4zLTguOS0xLjgtMzIuMS0yLjYtNDUuNi0xLjV6bTY3LjYgMTg1YzM0LjYgMi4zIDYwLjYgNy42IDkxLjMgMTguNyAxMDEgMzYuNCAxODEuMSAxMTIgMjIzLjYgMjEwLjkgNi4xIDE0IDE1LjUgNDIuNCAxOS40IDU4LjYgNy42IDMwLjggMTAuNiA1Ni45IDEwLjYgOTEuMyAwIDI3LjUtMSA0MC41LTUuMSA2NC41LTIwLjggMTIxLjgtOTkuMyAyMjYuNi0yMTAuNSAyODEtODAuNiAzOS40LTE3Mi45IDQ5LjUtMjU5LjcgMjguNC01NC44LTEzLjMtMTA1LjYtMzguMy0xNTAuMi03My44LTE2LTEyLjgtNDYuOS00My42LTU5LjItNTkuMS02OS4yLTg3LjItOTcuNi0xOTYuMS03OS4yLTMwNC41IDcuNi00NC43IDI1LjItOTEuOSA0Ny45LTEyOC41IDIyLTM1LjQgMjkuNi00Ni4yIDQ0LjktNjMuNCAxMS4zLTEyLjcgMTYuNy0xNy41IDI4LjYtMjUuMyA0LjctMy4xIDE1LTEwLjUgMjMtMTYuMyAyOS45LTIyLjEgNDQtMzAuNiA4My41LTUwLjMgNDMtMjEuNSA1MS40LTIzLjkgOTktMjkuMSAzNi00IDYzLjgtNC45IDkyLjEtMy4xeiIvPjwvc3ZnPg=="
        />
        <br />由 JS 定时器驱动旋转
      </p>
      <button
        onClick={() => {
          console.log("开始 同步运行 ……");
          console.time("同步运行 耗时");
          console.log(bubleSort(numbers));
          console.timeEnd("同步运行 耗时");
        }}
      >
        同步运行
      </button>
      &nbsp;
      <button
        onClick={() => {
          console.log("开始 异步运行 ……");
          Promise.resolve()
            .then(() => {
              console.time("异步运行 耗时");
              return bubleSort(numbers);
            })
            .then((data) => {
              console.log(data);
              console.timeEnd("异步运行 耗时");
            });
        }}
      >
        异步运行
      </button>
      &nbsp;
      <button
        onClick={() => {
          console.log("开始 WebWorker运行 ……");

          console.time("WebWorker运行 耗时");

          sortWorker(numbers).then((data) => {
            console.log(data);
            console.timeEnd("WebWorker运行 耗时");
          });
        }}
      >
        WebWorker运行
      </button>
    </div>
  );
};

ReactDOM.render(<App />, mountNode);

const bubleSort = (input) => {
  let swap;
  let n = input.length - 1;
  const sortedArray = input.slice();
  do {
    swap = false;
    for (let index = 0; index < n; index += 1) {
      if (sortedArray[index] > sortedArray[index + 1]) {
        const tmp = sortedArray[index];
        sortedArray[index] = sortedArray[index + 1];
        sortedArray[index + 1] = tmp;
        swap = true;
      }
    }
    n -= 1;
  } while (swap);

  return sortedArray;
};

(function () {
  var script = document.createElement("script");
  script.onload = function () {
    var stats = new Stats();
    document.body.appendChild(stats.domElement);
    stats.domElement.style.cssText = `    position: absolute;    top: 0;    right: 50%; `;
    requestAnimationFrame(function loop() {
      stats.update();
      requestAnimationFrame(loop);
    });
  };
  script.src =
    "https://gw.alipayobjects.com/os/lib/stats.js/1.0.0/build/stats.min.js";
  document.head.appendChild(script);
})();
```

```css
.animate {
  width: 30%;
}
```
