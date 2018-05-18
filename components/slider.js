import React from 'react'
import {View, Text, Slider, StyleSheet} from 'react-native'
import { gray } from '../utils/colors'

class Sliders  extends React.Component {
    render() {
        const {max, unit, step, value, onChange} = this.props
        return (
            <View style={styles.row}  >
                <Slider
                    step={step}
                    value={value}
                    maximumValue={max}
                    minimunValue={0}
                    onValueChange={onChange}
                    style={{ flex: 1}}
                />
                    <View style={styles.counter} >
                        <Text style={{ fontSize: 24, textAlign:'center'}} >
                            {value}
                        </Text>
                        <Text style={{ fontSize: 18, textAlign:'center', color: gray}} >
                            {unit}
                        </Text>
                    </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems:'center',
    },
    counter: {
        width: 85,
        justifyContent:'center',
        alignItems: 'center',
    },

})

export default Sliders
