import React from 'react'
import { StyleSheet, View, Platform, Animated, Easing, PanResponder, Dimensions } from 'react-native'

import HelloWorld from './HelloWorld'

class Test extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            /* 4.2 - Animated values*/
            topPosition: new Animated.Value(0),
            leftPosition: new Animated.Value(0),
            panTopPosition: 0,
            panLeftPosition: 0
        }
        
        
        /* 4.2 - PanResponder */
        var { height, width } = Dimensions.get('window');
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let touches = evt.nativeEvent.touches;
                if(touches.length == 1) {
                    this.setState({
                        panTopPosition: touches[0].pageY - height/2,
                        panLeftPosition: touches[0].pageX - width/2
                    })
                }
            }
        })
        
    }
    
    componentDidMount() {
//        Animated.timing(
//            this.state.topPosition,
//            {
//                toValue: 100,
//                duration: 3000, // En millisecondes
////                easing: Easing.linear,
////                easing: Easing.back(),
////                easing: Easing.elastic(2),
//                easing: Easing.bounce,
//            }
//        ).start() // 4.2 - Lancement de l'animation avec la fonction start()
        
        /* 4.2 - Effet Elastique */
//        Animated.spring(
//            this.state.topPosition,
//            {
//                toValue: 100,
//                speed: 4,
//                bounciness: 300
//            }
//        ).start()
        
        /* 4.2 - Effet Décélération */
//        Animated.decay(
//            this.state.topPosition,
//            {
//                velocity: 0.4,
//                deceleration: 0.997,
//            }
//        ).start()
        
        /* 4.2 - Animated Sequence - Enchainement d'animations) */
//        Animated.sequence([
//            Animated.spring(
//                this.state.topPosition,
//                {
//                    toValue: 100,
//                    speed: 4,
//                    bounciness: 300
//                }
//            ),
//            Animated.timing(
//                this.state.topPosition,
//                {
//                    toValue: 0,
//                    duration: 3000,
//                    easing: Easing.elastic(2)
//                }
//            )
//        ]).start()
        
        /* 4.2 - Animated Parallel - Animations simultanées */
        Animated.parallel([
            Animated.spring(
                this.state.topPosition,
                {
                    toValue: 100,
                    tension: 8,
                    friction: 3
                }
            ),
            Animated.timing(
                this.state.leftPosition,
                {
                    toValue: 100,
                    duration: 1000,
                    easing: Easing.elastic(2)
                }
            )
        ]).start()
    }
    
    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.subview_container}>
                </View>
                <HelloWorld />
                <Animated.View style={[styles.animation_view, { top: this.state.topPosition, left: this.state.leftPosition }]}>
                </Animated.View>
                <View
                    {...this.panResponder.panHandlers}
                    style={[styles.animation_view_pan, { top: this.state.panTopPosition, left: this.state.panLeftPosition }]}>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subview_container: {
        ...Platform.select({
            ios: {
                backgroundColor: 'red',
                height: 100,
                width: 50
            },
            android: {
                backgroundColor: 'blue',
                height: 50,
                width: 100
            }
        })
    },
    animation_view: {
        backgroundColor: 'red',
        height: 100,
        width: 100
    },
    animation_view_pan: {
        backgroundColor: 'green',
        height: 100,
        width: 100
    }
})

export default Test