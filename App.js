import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

export default class App extends Component {
  state = {
    notes: new Array(10).fill(0).map((a, i) => i).map(i => ({
      title: `Title ${i}`,
      content: `Content ${i} is cool Content ${i} is cool Content ${i} is cool`
    }))
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.header, styles.title]}>My tasks today</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.header}>To do</Text>
          {this.state.notes.map(({ title, content }) => (
            <View key={title} style={styles.item}>
              <Text>{title}</Text>
              <Text>{content}</Text>
            </View>
          ))}
          <Text style={styles.header}>Completed</Text>
          {this.state.notes.map(({ title, content }) => (
            <View key={title} style={styles.item}>
              <Text>{title}</Text>
              <Text>{content}</Text>
            </View>
          ))}
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
