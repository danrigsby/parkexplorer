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
  TouchableOpacity,
  View
} = React;
import Form from 'react-native-form';
import Firebase from 'firebase';
const MaterialIcon = require('react-native-vector-icons/MaterialIcons');
const FoundationIcon = require('react-native-vector-icons/Foundation');
const FontAwesomeIcon = require('react-native-vector-icons/FontAwesome');

const users = [
  'Chris', 'Dan', 'Nick', 'Shiva',
  'Ivan', 'Jami', 'Serena', 'Mona', 'Lisa',
  'Jennifer', 'Time', 'Alex', 'Susan', 'Jill', 'Jack'
];

const questions = [{
  id: "overallExperience",
  title: "How would you rate your overall experience",
  options: ['Awesome!', 'Good', 'Bad', 'Meh']
},
  {
    id: "equipmentCondition",
    title: 'How would you describe the condition of the equipment at the park?',
    options: ['Brand new and shiny!', 'Great!', 'Fine', 'Broken and terrible', 'Dangerous!']

  },
  {
    id: "crowd",
    title: "Was the park crowded during your visit?",
    options: ['Packed!', 'A little crowded', 'Desolate', 'A wasteland of despair']
  }
];

class report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {submitted: false}
  }

  submitForm = () => {
    //let formValues = Object.assign(, {parkId: this.props.park.id});
    //console.log();
    const formValues = {
      parkId: this.props.park.id,
      date: new Date().toISOString(),
      user: users[Math.floor(Math.random()*users.length)],
      ...this.refs.form.getValues()
    };
    const parkReportRef = new Firebase('https://indypark.firebaseio.com/reports');
    parkReportRef.push(formValues);
    this.setState({submitted: true});
  };

  _report = (activity) => {
    const parkReportRef = new Firebase('https://indypark.firebaseio.com/reports');
    parkReportRef.push({
      parkId: this.props.park.id,
      date: new Date().toISOString(),
      user: users[Math.floor(Math.random()*users.length)],
      text: activity
    });
  };

  renderForm() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>
          Make a report!
        </Text>
        <View style={{flex: 1, flexDirection:'row',marginLeft: -20,marginRight: -20, padding: 10, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor:'#2196F3'}}>
          <TouchableOpacity onPress={() => this._report('drug use')}>
            <View style={{alignItems: 'center'}}>
              <FoundationIcon style={{color: 'white'}} name='skull' size={32} />
              <Text style={{fontSize: 16, paddingTop: 10, color: 'white'}}>Drug Use</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._report('mud')}>
            <View style={{alignItems: 'center'}}>
              <FontAwesomeIcon style={{color: 'white'}} name='tint' size={32} />
              <Text style={{fontSize: 16, paddingTop: 10, color: 'white'}}>Muddy</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._report('broken equipment')}>
            <View style={{alignItems: 'center'}}>
              <MaterialIcon style={{color: 'white'}}  name='build' size={32} />
              <Text style={{fontSize: 16, paddingTop: 10, color: 'white'}}>Broken</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Form ref="form">
          {
            questions.map((question, key) => {
              let options = question.options.map((option, key) => (<Picker.Item key={key} label={option} value={option} />));
              return (<View key={key}><Text style={{fontSize: 16, fontWeight: 'bold'}}>{question.title}</Text><Picker type="Picker" name={question.id} selectedValue={question.options[0]}>{options}</Picker></View>)
            })
          }
        </Form>
        <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.submitForm}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }

  renderThanks() {
    return (<View style={styles.container}><Text style={styles.welcome}>
      {'Thank You!'}
    </Text></View>);
  }

  render() {
    return !this.state.submitted ? this.renderForm() : this.renderThanks();
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
    marginBottom: 200,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = report;
