import React from 'react'
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, persistedReducer, store } from './src/Redux';
import AppNavigator from './src/TrackedAppNavigator';
import { MoodTracker, Overlay, AsyncOverlay, Concierge } from './src/Components';
import { setNavigationRef } from './src/Utils/NavigationHelpers';

console.disableYellowBox = true;

export default function App (props) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppNavigator />
                <MoodTracker />
                <Overlay />
                <AsyncOverlay />
                <Concierge />
            </PersistGate>
        </Provider>
    )
}
