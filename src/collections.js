import React, { Component } from 'react'
import { RefreshControl, AppRegistry, View, Text, ScrollView, Image, StatusBar, TouchableOpacity, StyleSheet, Linking, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Share from 'react-native-share'
import SocketIOClient from 'socket.io-client';
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modalbox'
import axios from 'axios'
import {
AdMobBanner,
AdMobInterstitial,
PublisherBanner,
AdMobRewarded,
} from 'react-native-admob'

const dimensions = Dimensions.get('window').width

var styles = StyleSheet.create({

  overlay: {
    width: dimensions,
    height: 230,
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 2,
  },

  modal: {
    backgroundColor: '#03030390',
    height: 180,
    width: 220,
    borderRadius: 4,
    justifyContent: 'center',
    paddingLeft: 10,
  },

  someimage: {
    flex: 1,
    position: 'relative',
     width: 500,
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



class Collections extends Component {
  constructor(props){
    super(props)
    this.socket = SocketIOClient('https://paperstack.ml')
    const width = Dimensions.get('window').width
    this.state = {
      collections: [],
      posts: [],
      display: '',
      refreshing: false,
      linking: 'false',
      isOpen: false,
      width: width,
      pressed: 'false'
    }

    this.socket.on('updatecollection', () => {
      axios.get('https://paperstack.ml/api/collections')
      .then((response) => {
        this.setState({posts: response.data.postarray, collections: response.data.collections});
      });
    })

  }

  static navigationOptions =  ({navigation}) => {
    return {
      headerRight: <TouchableOpacity style={{ flex: 1, marginTop: 11}} onPress={() => navigation.navigate('SearchPosts')}><Icon name='search' type='evilicon' color='#898A8B' size={17}/></TouchableOpacity>,
    headerLeft: <TouchableOpacity style={{flex: 1, marginTop: 11}} onPress={() => navigation.state.params.toggleState()}><Icon name='spinner-2' type='evilicon' color='#898A8B' size={18} /></TouchableOpacity>,
    headerRightStyle: {
    marginLeft: 2
    }
  }};

  componentDidMount() {
    axios.get('https://paperstack.ml/api/collections')
    .then(response => {
      this.setState({ collections: response.data.collections, posts: response.data.postarray})
    })
    .catch(err => {
      console.log(err)
    })
    this.props.navigation.setParams({ toggleState: this.toggleState})
  }







  toggleState = () => {
    this.setState({isOpen:true})
  }

    handlePress = (id, cname) => {
      this.props.navigation.navigate('CollectionPosts', {collectionid: id, name: cname})
    }


    rateme = () => {
      this.setState({ pressed: 'true'})
      const url = 'https://itunes.apple.com/us/app/paperstack/id1329255755?ls=1&mt=8'
      Linking.openURL(url).catch(err => { console.log(err)})
    }

  share = (option) => {
        this.setState({ isOpen: false, linking: 'false'})
        if(option !== 'whatsapp') {

        if(option == 'twitter') {

                  let options = {
                    title: 'Get Paperstack now',
                    message: 'Lockscreen magic - Get the absolute flyest wallpapers from the good folks at Paperstack. -- @GetPaperStack',
                    url: 'https://itunes.apple.com/us/app/paperstack/id1329255755?ls=1&mt=8',
                    social: option
                  }

                   Share.open(options)
                  .then(res => { console.log('yay')})
                  .catch(err => { console.log(err)})}

                  else {

                    let options = {
                      title: 'Get Paperstack now',
                      message: 'Lockscreen magic - Get the absolute flyest wallpapers from the good folks at Paperstack',
                      url: 'https://itunes.apple.com/us/app/paperstack/id1329255755?ls=1&mt=8',
                      social: option
                    }

                    Share.open(options)
                    .then(res => { console.log('yay')})
                    .catch(err => { console.log(err)})
                  }

                }

                else {
                  let options = {
                    title: 'Get Paperstack now',
                    message: 'Lockscreen magic - Get the absolute flyest wallpapers from the good folks at Paperstack',
                    url: 'https://itunes.apple.com/us/app/paperstack/id1329255755?ls=1&mt=8',
                    social: option
                    }
                    Share.open(options)
                    .then(res => { console.log('yay')})
                    .catch(err => { console.log(err)})
                  }
              }


    _onRefresh = () =>  {
    this.setState({refreshing: true});
    axios.get('https://paperstack.ml/api/collections')
    .then((response) => {
      this.setState({refreshing: false, posts: response.data.postarray, collections: response.data.collections});
    });
  }

  slider = (collection) =>{
    var random = collection.posts[Math.floor(Math.random()*collection.posts.length)]
    var display_photo = this.state.posts.find(post => post._id === random._id)
    return display_photo.thumbnail
}

rate = () => {
  console.log('sharing')
  const url = 'https://twitter.com/getpaperstack'
  setTimeout(() => {Linking.openURL(url).catch(err => { console.log(err)}) }, 500)
}



render() {

  let collections;
  let content

      if(this.state.collections.length > 0 ) {
        collections = this.state.collections.map(collection => {
          if(collection.posts.length > 0) {
            this.slider(collection)
        return (

        <TouchableOpacity style={{ flex: 1, width: 450, height: 230, zIndex: 3, marginBottom: 3}} key={collection._id}
          onPress={() => this.handlePress(collection)}
          >
          <View>
              <View style={styles.overlay} onPress={() => this.handlePress(collection._id)}></View>
              <Image source={{ uri: this.slider(collection)}}  style={{ flex: 1, position: 'absolute', zIndex: 1, height: 230, width: this.state.width}}/>

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

      if(this.state.linking === 'false') {
        modalcontent = (
          <View style={{ flex: 1, paddingTop: 25}}>
          <TouchableWithoutFeedback style={{ width: 30, height: 20, position: 'relative', top: 32, left: -6}} onPress={() => this.rateme()}>
            <Icon name='heart' type='evilicon' color={this.state.pressed === 'false' ? '#48C9B0' : '#EC7063'} size={this.state.pressed === 'false' ? 25 : 30}  > Give some feedback </Icon>
          </TouchableWithoutFeedback>

          <View style={{ flex: 1, height: 40, marginBottom: -5, position: 'relative', top: 20}} >
            <Text style={{ fontSize: 20, color: 'white'}} onPress={() => this.rate()}> Give some feedback </Text>
          </View>
          <View style={{ flex: 1}}>
            <Text style={{ fontSize: 20, color: '#898A8B'}} onPress={() => { this.setState({ linking: 'true' })}}> Share us with your friends </Text>
          </View>
        </View>
        )
      } else {
        modalcontent = (
          <View style={{ flex: 1}}>
            <TouchableOpacity style={{ flex: 1, position: 'absolute', top: 15, left: 0}} onPress={() => { this.setState({ linking: 'false'})}}>
              <Icon name='chevron-left'  size={25} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.share("facebook")} style={{ flex: 1, position: 'absolute', top: 75, left: 20}}><Icon name='sc-facebook' type='evilicon' size={35} color='#898A8B'/></TouchableOpacity>
            <TouchableOpacity   onPress={() => this.share("twitter")} style={{ flex: 1, position: 'absolute', top: 75, left: 80}}><Icon name='sc-twitter' type='evilicon' size={35} color='#898A8B'/></TouchableOpacity>
            <TouchableOpacity  onPress={() => this.share('whatsapp')} style={{ flex: 1, position: 'absolute', top: 75, right: 30}}><Icon name='logo-whatsapp' type='ionicon' size={25} color='#898A8B'/></TouchableOpacity>
          </View>


        )
      }





  return(
    <View style={{ flex: 1, backgroundColor: '#131313'}}>
      <ScrollView style={{ flex: 1}}
        refreshControl={
          <RefreshControl
           refreshing={this.state.refreshing}
           onRefresh={this._onRefresh}
         />
        }
        >
        <View style={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap', marginTop: 3}}>
          {collections}
        </View>
      </ScrollView>
      <Modal isOpen={this.state.isOpen} style={styles.modal} onClosed={() => this.setState({isOpen: false, linking: 'false', pressed: 'false'})}>
        {modalcontent}
      </Modal>
      <View style={{ flex: 1, position: 'absolute', bottom: 0, opacity: 0}}>
        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-6762059104295133/3897513109"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error('hi i am collection' + error)}
          />
      </View>
    </View>


)

}

}

export default Collections
