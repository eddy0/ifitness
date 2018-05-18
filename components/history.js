import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import {fetchCalendarResults} from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import DateHeader from './dateHeader'
import MetricCard from './metricCard'
import  {AppLoading} from 'expo'

class History extends React.Component{
    state = {
        ready: false
    }

    componentDidMount() {
        const { dispatch } = this.props

        fetchCalendarResults()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(({entries}) => {
                if (!entries[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue(),
                    }))
                }
            })
            .then(() =>  this.setState(() => ({
                ready: true,
            })))
    }

    renderItem = ({ today, ...metrics}, formattedDate, key ) => (
        <View style={styles.item}>
            { today
            ?
              <View >
                  <DateHeader date={formattedDate} />
                  <Text style={styles.noDataText}> {today}</Text>
              </View>
            :
            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'EntryDetail',
                { entryId: key }
            ) }>
                <MetricCard
                metrics={metrics}
                date={formattedDate}
                />
            </TouchableOpacity>
            }
        </View>
    )

    renderEmptyDate(formattedDate) {
        return (
            <View style={styles.item}>
                <DateHeader date={formattedDate} />
                <Text style={styles.noDataText} > no data </Text>
            </View>
        )
    }



    render() {
        const  {entries} = this.props
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading/>
        }

        return (
                <UdaciFitnessCalendar
                    items={entries}
                    renderItem={this.renderItem}
                    renderEmptyDate={this.renderEmptyDate}

                />
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor:white,
        borderRadius: 16,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop:17,
        justifyContent:'center',
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOpacity:0.8,
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20,
    }
})

const mapStateToProps = (entries) => {
    return {
        entries,
    }
}




export default connect(mapStateToProps)(History)
