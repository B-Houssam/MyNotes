import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Boxes from '../components/boxes';
import NoteBox from '../components/noteBox';

const url = 'https://github.com/B-Houssam';

class Home extends Component {
  state = {};
  render() {
    const onPress = () => {
      //Linking.openURL(url).catch((err) => console.error('An error occurred', err));
      console.log('add pressed');
      this.props.navigation.navigate('add');
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
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.txt1}>My</Text>
            <Text style={styles.txt2}>Notes</Text>
          </View>
          <TouchableOpacity onPress={onPress}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 100,
              }}>
              <Icon name="plus" size={20} color="#1e5276" />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'NunitoSans-Regular',
                  color: '#1e5276',
                }}>
                Add Note
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceHorizontal={true}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              marginLeft: 20,
              alignItems: 'center',
            }}>
            <ScrollView horizontal={true}>
              <View style={{padding: 10}}>
                <Boxes text="All"></Boxes>
              </View>
              <View style={{padding: 10}}>
                <Boxes text="Personal"></Boxes>
              </View>
              <View style={{padding: 10}}>
                <Boxes text="Work"></Boxes>
              </View>
              <View style={{padding: 10}}>
                <Boxes text="Home"></Boxes>
              </View>
              <View style={{padding: 10}}>
                <Boxes text="Ideas"></Boxes>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginTop: 35,
              marginBottom: 35,
            }}>
            <NoteBox
              date="today at 16:09"
              desc="hi dont forget to throw the trash!"
              cat="Home"></NoteBox>
            <NoteBox
              date="today at 12:59"
              desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              cat="Personal"></NoteBox>
            <NoteBox
              date="today at 16:09"
              desc="hi dont forget to throw the trash!"
              cat="Work"></NoteBox>
            <NoteBox
              date="today at 16:09"
              desc="hi dont forget to throw the trash!"
              cat="Home"></NoteBox>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  back: {
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
  box: {
    backgroundColor: '#e0e5ec',
    height: Dimensions.get('screen').width / 5,
    width: Dimensions.get('screen').width / 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteBox: {
    height: Dimensions.get('screen').width / 3,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 13,
    elevation: 5,
  },
});

export default Home;
