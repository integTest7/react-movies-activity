import React from 'react'
import { Animated, Dimensions, StyleSheet } from 'react-native'

class FadeIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            positionLeft: new Animated.Value(Dimensions.get('window').width)
        }
    }
    
    componentDidMount() {
        Animated.spring(
            this.state.positionLeft,
            {
                toValue: 0   
            }
        ).start()
    }
    
    render() {
        return (
            <Animated.View
                style={[styles.animation_view, { left: this.state.positionLeft }]}>
                { this.props.children }
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    animation_view: {
        
    }
})

export default FadeIn