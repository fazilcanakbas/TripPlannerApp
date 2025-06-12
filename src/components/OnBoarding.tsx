import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useRef,useState,useEffect } from 'react';
import { Button, Dimensions, FlatList, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Font from 'expo-font';






const { width } = Dimensions.get('window');


const Slides = [
    {
    Component : WelcomeDesign,
    },
    {
    Component : ExploreDesign,
    },
    {
    Component : GetStartedDesign,
    },
]

export default function OnBoardingScreen() {
    const flatListRef = useRef(null);
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [loaded, setLoaded] = useState(false);


    
    useEffect(() => {
        Font.loadAsync({
          'SFUIDisplay-Bold': require('../../assets/fonts/SFUIDisplay-Bold.ttf'),
            'SFUI': require('../../assets/fonts/SFUIDisplay-Black.otf'),
        }).then(() => setLoaded(true));
      }, []);
    
 

    const handleNext = () => {
        if (flatListRef.current && currentIndex < Slides.length - 1) {
          flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
      };

      const handleBack = () => {
        if (flatListRef.current && currentIndex > 0) {
            flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
        }
      };

      

    const handleSkip = () => {
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index: Slides.length - 1 });
        }
      };

      const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
          setCurrentIndex(viewableItems[0].index);
        }
      }).current;

    return (
      
        <FlatList
            data={Slides}
            ref={flatListRef}   
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            scrollEnabled={false} 
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',width:width ,backgroundColor: '#EAEDF4' }}>
                        <item.Component />
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>

                            
                            {Slides.map((_, dotIndex) => (
                                <View
                                key={dotIndex}
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginHorizontal: 5,
                                    backgroundColor: dotIndex === currentIndex ? '#407BFF' : '#ccc',
                                }}
                                />
                            ))}
                            </View>

                      
                    
                        {index < Slides.length - 1 ? (

                          
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, marginTop: 20,marginBottom:20 }}>
                                  {currentIndex === 0 && (
                            <TouchableOpacity style={{flexDirection:'row'}} onPress={handleSkip}><Text style={{fontFamily:'SFUIDisplay-Bold',color:'#407BFF',fontWeight:600,fontSize:18}}>Skip Tour</Text>
                            
                            </TouchableOpacity>
                            )}
                            

                            {currentIndex > 0 && (
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleBack}>
                                <MaterialIcons name="navigate-before" size={26} color="#407BFF" />
                                <Text style={{ fontFamily:'SFUIDisplay-Bold',color: '#407BFF', fontWeight: '600', fontSize: 18 }}>Back</Text>
                            </TouchableOpacity>
                            )}

                            <TouchableOpacity style={{flexDirection:'row'}} onPress={handleNext}>
                                <Text style={{fontFamily:'SFUIDisplay-Bold',color:'#407BFF',fontWeight:600,fontSize:18}}>Next</Text>
                                <MaterialIcons name="navigate-next" size={26} color="#407BFF" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, marginTop: 20,marginBottom:20 }}>
                            <TouchableOpacity style={{flexDirection:'row'}} onPress={handleBack}>
                                <MaterialIcons name="navigate-before" size={26} color="#407BFF" />
                                <Text style={{fontFamily:'SFUIDisplay-Bold',color:'#407BFF',fontWeight:600,fontSize:18}}>Back</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                            style={{flexDirection:'row'}} 
                            onPress={async () => { 
                                await AsyncStorage.setItem('hasSeenOnboarding', 'true');
                                navigation.replace('Login');

                            
                        }}
                        >
                            <Text style={{fontFamily:'SFUIDisplay-Bold',color:'#407BFF',fontWeight:600,fontSize:18}}>Get Started</Text>
                            <MaterialIcons name="navigate-next" size={26} color="#407BFF" />
                            </TouchableOpacity>
                            </View>
                          
                        )}

                    </View>
                    
                );

            }}
        />
    );
}



function WelcomeDesign() {
  return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#EAEDF4' }}>
        
        <StatusBar barStyle="dark-content" backgroundColor="#EAEDF4" />

         <Image source={require('../../assets/onboarding1.png')} style={{  }} />
        
         <Text style={{ fontFamily: 'SFUIDisplay-Bold', fontSize: 20,marginTop:40 }}>Welcome to the App</Text>


        <Text style={{fontFamily:'SFUIDisplay-Bold',textAlign:'center',fontWeight:500,marginTop:20,marginRight:20,marginLeft:20}}>

      Embark on your next adventure with our travel app! Discover new destinations, plan seamless journeys, and create unforgettable memories. Welcome to a world of endless exploration!</Text>
       
    </View>
  )
}

function ExploreDesign() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#EAEDF4' }}>
         <StatusBar barStyle="dark-content" backgroundColor="#EAEDF4" />

         <Image source={require('../../assets/onboarding2.png')} style={{  }} />
         <Text style={{ fontFamily: 'SFUIDisplay-Bold', fontSize: 20,marginTop:40 }}>
            Explore the Features</Text>
            <Text style={{fontFamily:'SFUIDisplay-Bold',textAlign:'center',fontWeight:500,marginTop:20,marginRight:20,marginLeft:20}}>
            Indulge in tranquility and comfort. Choose your perfect resting place with us, where serenity meets luxury. Select a haven that resonates with your soul. Your ultimate relaxation awaits.</Text> 
       
    </View>
  )
}

function GetStartedDesign() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#EAEDF4' }}>
         <StatusBar barStyle="dark-content" backgroundColor="#EAEDF4" />
    <Image source={require('../../assets/onboarding3.png')} style={{  }} />
    <Text style={{ fontFamily: 'SFUIDisplay-Bold', fontSize: 20,marginTop:40 }}>
        Get Started</Text>
        <Text style={{fontFamily:'SFUIDisplay-Bold',textAlign:'center',fontWeight:500,marginTop:20,marginRight:20,marginLeft:20}}>
        Embrace the joy of travel! Explore new horizons, savor every moment, and create lasting memories. Your journey begins here. Enjoy the trip!</Text>
    </View>
  )
}


