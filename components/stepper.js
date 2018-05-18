import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {FontAwesome, Entypo} from '@expo/vector-icons'
import {white, purple} from '../utils/colors'

class Steppers  extends React.Component {
    render() {
        const {max, unit, step, value, onIncrement, onDecrement} = this.props

        return (
            <View style={[styles.row, {justifyContent: 'space-between'}]} >
                <View style={[styles.row,]}>
                    <TouchableOpacity  onPress={onDecrement} style={[styles.iosBtn, {borderBottomRightRadius: 0, borderTopRightRadius: 0, }]} >
                        <FontAwesome name='minus' size={30} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={onIncrement} style={[styles.iosBtn, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]} >
                        <FontAwesome name='plus' size={30} color={'black'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.count}>
                    <Text  style={{ fontSize: 21,  textAlign:'center'}} >{value}</Text>
                    <Text  style={{ fontSize: 18,  textAlign:'center', color: '#999'}} >{unit}</Text>


                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create( {
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    iosBtn: {
        backgroundColor: white,
        borderColor: purple,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
    },
    androidBtn: {
        backgroundColor: white,
        borderColor: purple,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
    },
    content: {
        width: 85,
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default Steppers
