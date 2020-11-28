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
  Animated,
  Image,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Boxes from '../components/boxes';
import Edit from '../components/edit';
import Database from '../db/db';
import Snackbar from 'react-native-snackbar';
import RBSheet from 'react-native-raw-bottom-sheet';
import Lightbox from 'react-native-lightbox-v2';
import AwesomeAlert from 'react-native-awesome-alerts';

const db = new Database();
//const url = 'https://github.com/B-Houssam';

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
    showAlert: false,
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
    <View>
      <View style={styles.out2}>
        <View style={styles.box2}>
          <Text style={styles.date2}>{item.cat}</Text>
          <Text style={styles.cat2}>{item.title}</Text>
          {item.body === '' ? (
            <></>
          ) : (
            <Text numberOfLines={3} style={styles.desc2}>
              {item.body}
            </Text>
          )}
          {item.image === '' ? (
            <></>
          ) : (
            <View
              style={{
                height: 150,
                width: '100%',
                marginTop: 15,
              }}>
              <Image style={styles.image2} source={{uri: item.image}} />
            </View>
          )}
          {item.location === '' ? <></> : this.loc}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.cat2}>{item.date}</Text>
              <TouchableOpacity onPress={() => this.drag(item.title)}>
                <Text style={styles.red2}>View this note</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
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

  editNote = (title, body, cat, image) => {
    this.RBSheet.close();
    console.log('Edit in home pressed');
    this.props.navigation.dispatch(
      StackActions.push('edit', {
        title: title,
        body: body,
        cat: cat,
        image: image,
      }),
    );
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  /*
  showSnack = () => {
    Snackbar.show({
      text: 'Poof ... Note deleted !',
      duration: Snackbar.LENGTH_LONG,
      fontFamily: 'NunitoSans-Regular',
      backgroundColor: '#1e5276',
    });
  };
  */

  delNote = (title) => {
    db.deleteNote(title).then(() => {
      this.setState({
        nShown: {},
      });
      this.RBSheet.close();
      this.getProducts();
    });
    this.hideAlert();
    //this.showSnack();
  };

  drag = (title) => {
    this.setState({
      loa: true,
    });
    this.getNote(title);
    this.RBSheet.open();
  };

  render() {
    const {showAlert} = this.state;

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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={500}
          openDuration={50}
          closeDuration={200}
          animationType="fade"
          customStyles={{
            container: {
              backgroundColor: '#e0e5ec',
            },
          }}>
          {this.state.loa === true ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 450,
              }}>
              <ActivityIndicator size="large" color="#1e5276" />
            </View>
          ) : (
            <View
              style={{
                height: 450,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <Text style={styles.date}>{this.state.nShown.cat}</Text>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity onPress={() => this.showAlert()}>
                    <Text style={styles.inst}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.editNote(
                        this.state.nShown.title,
                        this.state.nShown.body,
                        this.state.nShown.date,
                        this.state.nShown.image,
                      )
                    }>
                    <Text style={styles.inst}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.RBSheet.close();
                    }}>
                    <Icon name="window-close" size={30} color="#1e5276" />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <ScrollView showsVerticalScrollIndicator={true}>
                  <View style={{paddingHorizontal: 15}}>
                    <Text style={styles.title}>{this.state.nShown.title}</Text>
                  </View>
                  {this.state.nShown.body === '' ? (
                    <></>
                  ) : (
                    <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
                      <Text style={styles.body}>{this.state.nShown.body}</Text>
                    </View>
                  )}
                  {/*this.state.nShown.location === '' ? (
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
                  )*/}
                  {this.state.nShown.image === '' ? (
                    <></>
                  ) : (
                    <View
                      style={{
                        height: 250,
                        width: '100%',
                        padding: 15,
                      }}>
                      <Lightbox underlayColor="white" swipeToDismiss={true}>
                        <Image
                          style={styles.image}
                          source={{uri: this.state.nShown.image}}
                        />
                      </Lightbox>
                    </View>
                  )}
                </ScrollView>
              </View>
            </View>
          )}
        </RBSheet>
        <AwesomeAlert
          show={showAlert}
          title="Are you sure ?"
          message="You could lost your note FOREVER !"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          titleStyle={{fontFamily: 'NunitoSans-ExtraBold', color: '#1e5276'}}
          messageStyle={{fontFamily: 'NunitoSans-Regular', color: '#1e5276'}}
          cancelButtonTextStyle={{
            fontFamily: 'NunitoSans-ExtraBold',
          }}
          confirmButtonTextStyle={{
            fontFamily: 'NunitoSans-ExtraBold',
          }}
          contentContainerStyle={{backgroundColor: '#e0e5ec'}}
          showConfirmButton={true}
          useNativeDriver={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#b92627"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.delNote(this.state.nShown.title);
            this.RBSheet.close();
          }}
        />
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

  box2: {
    backgroundColor: '#e0e5ec',
    width: Dimensions.get('screen').width * 0.905,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    padding: 20,
    elevation: 4,
  },
  out2: {
    flexDirection: 'column',
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 20,
  },
  date2: {
    fontSize: 13,
    fontFamily: 'NunitoSans-SemiBold',
    color: '#b92627',
    marginBottom: 10,
  },
  location2: {
    fontSize: 15,
    fontFamily: 'NunitoSans-ExtraBold',
    color: '#1e5276',
    marginLeft: 10,
  },
  red2: {
    fontSize: 13,
    fontFamily: 'NunitoSans-ExtraBold',
    color: '#b92627',
  },
  loc2: {
    marginTop: 20,
  },
  desc2: {
    fontSize: 15,
    fontFamily: 'NunitoSans-SemiBold',
    color: '#1e5276',
    marginTop: 10,
  },
  edit2: {
    fontSize: 15,
    fontFamily: 'NunitoSans-SemiBold',
    color: '#b92627',
  },
  cat2: {
    fontSize: 17,
    fontFamily: 'NunitoSans-ExtraBold',
    color: '#1e5276',
  },
  image2: {
    width: '100%',
    height: '100%',
    //resizeMode: 'contain',
    borderRadius: 5,
  },
});

export default Home;
