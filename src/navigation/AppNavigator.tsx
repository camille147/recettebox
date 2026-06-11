import {NavigationContainer} from "@react-navigation/native";
import {Text, StyleSheet} from "react-native";
import FavoriteScreen from "@/src/features/favorites/FavoriteScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeStack from "@/src/navigation/HomeStack";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type RootTabParamList = {
    HomeTab: {
        screen: 'Detail';
        params: { idMeal: string }
    } | undefined;
    FavoritesTab: undefined;
};

export type HomeStackParamList = {
    Home: undefined;
    Detail: { idMeal: string };
}

const Tab = createBottomTabNavigator()


export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: '#e63946',
                tabBarInactiveTintColor: '#888',
                headerShown: false,
                //tabBarBackground: () => (
                //<BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
                //),
            }}>
                <Tab.Screen name="HomeTab" component={HomeStack} options={{
                    title: 'Recettes',
                    tabBarIcon: ({ focused }) => (
                        <Text style={{ fontSize: 20 }}>{focused ? <MaterialCommunityIcons name="book-open-variant" size={24} color="black" /> : <FontAwesome name="book" size={24} color="black" />}</Text>
                    ),
                }}/>
                <Tab.Screen name="FavoritesTab" component={FavoriteScreen} options={{
                    title: 'Favoris',
                    tabBarIcon: ({ focused }) => (
                        <Text style={{ fontSize: 20 }}>{focused ? <MaterialCommunityIcons name="notebook-heart" style={style.favoriteHeartRed} size={24} color="red" /> : <MaterialCommunityIcons name="notebook-heart-outline" size={24} color="black" />}</Text>
                    ),
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}


const style = StyleSheet.create(
    {
        favoriteHeartRed: {
            color: '#AD0909'
        }
    }
)