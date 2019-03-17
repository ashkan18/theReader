import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

interface Props {
  title: string
  user?: User
}

class Header extends React.Component<Props> {

  render() {
    const profileImage =this.props.user && this.props.user.photos ? this.props.user.photos[0].thumb
      : "https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
    return (
      <View style={styles.container}>
        <Text>{this.props.title}</Text>
        <TouchableOpacity>
          <Image source={{ uri: profileImage}} style={styles.stretch} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 10,
    flexDirection: "row"
  },
  text: {
    textAlign: "right",
    height: 20
  },
  stretch: {
    width: 45,
    height: 45
  }
});

export default Header