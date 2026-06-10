import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { View, Text } from "react-native";

export default function App() {
    return (
        <Provider store={store}>
            <View >
                <Text>RecetteBox</Text>
            </View>
        </Provider>
    );
}