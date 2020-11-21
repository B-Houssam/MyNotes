import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {BoxShadow} from 'react-native-shadow';
import ImagePicker from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';
import {openDatabase} from 'react-native-sqlite-storage';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import Database from '../db/db';

const db = new Database();

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      uri: '',
      body: '',
      cat: 'Personal',
      isImage: false,
      isLocation: false,
      location: '',
      isLoading: false,
    };
  }
  render() {
    const dot = (
      <View style={styles.dot}>
        <Text
          style={{
            fontSize: 13,
            fontFamily: 'NunitoSans-ExtraBold',
            color: 'white',
          }}>
          !
        </Text>
      </View>
    );

    var radio_props = [
      {label: 'Personal', value: 'Personal'},
      {label: 'Work', value: 'Work'},
      {label: 'Home', value: 'Home'},
      {label: 'Ideas', value: 'Ideas'},
    ];

    const onpressD = () => {
      console.log('add pressed');
      this.props.navigation.dispatch(StackActions.replace('home'));
    };

    const onpressS = () => {
      if (this.state.title.length < 1) {
        Snackbar.show({
          text: 'At least add a title !',
          duration: Snackbar.LENGTH_SHORT,
          fontFamily: 'NunitoSans-Regular',
          backgroundColor: '#1e5276',
        });
      } else {
        this.setState({
          isLoading: true,
        });
        let data = {
          title: this.state.title,
          body: this.state.body,
          cat: this.state.cat,
          date: new Date().toDateString(),
          location: this.state.location,
          image: this.state.uri,
        };
        db.addNote(data)
          .then((result) => {
            console.log(result);
            this.setState({
              isLoading: false,
            });
            Snackbar.show({
              text: 'Added !',
              duration: Snackbar.LENGTH_SHORT,
              fontFamily: 'NunitoSans-Regular',
              backgroundColor: '#1e5276',
            });
            this.props.navigation.dispatch(StackActions.replace('home'));
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              isLoading: false,
            });
          });
        ////////
      }
    };

    const chooseImage = () => {
      let options = {
        title: 'Select Image',
        cameraType: 'front',
        mediaType: 'photo',
        storageOptions: {skipBackup: true, path: 'images'},
      };

      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          this.setState({
            uri: response.uri,
            isImage: true,
          });
        }
      });
    };

    const choosLocation = () => {
      this.props.navigation.dispatch(StackActions.push('loc'));
    };

    return (
      <View style={styles.back}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 10,
            alignItems: 'center',
            height: '5%',
          }}>
          <TouchableOpacity onPress={onpressD}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 85,
              }}>
              <Icon name="remove" size={20} color="#1e5276" />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'NunitoSans-Regular',
                  color: '#1e5276',
                }}>
                Dismiss
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.txt1}>New</Text>
          <TouchableOpacity onPress={onpressS}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 70,
              }}>
              <Icon name="save" size={20} color="#1e5276" />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'NunitoSans-Regular',
                  color: '#1e5276',
                }}>
                Save
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View
            style={{
              marginTop: 20,
              marginLeft: 30,
              marginRight: 30,
            }}>
            <TextInput
              placeholder="Add title!"
              onChangeText={(text) => this.setState({title: text})}
              style={{
                fontFamily: 'NunitoSans-ExtraBold',
                fontSize: 23,
              }}></TextInput>
          </View>
          <View
            style={{
              marginTop: 30,
              marginLeft: 30,
              marginRight: 30,
              marginBottom: 10,
              flex: 1,
            }}>
            <TextInput
              placeholder="Set your imagination free!!"
              onChangeText={(text) => this.setState({body: text})}
              multiline={true}
              style={{
                fontFamily: 'NunitoSans-Regular',
                fontSize: 15,
              }}></TextInput>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                labelHorizontal={false}
                formHorizontal={true}
                buttonColor={'#1e5276'}
                selectedButtonColor={'#b92627'}
                labelStyle={{
                  fontSize: 13,
                  color: '#1e5276',
                  fontFamily: 'NunitoSans-SemiBold',
                  marginTop: 5,
                }}
                animation={false}
                onPress={(value) => {
                  this.setState({cat: value});
                }}
              />
            </View>
            <View style={{marginLeft: 20}}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'NunitoSans-SemiBold',
                  color: '#b92627',
                }}>
                Last edited on: {new Date().toDateString()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 20,
              }}>
              <TouchableOpacity onPress={choosLocation}>
                <BoxShadow
                  setting={{
                    height: 60,
                    width: Dimensions.get('screen').width / 3,
                    color: '#a3b1c6',
                    border: 7,
                    radius: 10,
                    opacity: 0.17,
                    x: 3,
                    y: 3,
                  }}>
                  <BoxShadow
                    setting={{
                      height: 60,
                      width: Dimensions.get('screen').width / 3,
                      color: '#fff',
                      border: 7,
                      radius: 10,
                      opacity: 0.12,
                      x: -2,
                      y: -2,
                    }}>
                    <View style={styles.box}>
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: 'NunitoSans-SemiBold',
                          color: '#1e5276',
                        }}>
                        Add Location
                      </Text>
                      <Icon name="map-signs" size={20} color="#1e5276" />
                      {this.state.isLocation === true ? dot : <></>}
                    </View>
                  </BoxShadow>
                </BoxShadow>
              </TouchableOpacity>
              <TouchableOpacity onPress={chooseImage}>
                <BoxShadow
                  setting={{
                    height: 60,
                    width: Dimensions.get('screen').width / 3,
                    color: '#a3b1c6',
                    border: 7,
                    radius: 10,
                    opacity: 0.17,
                    x: 3,
                    y: 3,
                  }}>
                  <BoxShadow
                    setting={{
                      height: 60,
                      width: Dimensions.get('screen').width / 3,
                      color: '#fff',
                      border: 7,
                      radius: 10,
                      opacity: 0.12,
                      x: -2,
                      y: -2,
                    }}>
                    <View style={styles.box}>
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: 'NunitoSans-SemiBold',
                          color: '#1e5276',
                        }}>
                        Add image
                      </Text>
                      <Icon name="image" size={20} color="#1e5276" />
                      {this.state.isImage === true ? dot : <></>}
                    </View>
                  </BoxShadow>
                </BoxShadow>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#e0e5ec',
    height: 60,
    width: Dimensions.get('screen').width / 3,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  dot: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: '#b92627',
    position: 'absolute',
    right: 5,
    bottom: 5,
    alignItems: 'center',
  },
  back: {
    flex: 1,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: '#e0e5ec',
    flexDirection: 'column',
  },
  txt1: {
    color: '#b92627',
    fontFamily: 'NunitoSans-ExtraBold',
    fontSize: 40,
  },
  txt2: {
    color: '#1e5276',
    fontFamily: 'NunitoSans-ExtraBold',
    fontSize: 40,
  },
  edit: {
    fontSize: 17,
    fontFamily: 'NunitoSans-ExtraBold',
    color: '#1e5276',
  },
});

export default Add;
