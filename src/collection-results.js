import FadeInView from './home-header'
import React, { Component } from 'react'
import { AppRegistry, View, Text, ScrollView, Image, StatusBar, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import axios from 'axios'

const dimensions = Dimensions.get('window').width
const height = Dimensions.get('window').height

var styles = StyleSheet.create({

  overlay: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 2,
    width: 450,
    height: 230,
  },

  someimage: {
    flex: 1,
    position: 'relative',
     width: dimensions,
     height: 225,
     zIndex: 1
  },

  caption: {
    flex: 1,
    backgroundColor: 'rgba(7, 7, 8, 0.4)',
    position: 'absolute',
     top: 180,
     left: 0,
     zIndex: 4,
     height: 50,
     width: dimensions,
     alignItems: 'flex-start',
     paddingTop: 5,
     paddingLeft: 10
  },
  text: {
     fontSize: 17,
     color: 'white',
     fontWeight: 'bold',
     marginBottom: 5,
     marginLeft: -2
  },

  text2: {
    color: '#898A8B',
    marginTop: -1,
    fontSize: 13,
    marginLeft: -2
  }
})



class ResultCollections extends Component {
  constructor(props){
    super(props)
    const width = Dimensions.get('window').width
    this.state = {
      collections: this.props.collections,
      posts: this.props.posts,
      uri: '',
      stop: this.props.stop,
      width: width
    }
  }

  slider = (collection) => {

    var random = collection.posts ?  collection.posts[Math.floor(Math.random()*collection.posts.length)] : null
    var display_photo = this.state.posts.find(post => post._id === (random !== null ? random._id : null))
    var timer =  setTimeout(()=> {
      if(this._image !== null) {
        this._image.setNativeProps({
          source: [{ uri: this.slider(collection)}]
        })

      } else { }}, 8000)

  if(collection.posts !== undefined && this.props.stop === 'false' ){
    return display_photo.thumbnail
  }
   else {
    clearTimeout(timer)
    if(display_photo){
      return display_photo.thumbnail } else { }
  }}


  componentWillUnmount () {
    var collectionn = {}
    this.slider(collectionn)
  }




    handlePress = (id, cname) => {
      this.props.navigation.navigate('CollectionPosts', {collectionid: id, name: cname})
    }

render() {

  let collections;
      if(this.state.collections.length > 0 ) {
    collections = this.state.collections.map(collection => {
      if(collection.posts.length > 0) {
      var random = collection.posts[Math.floor(Math.random()*collection.posts.length)]
      var display_photo = this.state.posts.find(post => post._id === random._id)
      return (
        <TouchableOpacity style={{ flex: 1, width: 450, height: 230, zIndex: 3, marginBottom: 1}} key={collection._id}
          onPress={() => this.handlePress(collection)}
          >
          <View>
              <View style={styles.overlay} onPress={() => this.handlePress(collection._id)}></View>
              <FadeInView style={{flex: 1, backgroundColor:'#131313'}}>
              <Image source={{ uri: this.slider(collection) }} ref={(c) => this._image = c} style={{ flex: 1, position: 'absolute', zIndex: 1, height: 230, width: this.state.width}}/>
              </FadeInView>
                <View style={styles.caption}>
                    <Text style={styles.text}> {collection.name} </Text>
                    <View style={{ flex: 1, width: 50, borderTopWidth: 2, borderTopColor: '#198c8c'}}>
                    </View>
                    <Text style={styles.text2}> {collection.posts.length} {collection.posts.length > 1 ? 'Photos': 'Photo'} </Text>
                  </View>
              </View>
        </TouchableOpacity>)}

    else {
      return(
                null
              )}})} else {
      collections = (null)}




  return(
    <View style={{ flex: 1}}>
      <ScrollView style={{ flex: 1}}>
        <View style={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap'}}>
          {collections}
        </View>
      </ScrollView>
    </View>


)

}

}

export default withNavigation(ResultCollections)
