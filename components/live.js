import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import {Foundation} from  '@expo/vector-icons'
import {white, purple } from '../utils/colors'
import {Location, Permissions } from 'expo'
import {calculateDirection} from '../utils/helpers'

import { connect } from 'react-redux'
import MetricCard from './metricCard'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'
import TextButton from './textButton'

class Live extends React.Component{
    state = {
        coords: null,
        status: 'undetermined',
        direction: '',
    }

    componentDidMount() {
        Permissions.getAsync(Permissions.LOCATION)
            .then(({status}) => {
                if (status === 'granted') {
                    return this.setLocation()
                }

                this.setState(() => ({status}))
            })
            .catch((error) => {
                console.warn('Error o getting Locations', error)
                this.setState(() => ({status: 'undetermined'}))

            })
    }
    askPermission = () => {
        Permissions.askAsync(Permissions.LOCATION)
            .then(({status}) => {
                if (status === 'granted') {
                    return this.setLocation()
                }

                this.setState(() => ({status}))
            })
            .catch((error) => {
                console.warn('Error o getting Locations', error)
            })
    }

    setLocation = () => {
        Location.watchPositionAsync({
            enableHighAccuracy: true,
            timeInterval: 1,
            distanceInterval: 1,
        }, ({coords}) => {
            const newDirection = calculateDirection(coords.heading)
            const {direction} = this.state
            this.setState(() => ({
                coords,
                status: 'granted',
                direction: newDirection,
            }))
        })
    }
    render() {
        const { status, coords, direction} = this.state
        if (status === null) {
            return (
                <ActivityIndicator style={{marginTop:30}}/>
            )
        }
        if (status === 'denied') {
            return (
                <View style={styles.center}>
                    <Foundation name='alert' size={50} />
                    <Text> please go to your setting to enable the location </Text>
                </View>
            )
        }

        if (status === 'undetermined') {
            return (
                <View style={styles.center}>
                    <Foundation name='alert' size={50} />
                    <Text> you need to enable the service for this app </Text>
                    <TouchableOpacity onPress={this.askPermission}  style={styles.button}>
                        <Text style={styles.buttonText}> Enable </Text>
                    </TouchableOpacity>

                </View>
            )
        }

       return (
           <View style={styles.container}>
               <View style={styles.center}>
                   <Text style={styles.header}> you are heading </Text>
                   <Text style={styles.direction}> {direction} </Text>
               </View>
               <View style={styles.metricContainer} >
                   <View style={styles.metric} >
                       <Text style={[styles.header, {color: white}]}>
                           Altitude
                       </Text>
                       <Text style={[styles.subHeader, {color: white}]}>
                           { Math.round(coords.altitudeAccuracy)} Meters
                       </Text>
                   </View>
                   <View style={styles.metric} >
                       <Text style={[styles.header, {color: white}]}>
                           Speed
                       </Text>
                       <Text style={[styles.subHeader, {color: white}]}>
                           { Math.round(coords.speed).toFixed(1)} KM/H
                       </Text>
                   </View>

               </View>

           </View>
       )

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    center: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 30,
        marginRight: 30,
    },
    button: {
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText: {
        color: white,
        fontSize: 22,
    },
    header: {
        fontSize: 35,
        textAlign: 'center',
    },
    direction: {
        color: purple,
        fontSize: 100,
        textAlign: 'center'
    },
    metricContainer: {
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor: purple,
    },
    metric: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 5
    },

})


export default Live