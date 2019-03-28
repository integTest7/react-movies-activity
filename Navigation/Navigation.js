// import React from 'react' /* On ne crée pas de component donc pas d'import de React */
import React from 'react' /* On importe React pour rendre les components React Native Image */
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import Test from '../Components/Test'

const SearchStackNavigator = createStackNavigator({
    Search:  { /* Nom que l'on va utiliser pour appeler cette vue (on peut mettre le nom qu'on veut) */
        screen: Search, /* Vue principale */
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: 'Mes favoris'
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

const MoviesTabNavigator = createBottomTabNavigator(
{
    Search: {
//        screen: Search
        screen: SearchStackNavigator, // Combinaison de navigation
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                    source={require('../Images/ic_search.png')}
                    style={styles.icon} />
            }
        }
    },
    Favorites: {
//        screen: Favorites,
        screen: FavoritesStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                    source={require('../Images/ic_favorite.png')}
                    style={styles.icon} />
            }
        }
    },
    Test: {
        screen: Test
    }
},
{
    tabBarOptions: {
        activeBackgroundColor: '#DDDDDD',
        inactiveBackgroundColor: '#FFFFFF',
        showLabel: false,
        showIcon: true
    }
}        
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

/* export de createAppContainer FORMATER l'application et la rendre utilisable dans l'application */
//export default createAppContainer(SearchStackNavigator)
export default createAppContainer(MoviesTabNavigator)