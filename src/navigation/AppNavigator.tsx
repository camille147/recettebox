import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "@/src/features/home/HomeScreen";
import DetailsScreen from "@/src/features/details/DetailsScreen";
import FavoriteScreen from "@/src/features/favorites/FavoriteScreen";



export type RootStackParamList = {  // def des params pour chaque ecran
    Home: undefined;
    Detail: { idMeal: string };
    Favorites: undefined;
};


const Stack = createNativeStackNavigator()
export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Favorites" component={FavoriteScreen}/>
                <Stack.Screen name="Detail" component={DetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}