import React, {Component} from 'react';
import {StyleSheet, Animated, Text, View, Dimensions} from 'react-native';
import {SimpleAnimation} from 'react-native-simple-animations';

class Splash extends Component {
  state = {};

  render() {
    setTimeout(() => {
      this.props.navigation.navigate('home');
      console.log('timeup');
    }, 2000);

    return (
      <View style={{backgroundColor: '#e0e5ec'}}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.containertl}>
              <SimpleAnimation
                delay={500}
                duration={800}
                fade
                staticType="zoom">
                <Text style={styles.textup}>My</Text>
              </SimpleAnimation>
            </View>
            <SimpleAnimation
              delay={500}
              duration={400}
              fade
              movementType="slide"
              direction="up"
              distance={1000}>
              <View style={styles.containertr}></View>
            </SimpleAnimation>
          </View>
          <View style={{flexDirection: 'row'}}>
            <SimpleAnimation
              delay={500}
              duration={400}
              fade
              movementType="slide"
              direction="right"
              distance={1000}>
              <View style={styles.containerbl}>
                <SimpleAnimation
                  delay={500}
                  duration={800}
                  fade
                  staticType="zoom">
                  <Text style={styles.textbot}>Notes</Text>
                </SimpleAnimation>
              </View>
            </SimpleAnimation>
            <View style={styles.containerbr}></View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containertr: {
    height: Dimensions.get('screen').height * (3 / 4),
    width: Dimensions.get('screen').width / 2,
    backgroundColor: '#b92627',
  },
  containertl: {
    height: Dimensions.get('screen').height * (3 / 4),
    width: Dimensions.get('screen').width / 2,
    backgroundColor: '#e0e5ec',
    justifyContent: 'flex-end',
  },
  containerbr: {
    height: Dimensions.get('screen').height / 4,
    width: Dimensions.get('screen').width / 2,
    backgroundColor: '#e0e5ec',
  },
  containerbl: {
    height: Dimensions.get('screen').height / 4,
    width: Dimensions.get('screen').width / 2,
    backgroundColor: '#1e5276',
  },
  textbot: {
    color: 'white',
    marginLeft: 23,
    fontFamily: 'NunitoSans-ExtraBold',
    fontSize: 50,
  },
  textup: {
    color: 'black',
    marginLeft: 20,
    fontFamily: 'NunitoSans-Regular',
    fontSize: 50,
  },
});

export default Splash;
