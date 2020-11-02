import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Boxes from '../components/boxes';
import NoteBox from '../components/noteBox';
import Database from '../db/db';
import Snackbar from 'react-native-snackbar';

const db = new Database();
const url = 'https://github.com/B-Houssam';

class Home extends Component {
  state = {
    cat: 'All',
    num: 0,
    isLoading: true,
    notes: [],
    notFound: 'Try adding Notes first !',
    nShown: {},
    index: 0,
    isFetching: true,
    loa: true,
  };

  constructor(props) {
    super(props);

    /*
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getProducts();
    });
    this._unsubscribe.removeEventListener;
    */
  }

  componentDidMount() {
    this.getProducts();
  }

  renderItem = ({item}) => (
    <TouchableWithoutFeedback onPress={() => this.drag(item.title)}>
      <View>
        <NoteBox
          title={item.title}
          date={item.cat}
          desc={item.body}
          location={item.location}
          image={item.image}
          cat={item.date}></NoteBox>
      </View>
    </TouchableWithoutFeedback>
  );
  getProducts = () => {
    let notes = [];
    this.setState({isFetching: true});
    db.listNote()
      .then((data) => {
        notes = data;
        this.setState({
          notes: notes,
          isLoading: false,
          isFetching: false,
          num: notes.length,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          isFetching: false,
        });
      });
  };
  getNote = (title) => {
    let note = {};
    db.NotesByTitle(title).then((data) => {
      note = data;
      this.setState({
        nShown: note,
        loa: false,
      });
    });
  };

  delNote = (title) => {
    let note = {};
    db.deleteNote(title).then((data) => {
      this.setState({
        nShown: {},
      });
      this._panel.hide();
      this.getProducts();
    });
    Snackbar.show({
      text: 'Note deleted... poof !',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'NunitoSans-Regular',
      backgroundColor: '#1e5276',
    });
  };

  drag = (title) => {
    this.setState({
      loa: true,
    });
    this.getNote(title);
    this._panel.show();
  };

  render() {
    const onPress = () => {
      console.log('add pressed');
      this.props.navigation.dispatch(StackActions.push('add'));
    };

    const changCat = (cat) => {
      console.log('catChanged');
      this.setState({cat: cat});
      if (cat === 'All') {
        this.getProducts();
      } else {
        let notes = [];
        this.setState({isFetching: true});
        db.listCat(cat)
          .then((data) => {
            notes = data;
            this.setState({
              notes: notes,
              isLoading: false,
              isFetching: false,
              num: notes.length,
            });
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              isLoading: false,
              isFetching: false,
            });
          });
      }
    };

    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#1e5276" />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.back}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20,

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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginLeft: 20,
            alignItems: 'center',
          }}>
          <ScrollView horizontal={true}>
            <TouchableOpacity onPress={() => changCat('All')}>
              <View style={{padding: 10}}>
                <Boxes text="All"></Boxes>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changCat('Personal')}>
              <View style={{padding: 10}}>
                <Boxes text="Personal"></Boxes>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changCat('Work')}>
              <View style={{padding: 10}}>
                <Boxes text="Work"></Boxes>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changCat('Home')}>
              <View style={{padding: 10}}>
                <Boxes text="Home"></Boxes>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changCat('Ideas')}>
              <View style={{padding: 10}}>
                <Boxes text="Ideas"></Boxes>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: 35,
            marginRight: 35,
            marginTop: 10,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'NunitoSans-ExtraBold',
              color: '#1e5276',
            }}>
            {this.state.cat}
          </Text>
          <View
            style={{
              width: 35,
              height: 35,
              borderRadius: 20,
              backgroundColor: '#b92627',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'NunitoSans-ExtraBold',
                color: '#F2C8C8',
              }}>
              {this.state.num}
            </Text>
          </View>
        </View>
        {this.state.notes.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}>
            <Text style={styles.message}>{this.state.notFound}</Text>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              keyExtractor={(item) => item.title}
              data={this.state.notes}
              renderItem={this.renderItem}
              refreshing={this.state.isFetching}
              onRefresh={this.getProducts}
            />
          </View>
        )}

        <SlidingUpPanel
          allowDragging={true}
          ref={(c) => (this._panel = c)}
          friction={0.1}
          containerStyle={{
            backgroundColor: '#e0e5ec',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 20,
          }}
          draggableRange={{
            top: Dimensions.get('screen').height * 0.6,
            bottom: 0,
          }}>
          {this.state.loa === true ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: Dimensions.get('screen').height * 0.55,
              }}>
              <ActivityIndicator size="large" color="#1e5276" />
            </View>
          ) : (
            <View style={{height: Dimensions.get('screen').height * 0.55}}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}>
                <Text style={styles.date}>{this.state.nShown.cat}</Text>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.delNote(this.state.nShown.title)}>
                    <Text style={styles.inst}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.inst}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this._panel.hide();
                    }}>
                    <Icon name="window-close" size={30} color="#1e5276" />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView>
                <View style={{marginBottom: 10}}>
                  <Text style={styles.title}>{this.state.nShown.title}</Text>
                </View>
                {this.state.nShown.body === '' ? (
                  <></>
                ) : (
                  <View>
                    <Text style={styles.body}>{this.state.nShown.body}</Text>
                  </View>
                )}
                {this.state.nShown.location === '' ? (
                  <></>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Icon name="map-marker" size={20} color="#1e5276" />
                    <Text style={styles.location}>
                      {this.state.nShown.location}
                    </Text>
                  </View>
                )}
                {this.state.nShown.image === '' ? (
                  <></>
                ) : (
                  <View
                    style={{
                      height: 250,
                      width: '100%',
                      marginTop: 15,
                    }}>
                    <Image
                      style={styles.image}
                      source={{uri: this.state.nShown.image}}
                    />
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </SlidingUpPanel>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: '#e0e5ec',
    flexDirection: 'column',
    paddingBottom: 10,
    flex: 1,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e5ec',
  },
  message: {
    fontFamily: 'NunitoSans-ExtraBold',
    fontSize: 15,
    color: 'grey',
  },
  txt1: {
    color: '#b92627',
    fontFamily: 'NunitoSans-ExtraBold',
    fontSize: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    marginBottom: 10,
  },
  txt2: {
    color: '#1e5276',
    fontFamily: 'NunitoSans-ExtraBold',
    fontSize: 40,
  },
  date: {
    fontSize: 15,
    fontFamily: 'NunitoSans-ExtraBold',
    color: '#b92627',
  },
  title: {
    fontSize: 23,
    fontFamily: 'NunitoSans-ExtraBold',
    color: '#1e5276',
  },
  inst: {
    marginRight: 40,
    fontSize: 17,
    fontFamily: 'NunitoSans-ExtraBold',
    color: '#1e5276',
  },
  body: {
    fontSize: 15,
    fontFamily: 'NunitoSans-Regular',
    color: '#1e5276',
  },
  location: {
    fontSize: 17,
    fontFamily: 'NunitoSans-SemiBold',
    color: '#1e5276',
    marginLeft: 10,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});

export default Home;
