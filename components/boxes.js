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

class Boxes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity>
        <BoxShadow
          setting={{
            height: Dimensions.get('screen').width / 5,
            width: Dimensions.get('screen').width / 5,
            color: '#a3b1c6',
            border: 7,
            radius: 10,
            opacity: 0.13,
            x: 3,
            y: 3,
          }}>
          <BoxShadow
            setting={{
              height: Dimensions.get('screen').width / 5,
              width: Dimensions.get('screen').width / 5,
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
                  fontSize: 15,
                  fontFamily: 'NunitoSans-Regular',
                  color: '#1e5276',
                }}>
                {this.props.text}
              </Text>
            </View>
          </BoxShadow>
        </BoxShadow>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: '#e0e5ec',
    height: Dimensions.get('screen').width / 5,
    width: Dimensions.get('screen').width / 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Boxes;
