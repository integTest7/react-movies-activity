import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import FilmList from './FilmList'


class Favorites extends React.Component {
    render() {
        return (
            <FilmList
                films={this.props.favoritesFilm}
                navigation={this.props.navigation}
                favoriteList={true} /* 3.7 - true pour empecher la recherche de plus de films */
            />
        )
    }
}

const styles = StyleSheet.create({
    
})

const mapStateToProps = (state) => {
    return {
        /* La partie du state qui nous intéresse et non tout le state */
        favoritesFilm: state.favoritesFilm   
    }
}

//export default Favorites
export default connect(mapStateToProps)(Favorites)