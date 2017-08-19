/* eslint import/no-extraneous-dependencies: 0 */
import expect from 'expect'

import createMockStore from './helpers/create_mock_store'
import loadingBarMiddleware from '../src/loading_bar_middleware'
import { showLoading, hideLoading } from '../src/loading_bar_reducer'

describe('loadingBarMiddleware', () => {
  const mockStore = mockDispatch =>
    createMockStore(
      [loadingBarMiddleware()],
      mockDispatch,
    )

  it('returns a function to handle next', () => {
    const mockDispatch = () => {}
    const nextHandler = loadingBarMiddleware()(mockDispatch)
    expect(nextHandler).toBeA('function')
  })

  describe('with an action containing "_REQUEST" in type', () => {
    it('dispatches SHOW action', () => {
      const originalAction = { type: 'something/FETCH_REQUEST' }
      const expectedActions = [
        showLoading(),
        originalAction,
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStore(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })
  })

  describe('with an action containing "_SUCCESS" in type', () => {
    it('dispatches HIDE action', () => {
      const originalAction = { type: 'something/FETCH_SUCCESS' }
      const expectedActions = [
        hideLoading(),
        originalAction,
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStore(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })
  })

  describe('with an action containing "_FAILURE" in type', () => {
    it('dispatches HIDE action', () => {
      const originalAction = { type: 'something/FETCH_FAILURE' }
      const expectedActions = [
        hideLoading(),
        originalAction,
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStore(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })
  })

  describe('with an action does not containing "_REQUEST", "_SUCCESS", ' +
           '"_FAILURE" in type', () => {
    it('does not dispatch SHOW and HIDE actions', () => {
      const originalAction = { type: 'something/RANDOM' }
      const expectedActions = [
        originalAction,
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStore(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })
  })

  describe('with an async action', () => {
    it('does not dispatch SHOW and HIDE actions', () => {
      const originalAction = () => {}
      const expectedActions = [
        originalAction,
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStore(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })
  })

  describe('with custom promiseTypeSuffixes', () => {
    const mockStoreWithSuffixes = mockDispatch =>
      createMockStore(
        [
          loadingBarMiddleware({
            promiseTypeSuffixes: ['LOAD', 'SUCCESS', 'FAIL'],
          }),
        ],
        mockDispatch,
      )

    it('does not dispatch SHOW and HIDE actions on _FULFILLED action', () => {
      const originalAction = { type: 'something/FETCH_PENDING' }
      const expectedActions = [
        originalAction,
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStoreWithSuffixes(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })

    it('dispatches SHOW action on _REQUEST action', () => {
      const originalAction = { type: 'something/FETCH_LOAD' }
      const expectedActions = [
        showLoading(),
        originalAction,
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStoreWithSuffixes(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })

    it('dispatches HIDE action on _SUCCESS action', () => {
      const originalAction = { type: 'something/FETCH_SUCCESS' }
      const expectedActions = [
        hideLoading(),
        originalAction,
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStoreWithSuffixes(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })

    it('dispatches HIDE action on _FAILURE action', () => {
      const originalAction = { type: 'something/FETCH_FAIL' }
      const expectedActions = [
        hideLoading(),
        originalAction,
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStoreWithSuffixes(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })

    it('does not dispatch SHOW action on FOO_LOADED action', () => {
      const originalAction = { type: 'something/FOO_LOADED' }
      const expectedActions = [
        originalAction,
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStoreWithSuffixes(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })
  })
})
