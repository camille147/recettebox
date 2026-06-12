import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../features/home/HomeScreen';
import DetailScreen from '../features/details/DetailsScreen';
import type {HomeStackParamList} from './AppNavigator';
import {View, StyleSheet, Text} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: () => (
                        <View style={styles.headerContainer}>
                            <FontAwesome5 name="utensils" size={20} color="black" />
                            <Text style={styles.headerText}>RecetteBox</Text>
                        </View>
                    )
                }}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{ title: 'Recette' }}
            />
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333',
    },
});