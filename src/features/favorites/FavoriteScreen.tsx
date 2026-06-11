import {Text, View, StyleSheet, FlatList} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/app/store";
import {RootStackParamList} from "@/src/navigation/AppNavigator";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import RecipeCard from "@/src/components/RecipeCard";

type Props= NativeStackScreenProps<RootStackParamList, 'Favorites'>

export default function FavoriteScreen({navigation} : Props) {

    const favorites = useSelector((state: RootState) => state.favorites.meal);
    const dispatch = useDispatch();

    if (favorites.length === 0) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>Aucun favori pour l instant</Text>
                <Text style={styles.emptySubtext}>Appuie sur ❤️ dans une recette pour la sauvegarder</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => (
                    <RecipeCard
                        meal={item}
                        onPress={() => navigation.navigate('Detail', { idMeal: item.idMeal })}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        padding: 32,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});