import FadeInView from './home-header'
import SearchCollections from './search-collection'
import ResultPosts from './collection-posts'
import RelatedPosts from './related-posts'
import React, { Component } from 'react'
import { AppRegistry, Text, View, StyleSheet, ScrollView, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'
import PhotoGrid from 'react-native-photo-grid';
import axios from 'axios'
import fetch from 'fetch'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'


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


class SearchResults extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts: [],
      relatedposts: [],
      collections: [],
      allposts: [],
      brokentags: [],
      loaded: ''
    }}


static navigationOptions =  ({navigation}) => {
        return {
        title: '#' + navigation.state.params.query,
        headerLeft: <TouchableOpacity onPress={() => navigation.goBack()}><Icon name='chevron-left' size={25} color='white' /></TouchableOpacity>,
        headerTitleStyle: {
          color: 'white'
        },
        headerStyle: {
          backgroundColor: '#222222',
          paddingLeft: 10
        }
      }}


  componentDidMount(){
    const { params } = this.props.navigation.state
    let query
    if(params.query.indexOf(' ') !== -1){
      query = params.query.trim().replace(/ /g, '-').toLowerCase()
    } else {
      query = params.query.trim().toLowerCase()
    }
    axios.get(`https://paperstack.ml/search/${query}`)
    .then(response => {
      this.setState({
        posts: response.data.posts_with_tags,
        relatedposts: response.data.related_to_posts_with_tags,
        collections: response.data.normalcollection,
        brokentags: response.data.post_with_broken_tags,
        allposts: response.data.posts,
        loaded: 'true'
      })}).catch(err =>{
        console.log('something went wrong')
        console.log(err)
    })}






  render() {

      let displayingcontent;
      let postcontent;
      let relatedpostcontent
      let collectioncontent
      let brokentagcontent

      if(this.state.posts.length > 0) {
        postcontent = (
          <View style={{ flex: 1}}>
            <View style={{ flex: 1, marginTop: 15, borderBottomColor: '#76D7C410', borderBottomWidth: 1, paddingBottom: 12, paddingLeft: 3}}>
              <Text style={{ color: '#898A8B', fontSize: 20, fontWeight: 'bold'}}> Posts </Text>
            </View>
            <View style={{ flex: 1, marginTop: 20}}>
              <ResultPosts posts={this.state.posts}/>
            </View>
          </View>

        )
      } else {
        postcontent = ( null )
      }

      if(this.state.relatedposts.length > 0) {
        relatedpostcontent = (
          <View style={{ flex: 1}}>
            <View style={{ flex: 1, marginTop: 15, borderBottomColor: '#76D7C410', borderBottomWidth: 1, paddingBottom: 12, paddingLeft: 3}}>
              <Text style={{ color: '#898A8B', fontSize: 20, fontWeight: 'bold'}}> Might be Related </Text>
            </View>
            <View style={{ flex: 1, marginTop: 20}}>
              <RelatedPosts posts={this.state.relatedposts} allposts={this.state.allposts}/>
            </View>
          </View>

        )
      } else {
        relatedpostcontent = ( null )
      }

      if(this.state.brokentags.length > 0) {
        brokentagcontent = (
          <View style={{ flex: 1}}>
            <View style={{ flex: 1, marginTop: 15, borderBottomColor: '#76D7C410', borderBottomWidth: 1, paddingBottom: 12, paddingLeft: 3}}>
              <Text style={{ color: '#898A8B', fontSize: 20, fontWeight: 'bold'}}> Possibly Related </Text>
            </View>
            <View style={{ flex: 1, marginTop: 20}}>
              <ResultPosts posts={this.state.brokentags}/>
            </View>
          </View>


        )
      } else {
        brokentagcontent = ( null )
      }


        if(this.state.collections.length > 0) {
          collectioncontent = (
            <View style={{ flex: 1}}>
              <View style={{ flex: 1, marginTop: 15, borderBottomColor: '#76D7C410', borderBottomWidth: 1, paddingBottom: 12, paddingLeft: 3}}>
                <Text style={{ color: '#898A8B', fontSize: 20, fontWeight: 'bold'}}> Collections </Text>
              </View>
              <View style={{ flex: 1, marginTop: 20}}>
                <SearchCollections collections={this.state.collections} posts={this.state.allposts}/>
              </View>
            </View>




          )
        } else {
          collectioncontent = ( null )
        }

  if(this.state.collections.length == 0 && this.state.posts.length == 0 && this.state.relatedposts.length == 0
            && this.state.brokentags.length == 0 && this.state.loaded === '')
           {
             displayingcontent = (
               <View style={{ flex: 1 }}>
                 <View style={{ flex: 1, position: 'absolute', top: 230, left: 180}}>
                   <ActivityIndicator
                       color='white'
                       />
                 </View>
               </View>
             )}

  else if(this.state.collections.length == 0 && this.state.posts.length == 0 && this.state.relatedposts.length == 0
               && this.state.brokentags.length == 0 && this.state.loaded === 'true') {

                displayingcontent = (
                  <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, position: 'absolute', top: 230, left: 70}}>
                      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}> Oops! We couldnt find anything on that </Text>
                    </View>
                  </View>
                )
      } else {
        displayingcontent = (
            <View style={{ flex: 1, paddingLeft: 3, paddingTop: 5}}>
              <FadeInView style={{flex: 1, backgroundColor:'#131313'}}>
              {collectioncontent}
              {postcontent}
              {brokentagcontent}
              {relatedpostcontent}
            </FadeInView>
            </View>

        )
        }




    return (
      <View style={{ flex: 1, backgroundColor: '#131313' }}>
        <ScrollView style={styles.container}>
          <StatusBar  barStyle='light-content'/>
           {displayingcontent}
        </ScrollView>
        <View style={{ flex: 1, position: 'absolute', bottom: 0, opacity: 0.8}}>
          <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-6762059104295133/1369141438"
            onAdFailedToLoad={error => console.error(error)}
            />
        </View>

      </View>

    )

  }

}

export default SearchResults
