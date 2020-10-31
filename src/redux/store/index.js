import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import rootReducer from '@reducers';
import rootSaga from '@sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistReducer({
    key: 'root',
    storage,
    blacklist: ['error', 'course', 'courses', 'lesson'],
  }, rootReducer),
  middleware: [
    _isDev_ && logger,
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
