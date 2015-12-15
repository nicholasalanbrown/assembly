import React from 'react-native';

let {
  Image,
  StyleSheet
} = React;


class Avatar extends React.Component{
  render () {
    return (
      <Image 
        style={styles.picture}
        source={{uri: this.props.source}}
      />
    )
  }
};

var styles = StyleSheet.create({
  picture: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
});

module.exports = Avatar;
