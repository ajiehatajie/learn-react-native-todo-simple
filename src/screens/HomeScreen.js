import React, { Component } from 'react'
import { Container, Header, Title, Left, Icon, Right,
    Button, Body, Content,Text, Card, CardItem,List,ListItem,Item,Input,Fab,View,
    SwipeRow
 } from "native-base";
 import { TouchableHighlight } from 'react-native'
import Toast from 'react-native-simple-toast'
import axios from 'axios'
import moment from 'moment'
    
export class HomeScreen extends Component {

    static navigationOptions = {
        title: 'List',
          headerStyle: {
          backgroundColor: '#694fad'
          
        },
        headerTintColor: '#fff',
      }
    
    
    constructor(props){
        super(props)

        this.state = {
          isLoading: true,
          text: '',
          filter:false,
          list:[]
        }

        console.log('const')
      }

add() {
    this.props.navigation.navigate('Add',{
      refresh:this._getData.bind(this)
    })
}

async detail(id) {
  try {
    let res = await axios.get('http://rajakonten.com:8083/api/task/'+id)
    console.log(res.data)
    this.props.navigation.navigate('Detail',{
      data:res.data,
      refresh:this._getData.bind(this)
    })
  } catch (error) {
    console.log(JSON.stringify(error))
  }
}
componentDidMount(){
  this._getData()
  
}

kembali(){
  alert('okee')
}
async _getData() {
  console.log('get data ')
 try {
    this.setState({isLoading:true})
    let res = await axios.get('http://rajakonten.com:8083/api/task')
    this.setState({
        list:res.data,
        isLoading:false,
        view:true
    })
  } catch (error) {
    this.setState({isLoading:false})

    console.log(JSON.stringify(error))
  }
}

async _deletData(id){
  try {
    let res = await axios.delete(`http://rajakonten.com:8083/api/task/${id}`)
    this._getData()
    Toast.show('succes delete data',Toast.LONG)
     
  } catch (error) {
    console.log(JSON.stringify(error)) 
  }
}

  render() {
    console.log(this.state);
    return (
        <Container>
       <Content>
         { this.state.view ?   
           <List  style={{backgroundColor:'#ffffff',flex:1}}>
           {
               this.state.list.data.map((x, y) => (
                <SwipeRow key={y} 
                rightOpenValue={-75}
                leftOpenValue={75}
                left={
                  <Button success onPress={() => this.detail(x.id)}>
                    <Icon active name="open" />
  
                  </Button>
                }
                body={
                  <View>
                    <TouchableHighlight onPress={() => this.detail(x.id)} >
                    <Text>{x.task}</Text>
                    </TouchableHighlight>
                  </View>
                }
                right={
                  <Button danger onPress={() => this._deletData(x.id)}>
                    <Icon active name="trash" />
                  </Button>
                }
              
              />
                

               ))
           }
           
   
       </List>

          : <Text>loading</Text>
          
        }
       </Content>
            <View style={{ flex: 1 }}>
                <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#694fad' }}
                position="bottomRight"
                onPress={() => this.add()}>
                <Icon name="add" />
                
                </Fab>
            </View>

     </Container>


    )
  }
}

export default HomeScreen