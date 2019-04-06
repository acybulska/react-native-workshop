import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, AsyncStorage } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import console from 'console';

const toDoListKey = 'myToDoList'

class Home extends Component {
  state = {
    toDoList: [
      { id: 1, type: 'Task', content: 'content' },
      { id: 2, type: 'Task', content: 'content' },
      { id: 3, type: 'Task', content: 'content' },
      { id: 4, type: 'Task', content: 'content' },
      { id: 5, type: 'Task', content: 'content' }
    ],
    doneList: [],
    inputValue: '',
    testValue: ''
  };

  componentWillUpdate() {
    AsyncStorage.getItem(toDoListKey).then(testValue => this.setState({ testValue }));
  }

  submit = () => {
    let lastId = -1;
    if (this.state.toDoList.length !== 0) {
      lastId = this.state.toDoList[this.state.toDoList.length - 1].id;
    }

    this.setState(state => ({
      toDoList: state.toDoList.concat({
        id: lastId + 1,
        type: 'Task',
        content: state.inputValue
      }),
      inputValue: ''
    }), () => {
      AsyncStorage.setItem(toDoListKey, JSON.stringify(this.state.toDoList))
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.header, styles.title]} onPress={() => {this.props.navigation.navigate('Details', Details)}}>My tasks today</Text>
        <Text>{this.state.testValue}</Text>
        <View style={styles.newTask}>
          <Text style={styles.header}>Add new task</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter text'
            returnKeyType='done'
            onSubmitEditing={this.submit}
            onChangeText={(inputValue) => this.setState({ inputValue })}
            value={this.state.inputValue}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.header}>To do</Text>
          {this.state.toDoList.map(({ id, type, content }) => (
            <View key={id} style={styles.item}>
              <Text>{type + " " + id}</Text>
              <Text>{content}</Text>
            </View>
          ))}
          <Text style={styles.header}>Completed</Text>
          {
            this.state.doneList.map(({ id, type, content }) => (
              <View key={id} style={styles.item}>
                <Text>{type}</Text>
                <Text>{content}</Text>
              </View>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0
  },
  title: {
    paddingTop: 30
  },
  header: {
    fontWeight: '900',
    fontSize: 18,
    padding: 10
  },
  newTask: {
    borderColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    margin: 5,
    alignSelf: 'stretch'
  },
  textInput: {

  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch'
  },
  item: {
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    margin: 5

  }
});

class Details extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }  
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Details: {
    screen: Details
  },
}, 
{
  initialRouteName: 'Home'
});

const AppContainer = createAppContainer(AppNavigator); 

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}