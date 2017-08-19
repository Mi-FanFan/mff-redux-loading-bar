/* eslint import/no-extraneous-dependencies: 0 */
import expect from 'expect'

import {
  loadingBarReducer,
  SHOW,
  HIDE,
  RESET,
  showLoading,
  hideLoading,
  resetLoading,
} from '../src/loading_bar_reducer'

describe('loadingBarReducer', () => {
  it('returns the initial state', () => {
    expect(loadingBarReducer(undefined, {})).toEqual(0)
  })

  it('handles SHOW', () => {
    expect(
      loadingBarReducer(undefined, { type: SHOW }),
    ).toEqual(1)

    expect(
      loadingBarReducer(0, { type: SHOW }),
    ).toEqual(1)

    expect(
      loadingBarReducer(1, { type: SHOW }),
    ).toEqual(2)
  })

  it('handles HIDE', () => {
    expect(
      loadingBarReducer(1, { type: HIDE }),
    ).toEqual(0)

    expect(
      loadingBarReducer(undefined, { type: HIDE }),
    ).toEqual(0)


    expect(
      loadingBarReducer(0, { type: HIDE }),
    ).toEqual(0)
  })

  it('handles RESET', () => {
    expect(
      loadingBarReducer(1, { type: RESET }),
    ).toEqual(0)

    expect(
      loadingBarReducer(undefined, { type: RESET }),
    ).toEqual(0)


    expect(
      loadingBarReducer(10, { type: RESET }),
    ).toEqual(0)
  })
})

describe('actions', () => {
  it('creates an action to show loading bar', () => {
    expect(showLoading()).toEqual({ type: SHOW })
  })

  it('creates an action to hide loading bar', () => {
    expect(hideLoading()).toEqual({ type: HIDE })
  })

  it('creates an action to reset loading bar', () => {
    expect(resetLoading()).toEqual({ type: RESET })
  })
})
