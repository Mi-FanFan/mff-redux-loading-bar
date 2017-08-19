import { Component, CSSProperties } from 'react';
import { Middleware, Reducer, Action } from 'redux';

export interface LoadingBarProps {
  style?: CSSProperties;
  className?: string;
  actions?: Object;
  updateTime?: number;
  maxProgress?: number;
  progressIncrease?: number;
  showFastActions?: boolean;
}
export default class LoadingBar extends Component<LoadingBarProps, {}> {}

export interface MiddlewareConfig {
  promiseTypeSuffixes?: string[];
}
export function loadingBarMiddleware(config?: MiddlewareConfig): Middleware;

export const loadingBarReducer: Reducer<any>;
export function showLoading(): Action;
export function hideLoading(): Action;
export function resetLoading(): Action;
