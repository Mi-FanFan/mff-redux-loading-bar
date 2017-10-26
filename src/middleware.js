import { beginTask, endTask } from './actions'

const defaultTypeSuffixes = ['REQUEST', 'SUCCESS', 'FAILURE']

export default function loadingBarMiddleware(config = {}) {
  const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypeSuffixes

  return ({ dispatch }) => next => (action) => {
    if (action.type) {
      const [PENDING, FULFILLED, REJECTED] = promiseTypeSuffixes

      const isPending = new RegExp(`${PENDING}$`, 'g')
      const isFulfilled = new RegExp(`${FULFILLED}$`, 'g')
      const isRejected = new RegExp(`${REJECTED}$`, 'g')

      if (action.type.match(isPending)) {
        dispatch(beginTask())
      } else if (action.type.match(isFulfilled) || action.type.match(isRejected)) {
        dispatch(endTask())
      }
    }

    return next(action)
  }
}
