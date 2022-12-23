class Subscribable {
  constructor() {
    this.listeners = [];
  }
  subscribe(listener) {
    const callback = listener || (() => void 0);
    this.listeners.push(callback);
    this.onSubscribe();
    return () => {
      this.listeners = this.listeners.filter((x) => x !== callback);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.length > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}
const isServer = typeof window === "undefined";
function noop() {
  return void 0;
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function ensureQueryKeyArray(value) {
  return Array.isArray(value) ? value : [value];
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }
  if (typeof arg2 === "function") {
    return Object.assign(Object.assign({}, arg3), { queryKey: arg1, queryFn: arg2 });
  }
  return Object.assign(Object.assign({}, arg2), { queryKey: arg1 });
}
function parseFilterArgs(arg1, arg2, arg3) {
  return isQueryKey(arg1) ? [Object.assign(Object.assign({}, arg2), { queryKey: arg1 }), arg3] : [arg1 || {}, arg2];
}
function mapQueryStatusFilter(active, inactive) {
  if (active === true && inactive === true || active == null && inactive == null) {
    return "all";
  } else if (active === false && inactive === false) {
    return "none";
  } else {
    const isActive = active !== null && active !== void 0 ? active : !inactive;
    return isActive ? "active" : "inactive";
  }
}
function matchQuery(filters, query) {
  const { active, exact, fetching, inactive, predicate, queryKey, stale } = filters;
  if (isQueryKey(queryKey)) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  const queryStatusFilter = mapQueryStatusFilter(active, inactive);
  if (queryStatusFilter === "none") {
    return false;
  } else if (queryStatusFilter !== "all") {
    const isActive = query.isActive();
    if (queryStatusFilter === "active" && !isActive) {
      return false;
    }
    if (queryStatusFilter === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (typeof fetching === "boolean" && query.isFetching() !== fetching) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, fetching, predicate, mutationKey } = filters;
  if (isQueryKey(mutationKey)) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashQueryKey(mutation.options.mutationKey) !== hashQueryKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (typeof fetching === "boolean" && mutation.state.status === "loading" !== fetching) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = (options === null || options === void 0 ? void 0 : options.queryKeyHashFn) || hashQueryKey;
  return hashFn(queryKey);
}
function hashQueryKey(queryKey) {
  const asArray = ensureQueryKeyArray(queryKey);
  return stableValueHash(asArray);
}
function stableValueHash(value) {
  return JSON.stringify(value, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
    result[key] = val[key];
    return result;
  }, {}) : val);
}
function partialMatchKey(a, b) {
  return partialDeepEqual(ensureQueryKeyArray(a), ensureQueryKeyArray(b));
}
function partialDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return !Object.keys(b).some((key) => !partialDeepEqual(a[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = Array.isArray(a) && Array.isArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aSize = array ? a.length : Object.keys(a).length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      copy[key] = replaceEqualDeep(a[key], b[key]);
      if (copy[key] === a[key]) {
        equalItems++;
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function shallowEqualObjects(a, b) {
  if (a && !b || b && !a) {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isQueryKey(value) {
  return typeof value === "string" || Array.isArray(value);
}
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function scheduleMicrotask(callback) {
  Promise.resolve().then(callback).catch((error) => setTimeout(() => {
    throw error;
  }));
}
function getAbortController() {
  if (typeof AbortController === "function") {
    return new AbortController();
  }
}
class FocusManager extends Subscribable {
  constructor() {
    super();
    this.setup = (onFocus) => {
      if (!isServer && (window === null || window === void 0 ? void 0 : window.addEventListener)) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        window.addEventListener("focus", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
          window.removeEventListener("focus", listener);
        };
      }
    };
  }
  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }
  onUnsubscribe() {
    var _a;
    if (!this.hasListeners()) {
      (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
      this.cleanup = void 0;
    }
  }
  setEventListener(setup) {
    var _a;
    this.setup = setup;
    (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
    this.cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    this.focused = focused;
    if (focused) {
      this.onFocus();
    }
  }
  onFocus() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
  isFocused() {
    if (typeof this.focused === "boolean") {
      return this.focused;
    }
    if (typeof document === "undefined") {
      return true;
    }
    return [void 0, "visible", "prerender"].includes(document.visibilityState);
  }
}
const focusManager = new FocusManager();
class OnlineManager extends Subscribable {
  constructor() {
    super();
    this.setup = (onOnline) => {
      if (!isServer && (window === null || window === void 0 ? void 0 : window.addEventListener)) {
        const listener = () => onOnline();
        window.addEventListener("online", listener, false);
        window.addEventListener("offline", listener, false);
        return () => {
          window.removeEventListener("online", listener);
          window.removeEventListener("offline", listener);
        };
      }
    };
  }
  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }
  onUnsubscribe() {
    var _a;
    if (!this.hasListeners()) {
      (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
      this.cleanup = void 0;
    }
  }
  setEventListener(setup) {
    var _a;
    this.setup = setup;
    (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
    this.cleanup = setup((online) => {
      if (typeof online === "boolean") {
        this.setOnline(online);
      } else {
        this.onOnline();
      }
    });
  }
  setOnline(online) {
    this.online = online;
    if (online) {
      this.onOnline();
    }
  }
  onOnline() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
  isOnline() {
    if (typeof this.online === "boolean") {
      return this.online;
    }
    if (typeof navigator === "undefined" || typeof navigator.onLine === "undefined") {
      return true;
    }
    return navigator.onLine;
  }
}
const onlineManager = new OnlineManager();
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function isCancelable(value) {
  return typeof (value === null || value === void 0 ? void 0 : value.cancel) === "function";
}
class CancelledError {
  constructor(options) {
    this.revert = options === null || options === void 0 ? void 0 : options.revert;
    this.silent = options === null || options === void 0 ? void 0 : options.silent;
  }
}
function isCancelledError(value) {
  return value instanceof CancelledError;
}
class Retryer {
  constructor(config) {
    let cancelRetry = false;
    let cancelFn;
    let continueFn;
    let promiseResolve;
    let promiseReject;
    this.abort = config.abort;
    this.cancel = (cancelOptions) => cancelFn === null || cancelFn === void 0 ? void 0 : cancelFn(cancelOptions);
    this.cancelRetry = () => {
      cancelRetry = true;
    };
    this.continueRetry = () => {
      cancelRetry = false;
    };
    this.continue = () => continueFn === null || continueFn === void 0 ? void 0 : continueFn();
    this.failureCount = 0;
    this.isPaused = false;
    this.isResolved = false;
    this.isTransportCancelable = false;
    this.promise = new Promise((outerResolve, outerReject) => {
      promiseResolve = outerResolve;
      promiseReject = outerReject;
    });
    const resolve = (value) => {
      var _a;
      if (!this.isResolved) {
        this.isResolved = true;
        (_a = config.onSuccess) === null || _a === void 0 ? void 0 : _a.call(config, value);
        continueFn === null || continueFn === void 0 ? void 0 : continueFn();
        promiseResolve(value);
      }
    };
    const reject = (value) => {
      var _a;
      if (!this.isResolved) {
        this.isResolved = true;
        (_a = config.onError) === null || _a === void 0 ? void 0 : _a.call(config, value);
        continueFn === null || continueFn === void 0 ? void 0 : continueFn();
        promiseReject(value);
      }
    };
    const pause = () => {
      return new Promise((continueResolve) => {
        var _a;
        continueFn = continueResolve;
        this.isPaused = true;
        (_a = config.onPause) === null || _a === void 0 ? void 0 : _a.call(config);
      }).then(() => {
        var _a;
        continueFn = void 0;
        this.isPaused = false;
        (_a = config.onContinue) === null || _a === void 0 ? void 0 : _a.call(config);
      });
    };
    const run = () => {
      if (this.isResolved) {
        return;
      }
      let promiseOrValue;
      try {
        promiseOrValue = config.fn();
      } catch (error) {
        promiseOrValue = Promise.reject(error);
      }
      cancelFn = (cancelOptions) => {
        var _a;
        if (!this.isResolved) {
          reject(new CancelledError(cancelOptions));
          (_a = this.abort) === null || _a === void 0 ? void 0 : _a.call(this);
          if (isCancelable(promiseOrValue)) {
            try {
              promiseOrValue.cancel();
            } catch (_b) {
            }
          }
        }
      };
      this.isTransportCancelable = isCancelable(promiseOrValue);
      Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
        var _a, _b, _c;
        if (this.isResolved) {
          return;
        }
        const retry = (_a = config.retry) !== null && _a !== void 0 ? _a : 3;
        const retryDelay = (_b = config.retryDelay) !== null && _b !== void 0 ? _b : defaultRetryDelay;
        const delay = typeof retryDelay === "function" ? retryDelay(this.failureCount, error) : retryDelay;
        const shouldRetry = retry === true || typeof retry === "number" && this.failureCount < retry || typeof retry === "function" && retry(this.failureCount, error);
        if (cancelRetry || !shouldRetry) {
          reject(error);
          return;
        }
        this.failureCount++;
        (_c = config.onFail) === null || _c === void 0 ? void 0 : _c.call(config, this.failureCount, error);
        sleep(delay).then(() => {
          if (!focusManager.isFocused() || !onlineManager.isOnline()) {
            return pause();
          }
        }).then(() => {
          if (cancelRetry) {
            reject(error);
          } else {
            run();
          }
        });
      });
    };
    run();
  }
}
class NotifyManager {
  constructor() {
    this.queue = [];
    this.transactions = 0;
    this.notifyFn = (callback) => {
      callback();
    };
    this.batchNotifyFn = (callback) => {
      callback();
    };
  }
  batch(callback) {
    let result;
    this.transactions++;
    try {
      result = callback();
    } finally {
      this.transactions--;
      if (!this.transactions) {
        this.flush();
      }
    }
    return result;
  }
  schedule(callback) {
    if (this.transactions) {
      this.queue.push(callback);
    } else {
      scheduleMicrotask(() => {
        this.notifyFn(callback);
      });
    }
  }
  batchCalls(callback) {
    return (...args) => {
      this.schedule(() => {
        callback(...args);
      });
    };
  }
  flush() {
    const queue = this.queue;
    this.queue = [];
    if (queue.length) {
      scheduleMicrotask(() => {
        this.batchNotifyFn(() => {
          queue.forEach((callback) => {
            this.notifyFn(callback);
          });
        });
      });
    }
  }
  setNotifyFunction(fn) {
    this.notifyFn = fn;
  }
  setBatchNotifyFunction(fn) {
    this.batchNotifyFn = fn;
  }
}
const notifyManager = new NotifyManager();
let logger = console;
function getLogger() {
  return logger;
}

export { Retryer as R, Subscribable as S, parseQueryArgs as a, noop as b, partialMatchKey as c, hashQueryKeyByOptions as d, matchMutation as e, focusManager as f, getAbortController as g, hashQueryKey as h, isCancelable as i, isValidTimeout as j, functionalUpdate as k, ensureQueryKeyArray as l, matchQuery as m, notifyManager as n, onlineManager as o, parseFilterArgs as p, isCancelledError as q, replaceEqualDeep as r, getLogger as s, timeUntilStale as t, isServer as u, shallowEqualObjects as v };
//# sourceMappingURL=logger-ad840b96.js.map
