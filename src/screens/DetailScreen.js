import React, { Component } from 'react'
import { View, Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';
import axios from 'axios'
import Toast from 'react-native-simple-toast'


const styles = {
  wrapper: {
    flex: 1,
    marginTop: 50,
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
};
// These Fields will create a login form with three fields

const fields = [
  {
    type: 'text',
    name: 'task',
    required: true,
    icon: 'ios-person',
    label: 'Task',
  },
  {
    type: 'text',
    name: 'desc',
    icon: 'ios-lock',
    required: true,
    label: 'Desc',
  },
  
];

export default class DetailScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      task:'task value'
    }
    
  }
  async update() {
    const formValues = this.formGenerator.getValues();
    console.log('FORM VALUES', formValues);
    const { navigation } = this.props;
    const val = navigation.getParam('data');
    const id = val.data.id
    console.log('id props',id)
    try {
      let data = await axios.post(`http://rajakonten.com:8083/api/task/${id}/update`,{
        name:formValues.task,
        desc:formValues.desc
      })
      Toast.show('succes update data',Toast.LONG)
      
      this.props.navigation.goBack()

      console.log(data.data)

    } catch (error) {
       console.log(JSON.stringify(error))
    }
  }

  componentWillUnmount(){
    this.props.navigation.state.params.refresh()
  }
  render() {
    const { navigation } = this.props;
    const val = navigation.getParam('data');
    const task = val.data.task
    const task_description = val.data.task_description
    let formData = {
      task,
      desc: task_description
      
    }
    return (
      <View style={styles.wrapper}>
      <View>
        <GenerateForm
          ref={(c) => {
            this.formGenerator = c;
          }}
          fields={fields}
          formData={formData}
        />
      </View>
      <View style={styles.submitButton}>
        <Button block onPress={() => this.update()}>
          <Text>Update</Text>
        </Button>
       
      </View>
    </View>
    )
  }
}