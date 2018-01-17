import React, { Component } from 'react'
import { Alert, CameraRoll, AppRegistry, View, Image, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native'
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
const height = Dimensions.get('window').height
const styles = StyleSheet.create({

  container: {
    flex: 2,
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'black'
  },

  image: {
    flex: 1,
    height: height,
    width: dimensions,
    flexWrap: 'wrap',

  },

  imageR: {
    flex: 1,
    height: height,
    width: dimensions,
    flexWrap: 'wrap',

  },

  icxon: {
    zIndex: 2,
    position: 'absolute',
    top: 30,
    left: 10
  },

  caption: {
    zIndex: 1,
    backgroundColor: '#04040590',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 70,
    width: dimensions,
    paddingLeft: 15,
    paddingTop: 5

  },

  captionR: {
    zIndex: 1,
    backgroundColor: '#04040590',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 70,
    width: dimensions,
    paddingLeft: 15,
    paddingTop: 5

  },

  captionOne: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold'
  },

  captionTwo: {
    flex: 1,
    color: '#CACFD2'
  },

  captionThree: {
    flex: 1,
    color: '#898A8B'
  },

  modal: {
    backgroundColor: '#03030370',
    height: 200,
    width: 200,
    borderRadius: 4,
    justifyContent: 'center'
  }

})


class ShowPost extends Component {
  constructor(props) {
     super(props)
     this.state = {
       post: {},
       creatorname: '',
       resolution: '',
       title: '',
       isOpen: false,
       saving: 'hide',
       width: 0,
       opacity: 1
     }}

  static navigationOptions = {
  title: 'ShowPost',
  header: null
};

//receives a params 'post id' when it's been mounted, axios then fetches it and loads it into state,
componentDidMount() {
    const { params } = this.props.navigation.state;
      var { width, height} = Dimensions.get('window')
      this.setState({ post: params.postid, creatorname: params.postid.creator.name, resolution: params.postid.resolution, title: params.postid.title, width: width})
    }

  handlePress = () => {
    this.props.navigation.goBack()
  }

  toggle = () => {
    if(this.state.opacity === 1) {
      this.setState({ opacity: 0})
      console.log(styles.icxon.opacity)
      styles.icxon.opacity = 0
    } else {
      this.setState({ opacity: 1})
      styles.icxon.opacity = 0
    }
  }



savecamera = (image) => {
    this.setState({ saving: 'true', isOpen: true })
    //the post that is currently being viewed
    const { params } = this.props.navigation.state;
    //the request
    axios.get(`https://paperstack.ml/download/post/${params.postid._id}`)
    .then(response => {
      CameraRoll.saveToCameraRoll(image.link)
      .then(res => {
        this.setState({ saving: 'saved'})
        setTimeout(() => this.setState({ saving: 'done', isOpen: false}), 2000)
      })
    })
    .catch(err => { console.log(err)})
    }

render(){

  let displayingcontent

  var object_ting = Object.keys(this.state.post)

  if(object_ting.length == 0) {
      displayingcontent = (
            <View style={styles.container}>
              <View style={{ flex: 1, position: 'absolute', top: 230, left: 180}}>
                <ActivityIndicator
                    color='white'
                    />
              </View>
            </View>

        )}
else {
    displayingcontent = (
      <View style={styles.container}>
        <TouchableWithoutFeedback style={{ flex: 1, backgroundColor: '#04040590'}} onPress={() => this.toggle()}>
          <Image source={{ uri: this.state.post.thumbnail }} style={this.state.width > 374 ? styles.image : styles.imageR}/>
        </TouchableWithoutFeedback>


      <View style={styles.icxon}>
      <TouchableOpacity onPress={() => this.handlePress()}><Icon name='chevron-left' color='white' size={30}/></TouchableOpacity>
      </View>
        <View style={this.state.width > 374 ? {
          zIndex: 1,
          backgroundColor: '#04040590',
          flex: 1,
          opacity: this.state.opacity,
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 70,
          width: this.state.width,
          paddingLeft: 15,
          paddingTop: 5

        } : {
          zIndex: 1,
          backgroundColor: '#04040590',
          opacity: this.state.opacity,
          flex: 1,
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 70,
          width: this.state.width,
          paddingLeft: 15,
          paddingTop: 5

        }}>
          <View style={{ flex: 1}}>
            <Text style={styles.captionOne}> {this.state.title} </Text>
            <Text style={styles.captionTwo}> {this.state.creatorname}</Text>
            <Text style={styles.captionThree}> {this.state.resolution}</Text>
          </View>
          </View>


        <TouchableOpacity style={{ justifyContent: 'center', position: 'absolute', zIndex: 2, height: 70, bottom: 0, right: 2,  flex: 1, borderLeftWidth: this.state.opacity, borderLeftColor: '#76D7C420', width: this.state.width / 4.8, paddingTop: 25, paddingRight: 3, opacity: this.state.opacity}}
          onPress={() => this.savecamera(this.state.post)}
          >
          <View style={{ flex: 1, marginLeft: 4, opacity: this.state.opacity}}>
            <Icon name='ios-cloud-download-outline' type='ionicon' color='#898A8B' size={20}/>
          </View>

        </TouchableOpacity>


    </View>
    )
  }

  if(this.state.saving === 'true'){
    savingcontent = (
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator
            color='white'
            />
      </View>

    )
  } else if (this.state.saving === 'saved'){
    savingcontent = (
      <View style={{ flex: 1, justifyContent: 'center', paddingTop: 20}}>
        <Icon name='ios-checkmark-circle-outline' type='ionicon' color='#5DADE2' size={28}/>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 15, marginLeft: 65}}> Saved</Text>
      </View>
    )
  } else {
    savingcontent = (null)
  }




    return (
      <TouchableWithoutFeedback>
        <View style={{ flex: 1}}>
          {displayingcontent}
          <View style={{ flex: 1, position: 'absolute', bottom: -40, opacity: 0, zIndex: -1}}>
            <AdMobBanner
              adSize="fullBanner"
              adUnitID="ca-app-pub-6762059104295133/8538977024"
              onAdFailedToLoad={error => console.error(error)}
              />
          </View>
          <Modal isOpen={this.state.isOpen} style={styles.modal} swipeToClose={false} backdropPressToClose={false}>
            {savingcontent}
          </Modal>
        </View>
        </TouchableWithoutFeedback>


    )}}

export default ShowPost
