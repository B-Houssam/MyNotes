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
import {BoxShadow} from 'react-native-shadow';

class NoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.out}>
        <BoxShadow
          setting={{
            height: Dimensions.get('screen').height / 4.5,
            width: Dimensions.get('screen').width * 0.9,
            color: '#a3b1c6',
            border: 20,
            radius: 20,
            opacity: 0.2,
            x: 7,
            y: 8,
          }}>
          <View style={styles.box}>
            <Text style={styles.date}>{this.props.date}</Text>
            <Text numberOfLines={3} style={styles.desc}>
              {this.props.desc}
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.cat}>{this.props.cat}</Text>
              <TouchableOpacity>
                <Text style={styles.edit}>View note</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BoxShadow>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: '#e0e5ec',
    height: Dimensions.get('screen').height / 4.5,
    width: Dimensions.get('screen').width * 0.905,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 20,
  },
  out: {
    paddingBottom: 30,
    paddingLeft: 20,
  },
  date: {
    fontSize: 13,
    fontFamily: 'NunitoSans-SemiBold',
    color: '#b92627',
  },
  desc: {
    fontSize: 15,
    fontFamily: 'NunitoSans-SemiBold',
    color: '#1e5276',
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
});

export default NoteBox;
