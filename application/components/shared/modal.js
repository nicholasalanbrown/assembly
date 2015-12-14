import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';

let {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Image,
  ListView,
  Animated,
  Dimensions,
  ScrollView,
} = React;

let {
  height: deviceHeight
} = Dimensions.get('window');


class Modal extends React.Component{

  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      offset: new Animated.Value(deviceHeight)
    }
  }

  componentDidMount () {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0
    }).start();
  }
  closeModal  () {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceHeight
    }).start(this.props.closeModal);
  }
  render () {
    return (
        <View style={styles.backdrop}>
          <TouchableOpacity onPress={this.closeModal} style={styles.backdropTouch}><View></View></TouchableOpacity>
          <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
          <View style={styles.nav}>
            <Text style={[styles.headingText, Globals.h4]}>{this.props.title}</Text>
          </View>
          <View style={styles.commentaryContainer}>
            <ScrollView
              style={styles.scrollView}
              automaticallyAdjustContentInsets={false}
            >
            </ScrollView>
          </View>
          </Animated.View>
        </View>
    )
  }
};

var styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  backdropTouch: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  modal: {
    opacity: 1,
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'stretch',
    position: 'absolute',
    top:0,
    right: 0,
    bottom: 0,
    left: 0
  },
  imageBackground: {
    flex: 1,
    alignItems: 'stretch',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  nav: {
    flexDirection: 'row',
    backgroundColor: Colors.brandPrimary,
    paddingTop: 26,
    height: 60,
    justifyContent: 'center'
  },
  heading: {
    justifyContent: 'center'
  },
  headingText: {
    color: '#ffffff',
    fontSize: 18
  },
  icon: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  commentaryContainer: {
    backgroundColor: '#ffffff',
  },
  scrollView: {
    height: (deviceHeight*0.6)-65
  },
  commentaryText: {
    color: Colors.bodyText,
    fontFamily: 'Georgia',
    fontWeight: '400',
    lineHeight: 22,
    padding: 25
  }
});

module.exports = Modal;
