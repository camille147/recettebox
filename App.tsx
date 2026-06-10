import { Provider } from 'react-redux';
import {persistor, store} from './src/app/store';
import {PersistGate} from "redux-persist/integration/react";
import AppNavigator from "@/src/navigation/AppNavigator";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AppNavigator />
            </PersistGate>
        </Provider>
    );
}