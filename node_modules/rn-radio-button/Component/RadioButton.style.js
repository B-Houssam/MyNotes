import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  renderStyle: {
    flexDirection: 'column',
  },
  textDesc: {
    alignItems: 'center',
    paddingRight: 10,
    justifyContent: 'center',
  },
  outerWrapper: {flexDirection: 'row', padding: 4},
  circleWrap: {
    alignItems: 'center',
    marginRight: 5,
    justifyContent: 'center',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderWidth: 1,
    backgroundColor: 'steelblue',
    borderRadius: 5,
    borderColor: 'steelblue',
  },
  horizontalStyle: {flexWrap: 'wrap', flexDirection: 'row'},
  outerCircle: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: 'steelblue',
  },
});
