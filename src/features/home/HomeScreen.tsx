import {Text, TextInput, StyleSheet, FlatList, View} from "react-native";
import {useState} from "react";
import RecipeCard from "@/src/components/RecipeCard";
import {RootStackParamList} from "@/src/navigation/AppNavigator";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useGetMealByNameQuery} from '../../services/api'
import { useDebounce } from "use-debounce";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {

    const [query, setQuery] = useState('')

    const [debounceQuery, setDebounceQuery] = useDebounce(query, 500) //relance la recherche toutes les 500ms, évite de lancer la recherche àa chaue lette

    const { data, error, isLoading } = useGetMealByNameQuery(debounceQuery)

    if(isLoading) {
        return <Text>isLOadinf</Text>
    }
    if(error) {
        return <Text> uen erreur est survenu </Text>
    }

    if (!data?.meals) {
        return <Text> pas de recette trovéee</Text>
    }

    return (
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Rechercher une recette..."
                    value={query}
                    onChangeText={setQuery}
                />
                <FlatList
                    data={data.meals}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => (
                        <RecipeCard
                            meal={item}
                            onPress={() => navigation.navigate('Detail', { idMeal: item.idMeal })}
                        />
                    )}
                />
            </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchBar: {
        margin: 16,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 10,
        fontSize: 15,
        elevation: 2,
    },
});