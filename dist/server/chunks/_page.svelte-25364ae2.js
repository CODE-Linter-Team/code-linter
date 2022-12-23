import { c as create_ssr_component, b as subscribe, e as each, d as escape, v as validate_component, k as getContext, g as add_attribute, n as noop$1 } from './index2-af991d7a.js';
import { p as page } from './stores-6a36a006.js';
import { P as PUBLIC_SERVICE_URL } from './public-4ac8c09d.js';
import { a as parseQueryArgs, S as Subscribable, d as hashQueryKeyByOptions, b as noop, u as isServer, j as isValidTimeout, t as timeUntilStale, f as focusManager, r as replaceEqualDeep, s as getLogger, v as shallowEqualObjects, q as isCancelledError, n as notifyManager } from './logger-ad840b96.js';
import { P as Pulse } from './ArrowUp.svelte_svelte_type_style_lang-1fd7f844.js';
import dayjs from 'dayjs';
import { r as readable } from './index4-d46cba10.js';

class QueryObserver extends Subscribable {
  constructor(client, options) {
    super();
    this.client = client;
    this.options = options;
    this.trackedProps = [];
    this.previousSelectError = null;
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.remove = this.remove.bind(this);
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.length === 1) {
      this.currentQuery.addObserver(this);
      if (shouldFetchOnMount(this.currentQuery, this.options)) {
        this.executeFetch();
      }
      this.updateTimers();
    }
  }
  onUnsubscribe() {
    if (!this.listeners.length) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOnReconnect(this.currentQuery, this.options);
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOnWindowFocus(this.currentQuery, this.options);
  }
  destroy() {
    this.listeners = [];
    this.clearTimers();
    this.currentQuery.removeObserver(this);
  }
  setOptions(options, notifyOptions) {
    const prevOptions = this.options;
    const prevQuery = this.currentQuery;
    this.options = this.client.defaultQueryObserverOptions(options);
    if (typeof this.options.enabled !== "undefined" && typeof this.options.enabled !== "boolean") {
      throw new Error("Expected enabled to be a boolean");
    }
    if (!this.options.queryKey) {
      this.options.queryKey = prevOptions.queryKey;
    }
    this.updateQuery();
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(this.currentQuery, prevQuery, this.options, prevOptions)) {
      this.executeFetch();
    }
    this.updateResult(notifyOptions);
    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || this.options.staleTime !== prevOptions.staleTime)) {
      this.updateStaleTimeout();
    }
    const nextRefetchInterval = this.computeRefetchInterval();
    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || nextRefetchInterval !== this.currentRefetchInterval)) {
      this.updateRefetchInterval(nextRefetchInterval);
    }
  }
  updateOptions(options, notifyOptions) {
    const mergedOptions = Object.assign(Object.assign({}, this.options), options);
    if (options.queryKey && !options.queryHash && options.queryKey !== this.options.queryKey) {
      mergedOptions.queryHash = hashQueryKeyByOptions(options.queryKey, mergedOptions);
    }
    this.setOptions(mergedOptions, notifyOptions);
  }
  getOptimisticResult(options) {
    const defaultedOptions = this.client.defaultQueryObserverOptions(options);
    const query = this.client.getQueryCache().build(this.client, defaultedOptions);
    return this.createResult(query, defaultedOptions);
  }
  getCurrentResult() {
    return this.currentResult;
  }
  trackResult(result, defaultedOptions) {
    const trackedResult = {};
    const trackProp = (key) => {
      if (!this.trackedProps.includes(key)) {
        this.trackedProps.push(key);
      }
    };
    Object.keys(result).forEach((key) => {
      Object.defineProperty(trackedResult, key, {
        configurable: false,
        enumerable: true,
        get: () => {
          trackProp(key);
          return result[key];
        }
      });
    });
    if (defaultedOptions.useErrorBoundary || defaultedOptions.suspense) {
      trackProp("error");
    }
    return trackedResult;
  }
  getNextResult(options) {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.subscribe((result) => {
        if (!result.isFetching) {
          unsubscribe();
          if (result.isError && (options === null || options === void 0 ? void 0 : options.throwOnError)) {
            reject(result.error);
          } else {
            resolve(result);
          }
        }
      });
    });
  }
  getCurrentQuery() {
    return this.currentQuery;
  }
  remove() {
    this.client.getQueryCache().remove(this.currentQuery);
  }
  refetch(options) {
    return this.fetch(Object.assign(Object.assign({}, options), { meta: { refetchPage: options === null || options === void 0 ? void 0 : options.refetchPage } }));
  }
  fetchOptimistic(options) {
    const defaultedOptions = this.client.defaultQueryObserverOptions(options);
    const query = this.client.getQueryCache().build(this.client, defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return this.executeFetch(fetchOptions).then(() => {
      this.updateResult();
      return this.currentResult;
    });
  }
  executeFetch(fetchOptions) {
    this.updateQuery();
    let promise = this.currentQuery.fetch(this.options, fetchOptions);
    if (!(fetchOptions === null || fetchOptions === void 0 ? void 0 : fetchOptions.throwOnError)) {
      promise = promise.catch(noop);
    }
    return promise;
  }
  updateStaleTimeout() {
    this.clearStaleTimeout();
    if (isServer || this.currentResult.isStale || !isValidTimeout(this.options.staleTime)) {
      return;
    }
    const time = timeUntilStale(this.currentResult.dataUpdatedAt, this.options.staleTime);
    const timeout = time + 1;
    this.staleTimeoutId = setTimeout(() => {
      if (!this.currentResult.isStale) {
        this.updateResult();
      }
    }, timeout);
  }
  computeRefetchInterval() {
    var _a;
    return typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.currentResult.data, this.currentQuery) : (_a = this.options.refetchInterval) !== null && _a !== void 0 ? _a : false;
  }
  updateRefetchInterval(nextInterval) {
    this.clearRefetchInterval();
    this.currentRefetchInterval = nextInterval;
    if (isServer || this.options.enabled === false || !isValidTimeout(this.currentRefetchInterval) || this.currentRefetchInterval === 0) {
      return;
    }
    this.refetchIntervalId = setInterval(() => {
      if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
        this.executeFetch();
      }
    }, this.currentRefetchInterval);
  }
  updateTimers() {
    this.updateStaleTimeout();
    this.updateRefetchInterval(this.computeRefetchInterval());
  }
  clearTimers() {
    this.clearStaleTimeout();
    this.clearRefetchInterval();
  }
  clearStaleTimeout() {
    clearTimeout(this.staleTimeoutId);
    this.staleTimeoutId = void 0;
  }
  clearRefetchInterval() {
    clearInterval(this.refetchIntervalId);
    this.refetchIntervalId = void 0;
  }
  createResult(query, options) {
    var _a;
    const prevQuery = this.currentQuery;
    const prevOptions = this.options;
    const prevResult = this.currentResult;
    const prevResultState = this.currentResultState;
    const prevResultOptions = this.currentResultOptions;
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : this.currentQueryInitialState;
    const prevQueryResult = queryChange ? this.currentResult : this.previousQueryResult;
    const { state } = query;
    let { dataUpdatedAt, error, errorUpdatedAt, isFetching, status } = state;
    let isPreviousData = false;
    let isPlaceholderData = false;
    let data;
    if (options.optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        isFetching = true;
        if (!dataUpdatedAt) {
          status = "loading";
        }
      }
    }
    if (options.keepPreviousData && !state.dataUpdateCount && (prevQueryResult === null || prevQueryResult === void 0 ? void 0 : prevQueryResult.isSuccess) && status !== "error") {
      data = prevQueryResult.data;
      dataUpdatedAt = prevQueryResult.dataUpdatedAt;
      status = prevQueryResult.status;
      isPreviousData = true;
    } else if (options.select && typeof state.data !== "undefined") {
      if (prevResult && state.data === (prevResultState === null || prevResultState === void 0 ? void 0 : prevResultState.data) && options.select === ((_a = this.previousSelect) === null || _a === void 0 ? void 0 : _a.fn) && !this.previousSelectError) {
        data = this.previousSelect.result;
      } else {
        try {
          data = options.select(state.data);
          if (options.structuralSharing !== false) {
            data = replaceEqualDeep(prevResult === null || prevResult === void 0 ? void 0 : prevResult.data, data);
          }
          this.previousSelect = {
            fn: options.select,
            result: data
          };
          this.previousSelectError = null;
        } catch (selectError) {
          getLogger().error(selectError);
          error = selectError;
          this.previousSelectError = selectError;
          errorUpdatedAt = Date.now();
          status = "error";
        }
      }
    } else {
      data = state.data;
    }
    if (typeof options.placeholderData !== "undefined" && typeof data === "undefined" && (status === "loading" || status === "idle")) {
      let placeholderData;
      if ((prevResult === null || prevResult === void 0 ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions === null || prevResultOptions === void 0 ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData() : options.placeholderData;
        if (options.select && typeof placeholderData !== "undefined") {
          try {
            placeholderData = options.select(placeholderData);
            if (options.structuralSharing !== false) {
              placeholderData = replaceEqualDeep(prevResult === null || prevResult === void 0 ? void 0 : prevResult.data, placeholderData);
            }
            this.previousSelectError = null;
          } catch (selectError) {
            getLogger().error(selectError);
            error = selectError;
            this.previousSelectError = selectError;
            errorUpdatedAt = Date.now();
            status = "error";
          }
        }
      }
      if (typeof placeholderData !== "undefined") {
        status = "success";
        data = placeholderData;
        isPlaceholderData = true;
      }
    }
    const result = {
      status,
      isLoading: status === "loading",
      isSuccess: status === "success",
      isError: status === "error",
      isIdle: status === "idle",
      data,
      dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: state.fetchFailureCount,
      isFetched: state.dataUpdateCount > 0 || state.errorUpdateCount > 0,
      isFetchedAfterMount: state.dataUpdateCount > queryInitialState.dataUpdateCount || state.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && status !== "loading",
      isLoadingError: status === "error" && state.dataUpdatedAt === 0,
      isPlaceholderData,
      isPreviousData,
      isRefetchError: status === "error" && state.dataUpdatedAt !== 0,
      isStale: isStale(query, options),
      refetch: this.refetch,
      remove: this.remove
    };
    return result;
  }
  shouldNotifyListeners(result, prevResult) {
    if (!prevResult) {
      return true;
    }
    const { notifyOnChangeProps, notifyOnChangePropsExclusions } = this.options;
    if (!notifyOnChangeProps && !notifyOnChangePropsExclusions) {
      return true;
    }
    if (notifyOnChangeProps === "tracked" && !this.trackedProps.length) {
      return true;
    }
    const includedProps = notifyOnChangeProps === "tracked" ? this.trackedProps : notifyOnChangeProps;
    return Object.keys(result).some((key) => {
      const typedKey = key;
      const changed = result[typedKey] !== prevResult[typedKey];
      const isIncluded = includedProps === null || includedProps === void 0 ? void 0 : includedProps.some((x) => x === key);
      const isExcluded = notifyOnChangePropsExclusions === null || notifyOnChangePropsExclusions === void 0 ? void 0 : notifyOnChangePropsExclusions.some((x) => x === key);
      return changed && !isExcluded && (!includedProps || isIncluded);
    });
  }
  updateResult(notifyOptions) {
    const prevResult = this.currentResult;
    this.currentResult = this.createResult(this.currentQuery, this.options);
    this.currentResultState = this.currentQuery.state;
    this.currentResultOptions = this.options;
    if (shallowEqualObjects(this.currentResult, prevResult)) {
      return;
    }
    const defaultNotifyOptions = { cache: true };
    if ((notifyOptions === null || notifyOptions === void 0 ? void 0 : notifyOptions.listeners) !== false && this.shouldNotifyListeners(this.currentResult, prevResult)) {
      defaultNotifyOptions.listeners = true;
    }
    this.notify(Object.assign(Object.assign({}, defaultNotifyOptions), notifyOptions));
  }
  updateQuery() {
    const query = this.client.getQueryCache().build(this.client, this.options);
    if (query === this.currentQuery) {
      return;
    }
    const prevQuery = this.currentQuery;
    this.currentQuery = query;
    this.currentQueryInitialState = query.state;
    this.previousQueryResult = this.currentResult;
    if (this.hasListeners()) {
      prevQuery === null || prevQuery === void 0 ? void 0 : prevQuery.removeObserver(this);
      query.addObserver(this);
    }
  }
  onQueryUpdate(action) {
    const notifyOptions = {};
    if (action.type === "success") {
      notifyOptions.onSuccess = true;
    } else if (action.type === "error" && !isCancelledError(action.error)) {
      notifyOptions.onError = true;
    }
    this.updateResult(notifyOptions);
    if (this.hasListeners()) {
      this.updateTimers();
    }
  }
  notify(notifyOptions) {
    notifyManager.batch(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      if (notifyOptions.onSuccess) {
        (_b = (_a = this.options).onSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, this.currentResult.data);
        (_d = (_c = this.options).onSettled) === null || _d === void 0 ? void 0 : _d.call(_c, this.currentResult.data, null);
      } else if (notifyOptions.onError) {
        (_f = (_e = this.options).onError) === null || _f === void 0 ? void 0 : _f.call(_e, this.currentResult.error);
        (_h = (_g = this.options).onSettled) === null || _h === void 0 ? void 0 : _h.call(_g, void 0, this.currentResult.error);
      }
      if (notifyOptions.listeners) {
        this.listeners.forEach((listener) => {
          listener(this.currentResult);
        });
      }
      if (notifyOptions.cache) {
        this.client.getQueryCache().notify({ query: this.currentQuery, type: "observerResultsUpdated" });
      }
    });
  }
}
function shouldLoadOnMount(query, options) {
  return options.enabled !== false && !query.state.dataUpdatedAt && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldRefetchOnMount(query, options) {
  return options.enabled !== false && query.state.dataUpdatedAt > 0 && (options.refetchOnMount === "always" || options.refetchOnMount !== false && isStale(query, options));
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || shouldRefetchOnMount(query, options);
}
function shouldFetchOnReconnect(query, options) {
  return options.enabled !== false && (options.refetchOnReconnect === "always" || options.refetchOnReconnect !== false && isStale(query, options));
}
function shouldFetchOnWindowFocus(query, options) {
  return options.enabled !== false && (options.refetchOnWindowFocus === "always" || options.refetchOnWindowFocus !== false && isStale(query, options));
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return options.enabled !== false && (query !== prevQuery || prevOptions.enabled === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return query.isStaleByTime(options.staleTime);
}
function useQueryClient() {
  const queryClient = getContext("queryClient");
  if (!queryClient) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return queryClient;
}
function setBatchCalls(options) {
  options.optimisticResults = true;
  if (options.onError) {
    options.onError = notifyManager.batchCalls(options.onError);
  }
  if (options.onSuccess) {
    options.onSuccess = notifyManager.batchCalls(options.onSuccess);
  }
  if (options.onSettled) {
    options.onSettled = notifyManager.batchCalls(options.onSettled);
  }
  return options;
}
function useQuery(arg1, arg2, arg3) {
  const options = parseQueryArgs(arg1, arg2, arg3);
  const client = useQueryClient();
  let defaultedOptions = client.defaultQueryObserverOptions(options);
  defaultedOptions = setBatchCalls(defaultedOptions);
  const observer = new QueryObserver(client, defaultedOptions);
  const { subscribe: subscribe2 } = readable(observer.getCurrentResult(), (set) => {
    return observer.subscribe(notifyManager.batchCalls(set));
  });
  observer.updateResult();
  function setOptions(arg12, arg22, arg32) {
    const options2 = parseQueryArgs(arg12, arg22, arg32);
    let defaultedOptions2 = client.defaultQueryObserverOptions(options2);
    defaultedOptions2 = setBatchCalls(defaultedOptions2);
    if (observer.hasListeners()) {
      observer.setOptions(defaultedOptions2, { listeners: false });
    }
  }
  function updateOptions(options2) {
    observer.updateOptions(options2);
  }
  function setEnabled(enabled) {
    updateOptions({ enabled });
  }
  return { subscribe: subscribe2, setOptions, updateOptions, setEnabled };
}
const css$1 = {
  code: ".svelte-5qsjnd{box-sizing:border-box}.buttonColumn.svelte-5qsjnd{display:flex;flex-direction:column;min-width:6rem;margin-left:1rem;gap:1rem}.articleWallpaper.svelte-5qsjnd{width:100%;border-radius:6px;margin-top:1rem;height:16rem;object-fit:cover}h2.svelte-5qsjnd{margin:0}.topicText.svelte-5qsjnd{margin-top:12px;margin-bottom:-2px;color:white;font-size:14px;text-decoration:none}.text.svelte-5qsjnd{color:var(--vscode-text)}.articleCard.svelte-5qsjnd{display:flex;flex-direction:column;background:var(--vscode-layer1);border-radius:6px;padding:1rem;overflow:hidden}.topRow.svelte-5qsjnd{display:flex;width:100%;justify-content:space-between}.avatar.svelte-5qsjnd{--size:2.5rem;box-sizing:content-box;display:flex;cursor:pointer;min-width:var(--size);min-height:var(--size);background-size:cover;border-radius:50%;margin:3px;right:3px;bottom:3px}.avatar.svelte-5qsjnd:hover{margin:0;border:3px solid var(--vscode-layer2)}.button.svelte-5qsjnd{display:flex;align-items:center;justify-content:center;background:none;border-radius:6px;cursor:pointer;border:none;color:white;background:var(--color);transition-duration:0.1s;height:2.2rem;width:100%}.button.svelte-5qsjnd:hover{filter:brightness(1.1)}.dateInfoContainer.svelte-5qsjnd{display:flex}.seperatorDot.svelte-5qsjnd{padding:0 8px}@media only screen and (max-width: 600px){.dateInfoContainer.svelte-5qsjnd{flex-direction:column}.seperatorDot.svelte-5qsjnd{display:none}}",
  map: null
};
const ArticleInfoCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isSubmitting;
  let { article } = $$props;
  let { showStateChangeButtons } = $$props;
  let state = { state: "DEFAULT" };
  if ($$props.article === void 0 && $$bindings.article && article !== void 0)
    $$bindings.article(article);
  if ($$props.showStateChangeButtons === void 0 && $$bindings.showStateChangeButtons && showStateChangeButtons !== void 0)
    $$bindings.showStateChangeButtons(showStateChangeButtons);
  $$result.css.add(css$1);
  isSubmitting = state.state === "SUBMITTING";
  return `<div class="${"articleCard svelte-5qsjnd"}"><div class="${"topRow svelte-5qsjnd"}"><div style="${"display:flex;flex-direction:column; width: 100%"}" class="${"svelte-5qsjnd"}"><div style="${"display: flex; align-items: center"}" class="${"svelte-5qsjnd"}"><button style="${"border: none; background: none; position: relative; padding: 0"}" class="${"svelte-5qsjnd"}"><div style="${"background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'); background-size: cover"}" class="${"avatar svelte-5qsjnd"}"><span${add_attribute("style", `background-image: url('${article.author.image}')`, 0)} class="${"svelte-5qsjnd"}"></span></div>

					${``}</button>

				<div style="${"display:flex;flex-direction:column"}" class="${"svelte-5qsjnd"}"><span class="${"text svelte-5qsjnd"}" style="${"padding-left: 12px;"}">${escape(article.author.name)}</span>
					<div class="${"dateInfoContainer svelte-5qsjnd"}" style="${"padding-left: 12px;"}"><span class="${"text svelte-5qsjnd"}">Submitted ${escape(dayjs(article.submittedDate).format("DD.MM.YYYY"))}</span>
						${article.state.includes("PUBLISHED") ? `<span class="${"text seperatorDot svelte-5qsjnd"}">•</span>
							<span class="${"text svelte-5qsjnd"}">Published ${escape(dayjs(article.publishedDate).format("DD.MM.YYYY"))}</span>

							<span class="${"text seperatorDot svelte-5qsjnd"}">•</span>
							<span class="${"text svelte-5qsjnd"}">69 views</span>` : ``}
						</div></div></div>
			<span class="${"topicText svelte-5qsjnd"}">${escape(article.contentTags[0])}</span>
			<h2 style="${"font-weight: bold; color: white; font-size: 22px"}" class="${"svelte-5qsjnd"}">${escape(article.title)}</h2></div>

		<div class="${"buttonColumn svelte-5qsjnd"}">${article.state.includes("PENDING") && showStateChangeButtons ? `<button class="${"button svelte-5qsjnd"}" style="${"--color: var(--success)"}">${isSubmitting ? `${validate_component(Pulse, "Pulse").$$render(
    $$result,
    {
      size: "24",
      color: "white",
      unit: "px",
      duration: "1s"
    },
    {},
    {}
  )}` : `Publish`}</button>
				<button class="${"button svelte-5qsjnd"}" style="${"--color: var(--error)"}">${isSubmitting ? `${validate_component(Pulse, "Pulse").$$render(
    $$result,
    {
      size: "24",
      color: "white",
      unit: "px",
      duration: "1s"
    },
    {},
    {}
  )}` : `Reject`}</button>` : ``}</div></div>
	<img${add_attribute("src", article.coverImgSrc, 0)} class="${"articleWallpaper svelte-5qsjnd"}">
</div>`;
});
const css = {
  code: "span.svelte-1oph59z{color:var(--vscode-text);font-size:1rem}.articleList.svelte-1oph59z{display:flex;flex-direction:column;max-width:40rem;gap:3rem;margin:auto}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let authorsFilter;
  let contentTagsFilter;
  let statesFilter;
  let queryResult;
  let $page, $$unsubscribe_page;
  let $queryResult, $$unsubscribe_queryResult = noop$1, $$subscribe_queryResult = () => ($$unsubscribe_queryResult(), $$unsubscribe_queryResult = subscribe(queryResult, ($$value) => $queryResult = $$value), queryResult);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  const articles = data.articles;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  authorsFilter = $page.url.searchParams.get("authors")?.split(",") ?? [];
  contentTagsFilter = $page.url.searchParams.get("tags")?.split(",") ?? [];
  statesFilter = $page.url.searchParams.get("states")?.split(",") ?? [];
  $$subscribe_queryResult(queryResult = useQuery(["articles", authorsFilter, contentTagsFilter, statesFilter], async function() {
    const url = PUBLIC_SERVICE_URL + `/api/articles?authors=${authorsFilter.join(",")}&tags=${contentTagsFilter.join(",")}&states=${statesFilter.join(",")}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }));
  $$unsubscribe_page();
  $$unsubscribe_queryResult();
  return `<div class="${"articleList svelte-1oph59z"}">${$queryResult.isLoading ? `${each(articles, (article) => {
    return `${validate_component(ArticleInfoCard, "ArticleInfoCard").$$render($$result, { article, showStateChangeButtons: true }, {}, {})}`;
  })}` : `${$queryResult.error ? `<span class="${"svelte-1oph59z"}">An error has occurred: ${escape($queryResult.error.message)}</span>` : `${$queryResult.data.articles.length > 0 ? `${each($queryResult.data.articles, (article) => {
    return `${validate_component(ArticleInfoCard, "ArticleInfoCard").$$render($$result, { article, showStateChangeButtons: true }, {}, {})}`;
  })}` : `<span class="${"svelte-1oph59z"}">Found no articles matching this filter</span>`}`}`}
</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-25364ae2.js.map
