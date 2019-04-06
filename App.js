import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';

export default class App extends Component {
  state = {
    notes: new Array(10).fill(0).map((a, i) => i).map(i => ({
      title: `Title ${i}`,
      content: `Content ${i} is cool Content ${i} is cool Content ${i} is cool`
    })),
    toDoList: [
      { id: 1, type: 'Task', content: 'content' },
      { id: 2, type: 'Task', content: 'content' },
      { id: 3, type: 'Task', content: 'content' },
      { id: 4, type: 'Task', content: 'content' },
      { id: 5, type: 'Task', content: 'content' }
    ],
    doneList: [],
    inputValue: ''
  };

  submit = () => {
    let lastId = -1;
    if (this.state.toDoList.length !== 0) {
      lastId = this.state.toDoList[this.state.toDoList.length - 1].id;
    }

    this.setState(state => ({
      toDoList: state.toDoList.concat({
        id: lastId + 1,
        type: 'Task',
        content: this.state.inputValue
      })
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.header, styles.title]}>My tasks today</Text>
        <View style={styles.newTask}>
          <Text style={styles.header}>Add new task</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter text'
            returnKeyType='done'
            onSubmitEditing={this.submit}
            onChangeText={(inputValue) => this.setState({ inputValue })}
            value={this.state.inputValue}
            autoFocus={true}
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
          {/* <Text style={styles.header}>Completed</Text>
          {this.state.notes.map(({ title, content }) => (
            <View key={title} style={styles.item}>
              <Text>{title}</Text>
              <Text>{content}</Text>
            </View>
          ))} */}
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
