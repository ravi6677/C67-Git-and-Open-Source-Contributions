import * as React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Image} from 'react-native';
import AppHeader from "./components/AppHeader";
import db from "./localdb";
import PhonicSoundButton from "./components/PhonicSoundButton";

export default class App extends React.Component{
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }

  render(){
    return (
      <View style = {styles.container}>
          <AppHeader/>

          <Image style = {styles.imageIcon}
          source = {{
            uri: 'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',
          }}
        />

        <TextInput style = {styles.inputBox}
        onChangeText = {text =>{
          this.setState({text: text});
        }}
        value = {this.state.text}
        />

        <TouchableOpacity style = {styles.goButton}
        onPress = {() =>{
          var word = this.state.text.toLowerCase().trim();
            db[word]?(
              this.setState ({chunks: db[word].chunks}),
              this.setState ({phonicSounds: db[word].phones})
            ):
            alert("This word does not exist in our database.");
        }}>
          <Text style = {styles.buttonText}>ENTER</Text>
          </TouchableOpacity>

          <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PhonicSoundButton 
              wordChunk = {this.state.chunks[index]}
              soundChunk = {this.state.phonicSounds[index]}
              buttonIndex={index}
              />
            );
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderRadius: 15,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 95,
  }
});
