import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
  ScrollView,
  Button,
  Image,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import Icon from 'react-native-vector-icons/FontAwesome';
import SlidingUpPanel from 'rn-sliding-up-panel';

class NoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  loc = (
    <View style={styles.loc}>
      <TouchableOpacity
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Icon name="map-marker" size={20} color="#1e5276" />
        <Text style={styles.location}>{this.props.location}</Text>
      </TouchableOpacity>
    </View>
  );

  img = (
    <View
      style={{
        height: 150,
        width: '100%',
        marginTop: 15,
      }}>
      <Image style={styles.image} source={{uri: this.props.image}} />
    </View>
  );

  desc = (
    <Text numberOfLines={3} style={styles.desc}>
      {this.props.desc}
    </Text>
  );
  render() {
    return (
      <View style={styles.out}>
        <View style={styles.box}>
          <Text style={styles.date}>{this.props.date}</Text>
          <Text style={styles.cat}>{this.props.title}</Text>
          {this.props.desc === '' ? <></> : this.desc}
          {this.props.image === '' ? <></> : this.img}
          {this.props.location === '' ? <></> : this.loc}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={styles.cat}>{this.props.cat}</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: '#e0e5ec',
    width: Dimensions.get('screen').width * 0.905,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    padding: 20,
    elevation: 4,
  },
  out: {
    flexDirection: 'column',
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 20,
  },
  date: {
    fontSize: 13,
    fontFamily: 'NunitoSans-SemiBold',
    color: '#b92627',
    marginBottom: 10,
  },
  location: {
    fontSize: 15,
    fontFamily: 'NunitoSans-ExtraBold',
    color: '#1e5276',
    marginLeft: 10,
  },
  loc: {
    marginTop: 20,
  },
  desc: {
    fontSize: 15,
    fontFamily: 'NunitoSans-SemiBold',
    color: '#1e5276',
    marginTop: 10,
  },
  edit: {
    fontSize: 15,
    fontFamily: 'NunitoSans-SemiBold',
    color: '#b92627',
  },
  cat: {
    fontSize: 17,
    fontFamily: 'NunitoSans-ExtraBold',
    color: '#1e5276',
  },
  image: {
    width: '100%',
    height: '100%',
    //resizeMode: 'contain',
    borderRadius: 5,
  },
});

export default NoteBox;
