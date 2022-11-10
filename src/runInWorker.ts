import createWorkerBlobUrl from "./lib/createWorkerBlobUrl";
import WORKER_STATUS from "./lib/status";

type WorkerController = {
  getStatus: () => WORKER_STATUS;
  kill: Function;
};

enum TRANSFERABLE_TYPE {
  AUTO = "auto",
  NONE = "none",
}

type Options = {
  timeout?: number;
  remoteDependencies?: string[];
  autoTerminate?: boolean;
  transferable?: TRANSFERABLE_TYPE;
};

const PROMISE_RESOLVE = "resolve";
const PROMISE_REJECT = "reject";
const DEFAULT_OPTIONS: Options = {
  timeout: undefined,
  remoteDependencies: [],
  autoTerminate: true,
  transferable: TRANSFERABLE_TYPE.AUTO,
};

const runInWorker = <T extends (...fnArgs: any[]) => any>(
  fn: T,
  options: Options = DEFAULT_OPTIONS
) => {
  let workerStatus = WORKER_STATUS.PENDING;
  let worker: Worker & { _url?: string };
  let isRunning = false;
  let promise: {
    [PROMISE_REJECT]?: (result: ReturnType<T> | ErrorEvent) => void;
    [PROMISE_RESOLVE]?: (result: ReturnType<T>) => void;
  } = {};
  let timeoutId: number;

  const setWorkerStatus = (status: WORKER_STATUS) => {
    isRunning = status === WORKER_STATUS.RUNNING;
    workerStatus = status;
  };

  const killWorker = () => {
    if (worker?._url) {
      worker.terminate();
      URL.revokeObjectURL(worker._url);
      promise = {};
      worker = undefined;
      window.clearTimeout(timeoutId);
    }
  };

  const onWorkerEnd = (status: WORKER_STATUS) => {
    const terminate =
      options.autoTerminate != null
        ? options.autoTerminate
        : DEFAULT_OPTIONS.autoTerminate;

    if (terminate) {
      killWorker();
    }
    setWorkerStatus(status);
  };

  const generateWorker = () => {
    const {
      remoteDependencies = DEFAULT_OPTIONS.remoteDependencies,
      timeout = DEFAULT_OPTIONS.timeout,
      transferable = DEFAULT_OPTIONS.transferable,
    } = options;

    const blobUrl = createWorkerBlobUrl(fn, remoteDependencies!, transferable!);
    const newWorker: Worker & { _url?: string } = new Worker(blobUrl);
    newWorker._url = blobUrl;

    newWorker.onmessage = (e: MessageEvent) => {
      const [status, result] = e.data as [WORKER_STATUS, ReturnType<T>];

      switch (status) {
        case WORKER_STATUS.SUCCESS:
          promise[PROMISE_RESOLVE]?.(result);
          onWorkerEnd(WORKER_STATUS.SUCCESS);
          break;
        default:
          promise[PROMISE_REJECT]?.(result);
          onWorkerEnd(WORKER_STATUS.ERROR);
          break;
      }
    };

    newWorker.onerror = (e: ErrorEvent) => {
      promise[PROMISE_REJECT]?.(e);
      onWorkerEnd(WORKER_STATUS.ERROR);
    };

    if (timeout) {
      timeoutId = window.setTimeout(() => {
        killWorker();
        setWorkerStatus(WORKER_STATUS.TIMEOUT_EXPIRED);
      }, timeout);
    }
    return newWorker;
  };

  const callWorker = (...workerArgs: Parameters<T>) => {
    const { transferable = DEFAULT_OPTIONS.transferable } = options;
    return new Promise<ReturnType<T>>((resolve, reject) => {
      promise = {
        [PROMISE_RESOLVE]: resolve,
        [PROMISE_REJECT]: reject,
      };
      const transferList: any[] =
        transferable === TRANSFERABLE_TYPE.AUTO
          ? workerArgs.filter(
              (val: any) =>
                ("ArrayBuffer" in window && val instanceof ArrayBuffer) ||
                ("MessagePort" in window && val instanceof MessagePort) ||
                ("ImageBitmap" in window && val instanceof ImageBitmap) ||
                ("OffscreenCanvas" in window && val instanceof OffscreenCanvas)
            )
          : [];

      worker?.postMessage([[...workerArgs]], transferList);

      setWorkerStatus(WORKER_STATUS.RUNNING);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const workerHook = (...fnArgs: Parameters<T>) => {
    const terminate =
      options.autoTerminate != null
        ? options.autoTerminate
        : DEFAULT_OPTIONS.autoTerminate;

    if (isRunning) {
      /* eslint-disable-next-line no-console */
      console.error(
        "[useWorker] You can only run one instance of the worker at a time, if you want to run more than one in parallel, create another instance with the hook useWorker(). Read more: https://github.com/alewin/useWorker"
      );
      return Promise.reject();
    }
    if (terminate || !worker) {
      worker = generateWorker();
    }

    return callWorker(...fnArgs);
  };

  const workerController: WorkerController = {
    getStatus: () => workerStatus,
    kill: killWorker,
  };

  return { start: workerHook, workerController };
};

module.exports = runInWorker;
