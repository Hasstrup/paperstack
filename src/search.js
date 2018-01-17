import FadeInView from './home-header'
import ResultCollections from './collection-results'
import ResultPosts from './collection-posts'
import React, { Component } from 'react'
import SocketIOClient from 'socket.io-client'
import { ActivityIndicator, RefreshControl, AppRegistry, Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'
import axios from 'axios'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'


const dimensions = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',


  },
  inputfield: {
      backgroundColor: '#212121',
      borderTopColor: '#212121',
      borderBottomColor: '#212121',
      borderRightColor: '#212121',
      borderLeftColor: '#212121',
      borderWidth: 2
  }
})



export default  class SearchPosts extends Component {
  constructor(props){
    super(props)
    this.socket = SocketIOClient('https://paperstack.ml')

    this.state={
      sttop: 'false',
      text: '',
      collections: [],
      posts: [],
      postarray: [],
      refreshing: false,

    }

    // this.socket.on('popularx', () => {
    //   console.log('first' + ' ' + this.state.posts.count)
    //
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // })
}

static navigationOptions =  ({navigation}) => {
      return {
      title: '#SearchPaperStack',
      headerLeft: <TouchableOpacity onPress={() => navigation.goBack()}><Icon name='chevron-left' size={25} color='white' /></TouchableOpacity> ,
      headerTitleStyle: {
      color: 'white'
      },
      headerStyle: {
        backgroundColor: '#222222',
        paddingLeft: 10
      }
    }};


componentDidMount() {
  axios.get(`https://paperstack.ml/search`)
  .then(response => {
    this.setState({ collections: response.data.collectionoftheweek, posts: response.data.postsoftheweek, postarray: response.data.postarray })
  }).catch(err => {
    console.log(err)
  })
}







handleSubmit = () => {
  this.setState({ sttop: 'undefined'}, function(){
    console.log(this.state.sttop)
    this.props.navigation.navigate('SearchResults', {query: this.state.text})
  })}




_onRefresh = () =>  {
    this.setState({refreshing: true});
    axios.get('https://paperstack.ml/search')
    .then((response) => {
      this.setState({refreshing: false, posts: response.data.postsoftheweek, collections: response.data.collectionoftheweek, postarray: response.data.postarray});
    });
    console.log(this.state.posts)
  }


render(){
  let explorecontent
  let collectioncontent
  let postcontent

  if(this.state.collections.length > 0) {
    collectioncontent = (
      <View style={{ flex: 1, paddingBottom: 20}}>
        <View style={{ flex: 1, marginTop: 15, borderBottomColor: '#76D7C410', borderBottomWidth: 1, paddingBottom: 12, paddingLeft: 3}}>
          <Text style={{ color: '#898A8B', fontSize: 20, fontWeight: 'bold'}}> Collection of the Day <View style={{ flex: 1, width: 20, height: 10, paddingLeft: 5, marginTop: -1}}><Icon name='ios-heart' type='ionicon' color='#EC706380' size={17}/></View></Text>
        </View>
        <View style={{ flex: 1, marginTop: 20}}>
          <ResultCollections stop={this.state.sttop === 'false' ? 'false' : 'true'} collections={this.state.collections} posts={this.state.postarray}/>
        </View>
      </View>

    )} else {
      collectioncontent = null
    }

    if(this.state.posts.length > 0) {
      postcontent = (
        <View style={{ flex: 1}}>
          <View style={{ flex: 1, marginTop: 15, borderBottomColor: '#65666610', borderBottomWidth: 1, paddingBottom: 12, paddingLeft: 3}}>
            <Text style={{ color: '#898A8B', fontSize: 20, fontWeight: 'bold'}}> Suggested Photos <View style={{ flex: 1, width: 20, height: 10, paddingLeft: 5}}><Icon name='ios-infinite-outline' type='ionicon' color='#48C9B0' size={17}/></View></Text>
            </View>
          <View style={{ flex: 1, marginTop: 20}}>
            <ResultPosts posts={this.state.posts}/>
          </View>
         </View>

      )} else {
      postcontent = (null)
    }

    if(this.state.posts.length > 0 || this.state.collections.length > 0) {
      explorecontent = (
        <ScrollView
          refreshControl={
            <RefreshControl
             refreshing={this.state.refreshing}
             onRefresh={this._onRefresh} />}
          >
          <FadeInView style={{flex: 1, backgroundColor:'#131313'}}>
          {collectioncontent}
          {postcontent}
        </FadeInView>
        </ScrollView>
      )
    } else {
      explorecontent = (

          <View style={{ flex: 1, position: 'absolute', top: 230, left: 180}}>
            <ActivityIndicator
                color='white'
                />
          </View>
      )
    }


    return(
      <View style={styles.container}>
        <View style={styles.inputcontainer}>
          <SearchBar containerStyle={styles.inputfield}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
            onSubmitEditing={() => this.handleSubmit()} ref='search'
            keyboardAppearance={'dark'}
            ref={(c) => this._input = c}
            onPress={() => { this._input.focus()}}
            />
        </View>
        <View style={{ flex: 2, marginTop: 20, paddingLeft: 2}}>
          {explorecontent}
        </View>


        <View style={{ flex: 1, position: 'absolute', bottom: 0, opacity: 0.8}}>
          <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-6762059104295133/4229570074"
            onAdFailedToLoad={error => console.error(error)}
            />
        </View>

      </View>
    )
  }
}
