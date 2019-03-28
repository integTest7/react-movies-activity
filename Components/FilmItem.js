import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

import FadeIn from '../Animations/FadeIn'

class FilmItem extends React.Component {
    
    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {     
            // Si la props isFilmFavorite vaut true, on affiche le 🖤
            /* Declaration de l'image */
            var sourceImage = require('../Images/ic_favorite.png')
            /* Render de l'image */
            return(
                <Image
                    style={styles.favorite_image}
                    source={sourceImage}
                />
            )
        }
    }
    
    render() {
//        console.log(this.props.film)
//        const film = this.props.film
        const { film, displayDetailForFilm } = this.props
        return (
            <FadeIn>
                <TouchableOpacity
                    style={styles.main_container} onPress={() => displayDetailForFilm(film.id)}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.poster_path) }}
                    />
                    <View style={styles.content_container}>
                        <View style={styles.header_container}>
                            {this._displayFavoriteImage()}
                            <Text style={styles.title_text}>{ film.title }</Text>
                            <Text style={styles.vote}>{ film.vote_average }</Text>
                        </View>
                        <View style={styles.description_container}>
                            <Text style={styles.description_text} numberOfLines={6}>{ film.overview }</Text>
                        </View>
                        <View style={styles.date_container}>
                            <Text style={styles.date_text}>Sorti le { film.release_date }</Text>
                        </View>
                    </View>                
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create ({
    main_container: {
        height: 190,
        flexDirection: 'row',
        margin: 5,
    },
    image: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#CCC',
    },
    content_container: {
        flex: 2,
        flexDirection: 'column'
    },
    header_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    favorite_image: {
        width: 20,
        height: 20
    },
    title_text: {
        flex: 3,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 5
    },
    vote: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#666'
    },
    description_container: {
        flex: 2,
        justifyContent: 'center',
        fontStyle: 'italic',
        color: '#999'
    },
    date_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }    
})

export default FilmItem