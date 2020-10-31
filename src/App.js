import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { I18nextProvider } from 'react-i18next';

import RouteController from '@route-controller';
import { persistor, store } from '@store';
import i18n from '@localization/i18nConfig';

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'rc-dropdown/assets/index.css';
import './styles/main.scss';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Suspense fallback={null}>
        <I18nextProvider i18n={i18n}>
          <RouteController />
        </I18nextProvider>
      </Suspense>
    </PersistGate>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
