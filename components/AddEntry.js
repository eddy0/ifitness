import React from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import {Ionicons} from '@expo/vector-icons'
import { purple, white} from '../utils/colors'

import Sliders from './slider'
import Steppers from './stepper'
import DateHeader from './dateHeader'
import TextButton from './textButton'
import {submitEntry, removeEntry} from '../utils/api'
import { connect } from 'react-redux'
import {addEntry} from '../actions'
import { NavigationActions } from 'react-navigation'


const SubmitBtn = ( {onPress}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={Platform.OS === 'ios' ? styles.isoSubmitBtn : styles.androidSubmitBtn}
        >
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}


class AddEntry extends React.Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    }
    increment = (metric) => {
        const {max, step} =getMetricMetaInfo(metric)
        this.setState((state) => {
            const count = state[metric] + step
            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        const { step} =getMetricMetaInfo(metric)
        this.setState((state) => {
            const count = state[metric] - step
            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => {
            return {
                [metric]: value,
            }
        })
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        this.props.dispatch(addEntry({
            [key]: entry
        }))

        this.setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        })

        this.toHome()

        submitEntry({ key, entry})
    }

    reset = () => {
        const key = timeToString()
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))
        this.toHome()
        removeEntry(key)
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddEntry',
        }))
    }


    render() {
        const metaInfo = getMetricMetaInfo()
        console.log(this.props)
        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons
                        name='ios-happy-outline'
                        size={100}
                    />
                    <Text>
                        You have already logged your information for today
                    </Text>
                    <TextButton onPress={this.reset} style={{padding: 10}}>
                            Reset
                    </TextButton >
                </View>
            )
        }

        return (
            <View style={styles.container} >
                <DateHeader date={(new Date()).toDateString()} />

                { Object.keys(metaInfo).map((key) => {
                    const {getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]
                    return (
                        <View key={key} style={styles.row}>
                            { getIcon() }
                            { type === 'slider'
                                ? <Sliders
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                    />
                                : <Steppers
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />
                            }
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

function mapStateToProps(state) {
    const key = timeToString()
    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: white,
    },
    row: {
        flexDirection:'row',
        flex: 1,
        alignItems:'center',
    },
    isoSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 4,
        height:45,
        marginRight:40,
        marginLeft:40,
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 4,
        height:45,
        marginRight:30,
        marginLeft:30,
        alignSelf: 'flex-end',
        alignItems:'center',
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 22,
        textAlign:'center'
    },
    center: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
})


export default connect(mapStateToProps)(AddEntry)