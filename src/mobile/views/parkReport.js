import React from 'react-native';
const {
  Component,
  DatePickerIOS,
  Picker,
  PickerIOS,
  ScrollView,
  SliderIOS,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;
import Form from 'react-native-form';

const questions = [{
  id: "overallExperience",
  title: "How would you rate your overall experience",
  options: ['Bad', 'Meh', 'Good']
},
  {
    id: "equipmentCondition",
    title: 'How would you describe the condition of the equipment at the park?',
    options: ['Broken and terrible', 'Fine', 'Great!']

  },
  {
    id: "crowd",
    title: "Was the park crowded during your visit?",
    options: ['Packed!', 'A few people', 'I was alone']
  }

];

class report extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>
          Make a report!
        </Text>
        <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        <Form ref="form">
          {
            questions.map((question, key) => {
              let options = question.options.map((option, key) => (<Picker.Item key={key} label={option} value={option} />));
              return (<View key={key}><Text>{question.title}</Text><Picker type="Picker" name={question.id} >{options}</Picker></View>)
            })
          }
        </Form>
      </ScrollView>
    );
  }
}

const styles = React.StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  pickerStyle: {
    margin: 5
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = report;
