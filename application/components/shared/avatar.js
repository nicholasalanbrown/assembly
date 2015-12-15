import React from 'react-native';

let {
  Image,
  StyleSheet
} = React;


class Avatar extends React.Component{
  render () {
    return (
      <Image 
        style={this.props.size === "large" ? styles.pictureLarge : styles.pictureSmall}
        source={{uri: this.props.source}}
      />
    )
  }
};

var styles = StyleSheet.create({
  pictureLarge: {
    height: 90,
    width: 90,
    borderRadius: 45
  },
  pictureSmall: {
    height: 40,
    width: 40,
    borderRadius: 20
  }
});

module.exports = Avatar;
