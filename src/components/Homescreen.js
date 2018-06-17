import React, { Component } from 'react';
import { 
    FlatList, 
    ActivityIndicator, 
    Image,
    Linking,
    Card,
    StyleSheet,
    Text, 
    View ,
    YellowBox} from 'react-native';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        // remove 'isMounted' warning on screen
        YellowBox.ignoreWarnings(
 
            ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
            
          ]);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount(){
        return fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=API_KEY')
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            isLoading: false,
                            dataSource: responseJson.articles,
                        }, function(){
                        });
                    })
                    .catch((error) =>{
                        console.error(error);
                    });
    } //end of mount
    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return(

             <View style={styles.container}>
                <Text style={styles.h2Text}>Top Tech Headlines</Text>
                <FlatList
                   data={this.state.dataSource}
                   renderItem={({item})=> 
                   <View style={styles.flatview}>
                   <Image source={{uri: item.urlToImage}}
                        style={styles.img}/>
                   <Text style={styles.title}>{item.title}</Text>
                   <Text style={styles.author}>by {item.author}</Text>
                   <Text style={styles.link}>Go to {item.url}</Text>
                   </View>

                }
                
                keyExtractor={(item, index) => index.toString()}
                />
             </View> 

        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EED5B7',
    },
    h2Text: {
        padding: 14,
        backgroundColor: '#deb887',
        fontFamily: 'Helvetica',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffdf55',
        textAlign: 'center'
    },
    flatview: {
        justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
    },
    img: {
        width: 100, 
        height: 100,
        borderColor: '#ff0',
        borderRadius: 50
    },
    title: {
        alignSelf: 'flex-end'
    },
    link: {
        textAlign: 'right',
        color: '#00f'
    },
    author: {
        textAlign: 'right',
        fontStyle: 'italic',
        color: '#f00'
    }
    
  });