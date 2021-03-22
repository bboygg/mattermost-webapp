// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {Middleware} from 'redux';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import {createEpicMiddleware} from 'redux-observable';

const defaultOptions = {
    additionalMiddleware: [],
    enableThunk: true,
};
export function createMiddleware(clientOptions: any): Middleware[] {
    const options = Object.assign({}, defaultOptions, clientOptions);
    const {
        additionalMiddleware,
        enableThunk,
    } = options;
    const middleware: ThunkMiddleware[] = [];

    if (enableThunk) {
        middleware.push(thunk);
    }

    const epicMiddleware = createEpicMiddleware();
    middleware.push(epicMiddleware);

    if (additionalMiddleware) {
        if (typeof additionalMiddleware === 'function') {
            middleware.push(additionalMiddleware);
        } else {
            middleware.push(...additionalMiddleware);
        }
    }

    return middleware;
}
