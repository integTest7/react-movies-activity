// Components/Search.js
import React from 'react'
import { ActivityIndicator, StyleSheet, View, TextInput, Text, Button, FlatList } from 'react-native'
//import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {
    
    constructor(props) {
        super(props)
//        this._films = []
        /* En Variables de classe et NON En State sinon ça va tout re-renderer pour rien */
        this.searchedText = ''
        this.page = 0,
        this.totalPages = 0,
        this.state = { 
            films: [],
            isLoading: false /* Par défaut false car il n'ya pas de chargement sans recherche */
        }
        
        this._loadFilms = this._loadFilms.bind(this)
    }

    /* Méthode pour passer la valeur à la propriété via l'input */
    _searchTextInputChanged(text) {
        this.searchedText = text
    }
    
    /* Méthode pour charger les données */
    _loadFilms() {
        console.log(this.searchedText)
        console.log("contenu de la prop" + this.test)
//        getFilmsFromApiWithSearchedText("star").then(data => console.log(data));
        if(this.searchedText.length > 0) {
            this.setState({isLoading: true }) /* Au chargement */
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({ 
                    films: [...this.state.films, ...data.results], /* Concatène les deux tableaux (array1.concat(array2)) */
                    isLoading: false /* Fin de chargement */
                })
            });  
        }
    }
    
    /* Remise à zero du state à la prochaine recherche */
    _searchFilms() {
        this.page = 0,
        this.totalPages = 0,
        this.setState({
            films: []
        }, /* Callback Function de setState (une fois que tout est remis à zéro, on appelle la fonction ci-dessous) */
        () => {
            console.log(`Page: ${this.page} / TotalPages: ${this.totalPages} / Nombre de films: ${this.state.films.length}`)
            this._loadFilms()
        })
    }
    
    /* Méthode pour afficher le loader */
    _displayLoading() {
        if(this.state.isLoading) {
            /* Ne pas oublier le return */
            return (
                <View style={styles.activity_indicator}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Titre du film"
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => {this._searchFilms()}}
                />
                <Button title="Rechercher" onPress={() => {this._searchFilms()}} />
                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    totalPages={this.totalPages}
                    favoriteList={false} /* 3.7 - Booleen pour indiquer le non affichage des films favoris. Et déclencher le chargement de plus de films quand on scrolle */
                />
                {this._displayLoading()}
            </View>
        )
    }
}

/* Avec l'API StyleSheet */
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
//        marginTop: 20
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: "#000000",
        borderWidth: 1,
        paddingLeft: 5
    },
    activity_indicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search