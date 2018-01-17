import FadeInView from './home-header'
import React, { Component } from 'react';
import { AppRegistry, RefreshControl, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, ActivityIndicator, Dimensions } from 'react-native'
import PhotoGrid from 'react-native-photo-grid';
import { Icon } from 'react-native-elements'
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
  }})



class CollectionPosts extends Component {
  constructor(props){
    super(props)
    this.state = {
      collection: {},
      posts: [],
      title: '',
      refreshing: false
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
  title: '#' + navigation.state.params.collectionid.name,
  headerStyle: {
    backgroundColor: '#1A1B1B',
    borderBottomColor: '#1A1B1B',
    borderBottomWidth: 0,
    height: 40,
    marginBottom: -2,
    //margintop
  },
  headerLeft: <TouchableOpacity onPress={() => navigation.goBack()}><Icon name='chevron-left' size={25} color='white' /></TouchableOpacity>,
  headerTitleStyle: {
    color: 'white'
  }}
};


  componentWillMount(){
    const { params } = this.props.navigation.state
    var collectionx = params.collectionid
      this.setState({ collection: collectionx, posts: collectionx.posts, title: collectionx.name})
    }


    _handlePress(id){
      this.props.navigation.navigate('ShowPost', { postid:  id });
    }

    _onRefresh = () =>  {
    this.setState({refreshing: true});
    const { params } = this.props.navigation.state
    axios.get(`https://paperstack.ml/collection/${params.collectionid._id}`)
    .then((response) => {
      this.setState({refreshing: false, posts: response.data.postarray, collection:response.data.collections, title: response.data.collections.name });
    });
  }

renderItem = (item, itemSize) => {
      return(
            <TouchableOpacity
              key = { item._id }
              style = {{ width: itemSize, height: 270 }}
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


  render() {

    let displayingcontent

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
          itemsPerRow = { 2 }
          itemMargin = { 1 }
          renderItem = { this.renderItem }

        />
    </FadeInView>
      )
    }

    return (
      <View style={styles.container}>
      <StatusBar
        backgroundColor="#222222"
        barStyle="light-content" />
      <ScrollView
        refreshControl={
          <RefreshControl
           refreshing={this.state.refreshing}
           onRefresh={this._onRefresh}
         />
        }
        >
        {displayingcontent}
      </ScrollView>
      <View style={{ flex: 1, position: 'absolute', bottom: 0}}>
        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-6762059104295133/6645471110"
          onAdFailedToLoad={error => console.error(error)}
          />
      </View>
      </View>

    )
  }

}

export default CollectionPosts
