import React from 'react'
import { View, ScrollView, Image, Text, StyleSheet, ActivityIndicator, Button, TouchableOpacity, Share, Platform } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import numeral from 'numeral'
import moment from 'moment'
import { connect } from 'react-redux' /* Connexion du Store */
import EnlargeShrink from '../Animations/EnlargeShrink' /* 4.2 - Animations */

class FilmDetail extends React.Component {
    
    
    /* 4.1 - Partage dans le header pour iOS */
    static navigationOptions = ({navigation}) => {
        const { params } = navigation.state
        
        if(params.film !== undefined && Platform.OS === 'ios') {
            return {
                headerRight: <TouchableOpacity
                                style={styles.share_touchable_headerrightbutton}
                                onPress={() => params.shareFilm()}>
                                <Image 
                                    style={styles.share_image}
                                    source={require('../Images/ic_share.png')}/>
                            </TouchableOpacity>
           }
        }
    }
    
    constructor(props) {
        super(props)
        this.state = {
            film: undefined, /* Pas d'infos donc on initialise à undefined */
            isLoading: true /* ça mouline le temps de récupérer les infos */
        },
        
        this._shareFilm = this._shareFilm.bind(this)
    }

    /* 4.1 - Fonction pour faire passer la fonction _shareFilm et le film aux paramètres de la navigation. Ainsi on aura accès à ces données au moment de définir le headerRight */
    _updateNavigationParams() {
        this.props.navigation.setParams({
            shareFilm: this._shareFilm,
            film: this.state.film
        })
    }

    // Dès que le film est chargé, on met à jour les paramètres de la navigation (avec la fonction _updateNavigationParams) pour afficher le bouton de partage
    componentDidMount() {
        console.log("Composant FilmDetail monté")
        const idFilm = this.props.navigation.state.params.idFilm
        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === idFilm)
        
        if(favoriteFilmIndex !== -1) {
            /* 3.7 - Film déjà en favoris : on a son détail, inutile d'appeler l'API, update du film dans le state */
            this.setState({
                film: this.props.favoritesFilm[favoriteFilmIndex],
                isLoading: false /* 3.7 - Arrêt du loader dans le FilmDetail à confirmer */
            }, () => { this._updateNavigationParams() })
            return /* 3.7 - A comprendre */
        }
        
        /* 3.7 - Le film n'est pas dans les favoris : on appelle l'API pour avoir son détail */
        this.setState({ isLoading: true })
        getFilmDetailFromApi(idFilm).then(data => {
            this.setState({ film: data, isLoading: false }, () => { this._updateNavigationParams() })
        })
    }
    
    componentDidUpdate() {
        console.log("componentDidUpdate : ")
//        console.log(this.props.favoritesFilm)
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return(
                <View style={styles.loading_indicator}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }
    
    _toggleFavorite() {
        // Redux - Définition de l'action
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action) /* Dispatch/Envoi de l'action au Store Redux */
    }
    
    _displayFavoriteImage() {
        /* Declaration de l'image */
        var sourceImage = require('../Images/ic_favorite_border.png')
        var shouldEnlarge = false
        /* Toggle de l'icône */
        if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1 ) {
            sourceImage = require('../Images/ic_favorite.png')
            shouldEnlarge = true
        }
        
        console.log(shouldEnlarge)
        /* Render de l'image */
        return(
            <EnlargeShrink
                shouldEnlarge={shouldEnlarge}>
                <Image
                    style={styles.favorite_image}
                    source={sourceImage}
                />
            </EnlargeShrink>
        )
    }
    
    _displayFilm() {
        if(this.state.film != undefined) {
            const { film } = this.state
            return(
                <ScrollView style={styles.scrollview_container}>
                    <Image style={styles.image} source={{uri: getImageFromApi(film.backdrop_path) }}/>
                    <Text style={styles.title_text}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favoris_container}
                        onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                      return genre.name;
                    }).join(" / ")}
                    </Text>
                    <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                      return company.name;
                    }).join(" / ")}
                    </Text>
                </ScrollView>
            )
        }
    }
    
    /* 4.1 - Partage */
    _shareFilm() {
        const { film } = this.state
        Share.share({ title: film.title, message: film.overview })
    }

    /* 4.1 - DisplayFloatingActionButton*/
    _displayFloatingActionButton() {
        const { film } = this.state
        // Lorsque le film est chargé
        if(film !== undefined && Platform.OS === 'android') {
            return(
                <TouchableOpacity
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={() => this._shareFilm()}>
                    <Image 
                        style={styles.share_image}
                        source={require('../Images/ic_share.png')}/>
                </TouchableOpacity>
            )
        }
    }
    
    render () {
//        console.log(this.props)
//        console.log(this.state.film)
        console.log("Composant FilmDetail rendu")
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
                {this._displayFloatingActionButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_indicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    favoris_container: {
        alignItems: 'center'
    },
    favorite_image: {
        flex: 1,
        width: null,
        height: null
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30
    },
    share_touchable_headerrightbutton: {
        marginRight: 8
    }
})

const mapStateToProps = (state) => {
    return {
        /* La partie du state qui nous intéresse et non tout le state */
        favoritesFilm: state.favoritesFilm   
    }
}

export default connect(mapStateToProps)(FilmDetail)