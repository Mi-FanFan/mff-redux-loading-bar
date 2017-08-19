# React Redux Loading Bar

A React component that provides Loading Bar (aka Progress Bar) for long running tasks.


Consists of:

* React component — displays loading bar and simulates progress
* Redux reducer — manages loading bar's part of the store
* (optional) Redux middleware — automatically shows and hides Loading Bar for actions with promises

## Installation

```bash
yarn add mff-redux-loading-bar
```

## Usage

Mount the `LoadingBar` component anywhere in your application:

```jsx
import LoadingBar from 'mff-redux-loading-bar'

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <LoadingBar />
      </header>
    )
  }
}
```

Good news is that it doesn't include any positioning. You can attach it to the top of any block or the whole page.

Install the reducer to the store:

```jsx
import { combineReducers } from 'redux'
import { loadingBarReducer } from 'mff-redux-loading-bar'

const reducer = combineReducers({
  // app reducers
  loadingBar: loadingBarReducer,
})
```

## Usage default

Apply middleware to automatically show and hide loading bar on actions with promises:

```jsx
import { createStore, applyMiddleware } from 'redux'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  applyMiddleware(loadingBarMiddleware())
)
```

## Usage with custom suffixes or alternative promise middleware

You can configure promise type suffixes that are used in your project:

```jsx
import { createStore, applyMiddleware } from 'redux'
import { loadingBarMiddleware } from 'mff-redux-loading-bar'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  applyMiddleware(
    loadingBarMiddleware({
      promiseTypeSuffixes: ['PENDING', 'FULFILLED', 'REJECTED'],
    })
  )
)
```

If you're not using `redux-promise-middleware` or any other promise middleware, you can skip installing the `loadingBarMiddleware()` and dispatch `SHOW`/`HIDE` actions manually. The other option is to write your own middleware that will be similar to the [bundled one](https://github.com/mironov/react-redux-loading-bar/blob/master/src/loading_bar_middleware.js).

## Usage without middleware

You can dispatch `SHOW`/`HIDE` actions wherever you want by importing the corresponding action creators:

```jsx
import { showLoading, hideLoading } from 'react-redux-loading-bar'

dispatch(showLoading())
// do long running stuff
dispatch(hideLoading())
```

You need to dispatch `HIDE` as many times as `SHOW` was dispatched to make the bar disappear. In other words, the loading bar is shown until all long running tasks complete.

## Usage with [`redux-saga`](https://github.com/redux-saga/redux-saga)

Install the `loadingBarReducer()` and mount Loading Bar in your application.
You can import and dispatch `showLoading` and `hideLoading` from your sagas.

```jsx
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function* fetchData() {
  try {
    yield put(showLoading())
    const payload = yield call(API, params)
    // payload processing
  } finally {
    yield put(hideLoading())
  }
}
```

## Styling

You can apply custom styling right on the `LoadingBar` component. For example you can change the color and height of the loading bar:

```jsx
<LoadingBar style={{ backgroundColor: 'blue', height: '5px' }} />
```

Alternatively, you can specify your own CSS class.

**Please note that will disable default styling (which is `background-color: red; height: 3px; position: absolute;`).**

```jsx
<LoadingBar className="loading" />
```

Don't forget to set `height`, `background-color` and `position` for the `loading` class in your CSS files.

## Configure Progress Simulation

You can change updateTime (by default 200ms), maxProgress (by default 90%) and progressIncrease (by default 5%):

```jsx
<LoadingBar updateTime={100} maxProgress={95} progressIncrease={10} />
```

By default, the Loading Bar will only display if the action took longer than `updateTime` to finish. This helps keep things feeling snappy, and avoids the annoyingness of showing a Loading Bar for fractions of seconds. If you want to show Loading Bar even on quickly finished actions you can pass the `showFastActions` prop:

```jsx
<LoadingBar showFastActions />
```

## Reset progress

You can dispatch the `resetLoading` action to ultimately hide Loading Bar even when multiple long running tasks are still in progress.

## Tests

```bash
npm test
```

