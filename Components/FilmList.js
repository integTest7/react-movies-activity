import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            films: []
        }
    }

    /* Méthode de navigation vers la page FilmDetail */
    _displayDetailForFilm = (idFilm) => {
        console.log(`Display film with id ${idFilm}`)
        /* On utilise l'objet "navigate" des props de StackNavigator puis la fonction navigate("nom_de_la_vue") */
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }
    
    
    render() {
        return (
            <FlatList
                style={styles.list}
                data={ this.props.films }
                extraData={this.props.favoritesFilm}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) =>
                    <FilmItem
                        film={item}
                        displayDetailForFilm={this._displayDetailForFilm}
                        // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                        isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                    />
                }
                onEndReached={() => 
                    /* On vérifie que l'on a pas atteint le total des pages */
                    (!this.props.favoriteList && this.props.page < this.props.totalPages) && this.props.loadFilms()
                } 
                
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

const mapStateToProps = (state) => {
    return {
        /* La partie du state qui nous intéresse et non tout le state */
        favoritesFilm: state.favoritesFilm   
    }
}

//export default FilmList

export default connect(mapStateToProps)(FilmList)