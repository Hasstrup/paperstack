import Posts from './posts'
import Popular from './popular'
import Collections from './collections'
import ShowPost from './show-post'
import SearchResults from './search-results'
import Header from './home-header'
import CollectionPosts from './show-collections'
import SearchPosts from './search'
import { Icon } from 'react-native-elements'
import React from 'react'
import { AppRegistry, View, NavigatorIOS, Text } from 'react-native'
import { TabNavigator, StackNavigator, TabBarTop } from 'react-navigation'

const Tabs = TabNavigator({
  Feed: {
    screen: Posts
  },
  Collections: {
    screen: Collections
  },
  Popular: {
    screen: Popular
  }
},
  {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,

    tabBarOptions: {

      style: {
        backgroundColor: '#1A1B1B',
        height: 43},

        labelStyle: {

          fontSize: 10,
          fontWeight: 'bold'
        },

        tabStyle: {
          borderTopWidth: 5,
          borderTopColor:  '#1A1B1B'
        },

        activeTintColor: '#198c8c',

        indicatorStyle: {
          backgroundColor: '#198c8c',
          height: 2

        }
    }}
);

Tabs.navigationOptions = ({navigate}) => {

  return {

  title: 'Paper-Stack',
headerStyle: {
  backgroundColor: '#1A1B1B',
  borderBottomColor: '#1A1B1B',
  borderBottomWidth: 0,
  height: 50,
  marginBottom: -2,
  paddingTop: 10,
  paddingLeft: 10,
  paddingRight: 10
},
headerTitleStyle: {
  color: 'white'
},
// headerRight: <Icon name='search' navigate={navigate} color='white' size={17} onPress={() => navigate('SearchPosts')}/>,
}
}

const RootTabs = StackNavigator({
  Home: {
    screen: Tabs,
    headerMode: 'screen'},

  ShowPost: {
    screen: ShowPost,
    headerMode: 'screen'
},

  CollectionPosts: {
    screen: CollectionPosts,
    headerMode: 'screen'
  },

  SearchPosts: {
    screen: SearchPosts,
    headerMode: 'screen'

  },

  SearchResults: {
    screen: SearchResults,
    headerMode: 'screen'

  }

}
)

export default RootTabs
