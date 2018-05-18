import React from 'react'
import {View, Text} from 'react-native'
import { purple } from '../utils/colors'

class DateHeader extends React.Component {
    render() {
        return (
                <Text style={{color: purple, fontSize: 25}}>
                    { this.props.date }
                </Text>
        )
    }
}

export default DateHeader
