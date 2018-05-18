import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {gray, purple} from '../utils/colors'
import DateHeader from './dateHeader'
import {getMetricMetaInfo} from '../utils/helpers'



const  MetricCard = ({date, metrics}) => {
    return (
        <View>
            {date &&  <DateHeader date={date}/> }
            { Object.keys(metrics).map((metric) => {
                const { getIcon, displayName, unit, backgroundColor} = getMetricMetaInfo(metric)
                return (
                    <View style={styles.metric} key={metric}>
                        { getIcon() }
                        <View>
                            <Text style={{fontSize:20}}>
                                {displayName}
                            </Text>
                            <Text style={{fontSize: 16, color: gray}}>
                                {metrics[metric]}{unit}
                            </Text>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}


const styles = StyleSheet.create({
    metric: {
        flexDirection: 'row',
        marginTop: 12,
    },
})


export default MetricCard