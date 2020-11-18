import * as React from 'react';
import{ View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppHeader from '../components/AppHeader';
import db from "../config";

export default class HomeScreen extends React.Component {

constructor(){
  super();
  this.state = {
    redStatus : true,
    greenStatus: true,
    blueStatus: true,
    yellowStatus: true
  }
}

  goToBuzzerScreen = (buzzercolor) => {
    var teamRef = db.ref('teams/'+ buzzercolor);
    teamRef.update({
      enabled: false
    });
    this.props.navigation.navigate('BuzzerScreen', { color: buzzercolor });
  };

  componentDidMount(){
    var teamsref  = db.ref("teams");
    teamsref.on("value", data => {
      var teamDetails = data.val();
      this.setState({
        redStatus: teamDetails.red.enabled,
        blueStatus: teamDetails.blue.enabled,
        yellowStatus: teamDetails.yellow.enabled,
        greenStatus: teamDetails.green.enabled
      });
    });
  }

  render() {
    return (
      <View>
        <View style = {styles.buttonsContainer}>
        <TouchableOpacity
        stye = {styles.buttons}
        onPress ={() => this.props.navigation.navigate('JokeScreen') }>
        <Text>Read A Joke</Text>
        </TouchableOpacity>

        <View style = {styles.buttonsContainer}>
        <TouchableOpacity
        stye = {styles.buttons}
        onPress ={() => this.props.navigation.navigate('HoroScopeScreen') }>
        <Text>HoroScope</Text>
        </TouchableOpacity>
        
        <View style = {styles.buttonsContainer}>
        <TouchableOpacity
        stye = {styles.buttons}
        onPress ={() => this.props.navigation.navigate('WeatherScreen') }>
        <Text>Weather</Text>
        </TouchableOpacity>

        <View style = {styles.buttonsContainer}>
        <TouchableOpacity
        stye = {styles.buttons}
        onPress ={() => this.props.navigation.navigate('TopNewsScreen') }>
        <Text>Top News</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 50,
    width: 200,
    height: 50,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});
