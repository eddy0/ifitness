import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Platform  } from 'react-native'
import AddEntry from './components/AddEntry.js'
import EntryDetail from './components/entryDetail.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
import History from './components/history'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import {white, purple} from './utils/colors'
import  { FontAwesome, Ionicons} from  '@expo/vector-icons'


const Tabs = createBottomTabNavigator({
    History: {
        screen: History,
        navigationOptions: {
            tabBarLabel: 'History',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
            },
        },
    AddEntry: {
            screen: AddEntry,
            navigationOptions: {
                tabBarLabel: 'AddEntry',
                tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
            },
        }}, {
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple: white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white: purple,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowRadius: 6,
            shadowOpacity: 1,
            shadowOffset: {
                width: 0,
                height:3,
            }
        }
    }
})

const MainNavigator = createStackNavigator ({
    Home: {
        screen: Tabs,
    },
    EntryDetail: {
        screen: EntryDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple
            }
        }
    }
})



export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
              <View style={{flex: 1}}>
                  <MainNavigator />
              </View>
            </Provider>
        )
    }
}

