import {Component} from 'react';
import {Action, Middleware, Reducer} from 'redux';

export interface NProgressProps {
  color ?: string;
  nprogress?: Object;
}
export default class NProgress extends Component<NProgressProps, {}> {}

export interface MiddlewareConfig {
  promiseTypeSuffixes?: string[];
}
export function nprogressMiddleware(config?: MiddlewareConfig): Middleware;

export const nprogressReducer: Reducer<any>;
export function beginTask(): Action;
export function endTask(): Action;
export function resetTask(): Action;
