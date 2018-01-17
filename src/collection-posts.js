import React, { Component } from 'react'
import { AppRegistry, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Platform, Dimensions } from 'react-native'
import PhotoGrid from 'react-native-photo-grid';
import { Icon } from 'react-native-elements'
import SocketIOClient from 'socket.io-client';
import { withNavigation } from 'react-navigation'
import axios from 'axios'


const dimensions = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
  top_container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center',
    justifyContent: 'center'
  },

  column: {
    flexDirection: 'column',
    flex: 1,
  },

  image: {
    flex: 1
  },

  contained: {
    backgroundColor: 'black',
    flex: 1,
    height: 50,
    width: 50
  },

  caption: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    height: 50,
    width: (dimensions / 2) - 0.7,
    opacity: 0.7,
    paddingTop: 5,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#2980B950'

  },

  text1: {
    color: 'white'
  },
  text2: {
    color: '#898A8B',
    marginTop: 5
  },

  container: {
    flex: 1,
    backgroundColor: '#131313'
  }

})


class ResultPosts extends Component {
  constructor(props){
    super(props)
    this.state={
      posts: this.props.posts,
      navigation: this.props.navigation
    }}


static navigationOptions =  ({navigation}) => {
  return {
    headerRight: <Icon name='search' color='white' size={17} onPress={() => navigation.navigate('SearchPosts')}/>,
}};

    _handlePress(id){
      this.props.navigation.navigate('ShowPost', { postid:  id });
    }




  renderItem = (item, itemSize) => {
    return(
          <TouchableOpacity
            key = { item._id }
            style = {{ width: itemSize, height: 270}}
            onPress = {() => this._handlePress(item)}>
            <Image
              resizeMode = "cover"
              style = {styles.image}
              source = {{ uri: item.thumbnail }}
            />
          <View style={styles.caption}>
            <Text style={styles.text1}> {item.title} </Text>
            <Text style={styles.text2}> {item.creator.name}</Text>
          </View>
          </TouchableOpacity>
        )
      }

render() {

    return(
      <View style={styles.container}>
        <PhotoGrid
          data = { this.state.posts }
          itemsPerRow = { 2 }
          itemMargin = { 1 }
          renderItem = { this.renderItem }
        />
      </View>
      )
    }

}

export default withNavigation(ResultPosts)
