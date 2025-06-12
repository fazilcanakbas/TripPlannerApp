import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Dimensions, FlatList, Image, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const {width,height} = Dimensions.get('screen');

const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+90", country: "TR", flag: "🇹🇷" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
];

function RegisterScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
    const [countryCodeModalVisible, setCountryCodeModalVisible] = useState(false);
    

    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPhone, setIsFocusedPhone] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
  
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
    const handleRegister = async () => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(email)) {
        <Modal>
          <View>
            <Text>
              Hata
            </Text>
          </View>
        </Modal>
        Alert.alert('Hata', 'Lütfen geçerli bir e-posta adresi girin.');
        
        return;
      }
    
      if (password.length < 6) {
        Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır');
        return;
      }

      try {
        const response = await fetch("http://192.168.140.88:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            email, 
            password,
            name,
            lastname,
            phonenumber: selectedCountryCode.code + phonenumber,
            birthofdate: date.toISOString(),
          }),
        });

        const data = await response.json();
        
        if (response.ok) {
          Alert.alert("Success", "You have successfully registered.");
          navigation.navigate("Login");
        } else {
          Alert.alert("Error", data.message || "Registration failed");
        }
      } catch (err) {
        Alert.alert("Bağlantı Hatası", "Sunucuya bağlanırken bir hata oluştu.");
      }
    };

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (selectedDate) => {
      setDate(selectedDate);
      hideDatePicker();
    };
    
    const renderCountryCodeItem = ({ item }) => (
      <TouchableOpacity
        style={styles.countryCodeItem}
        onPress={() => {
          setSelectedCountryCode(item);
          setCountryCodeModalVisible(false);
        }}
      >
        <Text style={styles.countryFlag}>{item.flag}</Text>
        <Text style={styles.countryCodeText}>{item.code} ({item.country})</Text>
      </TouchableOpacity>
    );

  return (
    <>
    <StatusBar backgroundColor="#8ec5fc" barStyle="dark-content" />
    <ScrollView contentContainerStyle={styles.scroll}>
      <StatusBar backgroundColor="#EAEDF4" barStyle="dark-content" />
      
      {/* Main container */}
      <View
        style={{
          width: "100%",
          backgroundColor: "#EAEDF4",
          padding: 20,
          height: height,
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
          <Image
            source={require("../../../assets/register.png")}
            style={{ width: 400, height: 275, marginTop: 0 }}
          />
        </View>

        <View>
          <Text style={{fontFamily:'SFUIDisplay-Bold', fontSize: 27, color: "black", marginTop:-15 }}>Sign up</Text>
          <Text style={{fontFamily:'SFUIDisplay-Bold',  fontSize: 12, fontWeight: '500', color: '#adacad' }}>Sign up to enjoy the feature of Revolutiex </Text>
        </View>
           
        <View style={{alignItems: 'center', justifyContent: 'center', gap:5, marginTop:15}}>
          {/* Name Field */}
          <View style={{
            position: 'relative',
            borderWidth: isFocusedName ? 2 : 1,
            borderColor: isFocusedName ? '#407BFF' : '#d7d9dc',
            borderRadius: 10,
            width: width * 0.87,
            height: height * 0.055,
            paddingHorizontal: 10,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            {(isFocusedName || name) && (
              <Text style={{
                fontFamily:'SFUIDisplay-Bold',
                position: 'absolute',
                top: -10,
                left: 10,
                backgroundColor: '#EAEDF4',
                paddingHorizontal: 5,
                fontSize: 12,
                color: '#407BFF',
                fontWeight: '500',
              }}>Name</Text>
            )}
        
            <TextInput
              style={{
                fontFamily:'SFUIDisplay-Bold',
                flex: 1,
                fontSize: 16,
                color: '#1E293B',
                height: '100%',
              }}
              placeholder={isFocusedName ? '' : 'Name'}
              value={name}
              onChangeText={setName}
              onFocus={() => setIsFocusedName(true)}
              onBlur={() => setIsFocusedName(false)}
              keyboardType="default"
            />
          </View>

          {/* Email Field */}
          <View style={{
            position: 'relative',
            borderWidth: isFocusedEmail ? 2 : 1,
            borderColor: isFocusedEmail ? '#407BFF' : '#d7d9dc',
            borderRadius: 10,
            width: width * 0.87,
            height: height * 0.055,
            paddingHorizontal: 10,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15
          }}>
            {(isFocusedEmail || email) && (
              <Text style={{
                fontFamily:'SFUIDisplay-Bold',
                position: 'absolute',
                top: -10,
                left: 10,
                backgroundColor: '#EAEDF4',
                paddingHorizontal: 5,
                fontSize: 12,
                color: '#407BFF',
                fontWeight: '500',
              }}>E-mail</Text>
            )}
        
            <TextInput
              style={{
                fontFamily:'SFUIDisplay-Bold',
                flex: 1,
                fontSize: 16,
                color: '#1E293B',
                height: '100%',
              }}
              placeholder={isFocusedEmail ? '' : 'E-mail'}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setIsFocusedEmail(true)}
              onBlur={() => setIsFocusedEmail(false)}
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Date of Birth Section */}
        <View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={date}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          /> 
          <Text style={{color:'#535456', fontWeight: '500', fontSize: 13,marginLeft:10,marginTop:8}}>Birth of Date</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <View style={{alignItems: 'center', justifyContent: 'center',}}>
              <View
              style={{
                borderWidth: 1,
                borderColor: '#d7d9dc',
                borderRadius: 10,
                width: width * 0.87,
                height: height * 0.055,
                marginTop:5,
                paddingLeft: 10,
                justifyContent:'space-between',
                flexDirection:'row',
                alignItems:'center'
              }}>
                <Text style={{fontSize:14,fontWeight:'500'}}>
                  {date.toLocaleDateString()}
                </Text>
                <AntDesign style={{marginRight:10}} name="calendar" size={24} color="black" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Phone Number Section */}
          <View style={{ justifyContent: 'center'}}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 280,
              marginTop: 20,
              marginLeft:6,
              gap: 10,
            }}>
              {/* Country Code Selector */}
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#d7d9dc',
                  borderRadius: 10,
                  height: height * 0.055,
                  width: 80,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 8,
                }}
                onPress={() => setCountryCodeModalVisible(true)}
              >
                <Text style={{fontSize: 14}}>{selectedCountryCode.flag} {selectedCountryCode.code}</Text>
                <AntDesign name="caretdown" size={12} color="#535456" />
              </TouchableOpacity>

              {/* Phone Number Input */}
              <View style={{
                position: 'relative',
                borderWidth: isFocusedPhone ? 2 : 1,
                borderColor: isFocusedPhone ? '#407BFF' : '#d7d9dc',
                borderRadius: 10,
                width: width * 0.64,
                height: height * 0.055,
                paddingHorizontal: 10,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                {(isFocusedPhone || phonenumber) && (
                  <Text style={{
                    fontFamily:'SFUIDisplay-Bold',
                    position: 'absolute',
                    top: -10,
                    left: 10,
                    backgroundColor: '#EAEDF4',
                    paddingHorizontal: 5,
                    fontSize: 12,
                    color: '#407BFF',
                    fontWeight: '500',
                  }}>Phone Number</Text>
                )}
            
                <TextInput
                  style={{
                    fontFamily:'SFUIDisplay-Bold',
                    flex: 1,
                    fontSize: 16,
                    color: '#1E293B',
                    height: '100%',
                  }}
                  placeholder={isFocusedPhone ? '' : 'Phone Number'}
                  value={phonenumber}
                  onChangeText={setPhoneNumber}
                  onFocus={() => setIsFocusedPhone(true)}
                  onBlur={() => setIsFocusedPhone(false)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          
            {/* Password Field */}
            <View style={{ marginLeft: 6 }}>
              <View style={{
                position: 'relative',
                borderWidth: isFocusedPassword ? 2 : 1,
                borderColor: isFocusedPassword ? '#407BFF' : '#d7d9dc',
                borderRadius: 10,
                width: width * 0.87,
                height: height * 0.055,
                paddingHorizontal: 10,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop:20
              }}>
                {(isFocusedPassword || password) && (
                  <Text style={{
                    fontFamily:'SFUIDisplay-Bold',
                    position: 'absolute',
                    top: -10,
                    left: 10,
                    backgroundColor: '#EAEDF4',
                    paddingHorizontal: 5,
                    fontSize: 12,
                    color: '#407BFF',
                    fontWeight: '500',
                  }}>Password</Text>
                )}
            
                <TextInput
                  style={{
                    fontFamily:'SFUIDisplay-Bold',
                    flex: 1,
                    fontSize: 16,
                    color: '#1E293B',
                    height: '100%',
                  }}
                  placeholder={isFocusedPassword ? '' : 'Password'}
                  value={password}
                  onChangeText={setPassword}
                  keyboardType='default'
                  secureTextEntry={!showPassword}
                  onFocus={() => setIsFocusedPassword(true)}
                  onBlur={() => setIsFocusedPassword(false)}
                />
                <TouchableOpacity 
                  style={{padding: 12}}
                  onPress={() => setShowPassword(!showPassword)} 
                >
                  <MaterialIcons 
                    name={showPassword ? "visibility" : "visibility-off"} 
                    size={22} 
                    color="#64748B" 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
            
          {/* Register Button */}
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity onPress={handleRegister}>
              <View style={{alignItems:'center',justifyContent:'center',marginTop:30,width:280,height:55,borderRadius:15,backgroundColor:'#2768e8'}}>
                <Text style={{color:'#e5edfc',fontWeight:'500'}}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Country Code Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={countryCodeModalVisible}
          onRequestClose={() => setCountryCodeModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Country Code</Text>
                <TouchableOpacity onPress={() => setCountryCodeModalVisible(false)}>
                  <AntDesign name="close" size={24} color="#535456" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={countryCodes}
                renderItem={renderCountryCodeItem}
                keyExtractor={(item) => item.code}
                style={styles.countryCodeList}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    width:350,
    height: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d7d9dc',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#535456',
  },
  countryCodeList: {
    flex: 1,
  },
  countryCodeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  countryFlag: {
    fontSize: 22,
    marginRight: 10,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#535456',
  },
  scroll:{
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default RegisterScreen;