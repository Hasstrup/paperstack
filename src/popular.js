import FadeInView from './home-header'
import React, { Component } from 'react'
import { Animated, AppRegistry, View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, StatusBar, Platform, ActivityIndicator, RefreshControl, Button, Linking, Dimensions, TouchableWithoutFeedback} from 'react-native'
import PhotoGrid from 'react-native-photo-grid';
import SocketIOClient from 'socket.io-client'
import Share from 'react-native-share'
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modalbox'
import axios from 'axios'
import {
  shareOnFacebook,
  shareOnTwitter,
} from 'react-native-social-share';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'



const styles = StyleSheet.create({
  top_container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center',
    justifyContent: 'center'
  },

  modal: {
    backgroundColor: '#03030390',
    height: 180,
    width: 220,
    borderRadius: 4,
    justifyContent: 'center',
    paddingLeft: 10,
  },

  column: {
    flexDirection: 'column',
    flex: 1,
  },

  image: {
    flex: 1,
    borderRadius: 1
  },

  contained: {
    backgroundColor: 'black',
    flex: 1,
    height: 50,
    width: 50
  },

  caption: {
    display: 'none',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    height: 50,
    width: 188,
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


class Popular extends Component {
  constructor(props){
    super(props)
    this.socket = SocketIOClient('https://paperstack.ml')

    this.state={
      posts: [],
      navigation: this.props.navigation,
      refreshing: false,
      isOpen: false,
      linking: 'false',
      pressed: 'false'
    }
    this.socket.on('update', () => {
      axios.get('https://paperstack.ml/search')
      .then((response) => {

        var remainder = response.data.popular.length % 3
        if (remainder == 0) {
          this.setState({ posts: response.data.popular})
        } else {
          var display = response.data.popular.length - remainder
          var postxx = response.data.popular.splice(0, display)
          this.setState({ posts: postxx})
        }
      });
    })
  }


componentDidMount() {
      axios.get('https://paperstack.ml/search')
      .then(response => {
        var remainder = response.data.popular.length % 3
        if (remainder == 0) {
          this.setState({ posts: response.data.popular})
        } else {
          var display = response.data.popular.length - remainder
          var postxx = response.data.popular.splice(0, display)
          this.setState({ posts: postxx})
        }

      }).catch(err => {
        console.log(err)
      })
      this.props.navigation.setParams({ toggleState: this.toggleState})
    }

static navigationOptions =  ({navigation}) => {
  return {
    headerRight: <TouchableOpacity style={{ flex: 1, marginTop: 11}} onPress={() => navigation.navigate('SearchPosts')}><Icon type='evilicon' name='search' color='#909497' size={17}/></TouchableOpacity>,
  headerLeft: <TouchableOpacity style={{flex: 1, marginTop: 11}} onPress={() => navigation.state.params.toggleState()}><Icon name='spinner-2' type='evilicon' color='#909497' size={18} /></TouchableOpacity>,
  headerRightStyle: {
  marginLeft: 2,

  }
}};

grid = () => {

}


    //this is how a post is called anywhere
    _handlePress = (id) => {
      this.props.navigation.navigate('ShowPost', { postid:  id });
    }

    toggleState = () => {
      this.setState({isOpen:true})
    }


    handlePresser(){
      this.props.navigation.navigate('SearcPosts', { postid:  id })
    }

    _onRefresh = () =>  {
    this.setState({refreshing: true});
    axios.get('https://paperstack.ml/search')
    .then((response) => {
      var remainder = response.data.popular.length % 3
      if (remainder == 0) {
        this.setState({refreshing: false, posts: response.data.popular})
      } else {
        var display = response.data.popular.length - remainder
        var postxx = response.data.popular.splice(0, display)
        this.setState({ refreshing: false, posts: postxx, })
      }
    });
  }





  renderItem = (item, itemSize) => {
    return(
          <TouchableOpacity
            key = { item._id }
            style = {{ width: Dimensions.get('window').width/3, height: 220, backgroundColor: '#222222', marginLeft: 1 }}
            onPress = {() => this._handlePress(item)}>
            <Image
              resizeMode = "cover"
              style = {styles.image}
              source = {{ uri: item.thumbnail }}
            />
          <View style={styles.caption}>
            <Text style={styles.text1}> {item.title} </Text>
            <Text style={styles.text2}> {item.creator.name} </Text>
          </View>
          </TouchableOpacity>
        )
      }

      rateme = () => {
        this.setState({ pressed: 'true'})
        const url = 'https://itunes.apple.com/us/app/paperstack/id1329255755?ls=1&mt=8'
        setTimeout(() => {Linking.openURL(url).catch(err => { console.log(err)}) }, 500)
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




rate = () => {
  console.log('sharing')
  const url = 'https://twitter.com/getpaperstack'
  Linking.openURL(url).catch(err => { console.log(err)})
}



render() {

      let displayingcontent
      let modalcontent

      if(this.state.posts.length == 0) {
          displayingcontent = (

            <View style={{ flex: 1, position: 'absolute', top: 230, left: 180}}>
              <ActivityIndicator
                  color='white'
                  />
            </View>
            )}
    else {
        displayingcontent = (
          <FadeInView style={{flex: 1, backgroundColor:'#131313'}}>
          <PhotoGrid
            data = { this.state.posts }
            itemsPerRow = { 3 }
            itemMargin = { 1 }
            renderItem = { this.renderItem }
          />
        </FadeInView>
        )
      }

      if(this.state.linking === 'false') {
        modalcontent = (
          <View style={{ flex: 1, paddingTop: 25}}>
          <TouchableWithoutFeedback style={{ flex: 1, position: 'relative', top: 32, left: -6}} onPress={() => this.rateme()}>
            <Icon name='heart' type='evilicon' color={this.state.pressed === 'false' ? '#48C9B0' : '#EC7063'} size={this.state.pressed === 'false' ? 25 : 30}> Give some feedback </Icon>
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
            <TouchableOpacity   onPress={() => this.share('twitter')} style={{ flex: 1, position: 'absolute', top: 75, left: 80}}><Icon name='sc-twitter' type='evilicon' size={35} color='#898A8B'/></TouchableOpacity>
            <TouchableOpacity  onPress={() => this.share('whatsapp')} style={{ flex: 1, position: 'absolute', top: 75, right: 30}}><Icon name='logo-whatsapp' type='ionicon' size={25} color='#898A8B'/></TouchableOpacity>
          </View>


        )
      }

    return(
      <View style={styles.container}>
        <ScrollView style={styles.container}
          refreshControl={
            <RefreshControl
             refreshing={this.state.refreshing}
             onRefresh={this._onRefresh}
           />
          }
          >
        <StatusBar  barStyle='light-content'/>

          {displayingcontent}

        </ScrollView>
        <Modal isOpen={this.state.isOpen} style={styles.modal} onClosed={() => this.setState({isOpen: false, linking: 'false', pressed: 'false'})}>
          {modalcontent}
        </Modal>
        <View style={{ flex: 1, position: 'absolute', bottom: 0, opacity: 0}}>
          <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-6762059104295133/9287115741"
            onAdFailedToLoad={error => console.error(error)}
            />
        </View>
      </View>

      )
    }

}

export default Popular
