import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from 'expo-auth-session/providers/google';
import * as Font from 'expo-font';
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


const { width, height } = Dimensions.get('window');

// Firebase config'in (google-services.json'dan veya Firebase Console'dan aldığın gibi)
const firebaseConfig = {
  apiKey: "AIzaSyAFUxF38VpRaNDLRe3j8aDvXDzipIpuCM4",
  authDomain: "authapp1-20371.firebaseapp.com",
  projectId: "authapp1-20371",
  storageBucket: "authapp1-20371.appspot.com",
  messagingSenderId: "836177744715",
  appId: "1:836177744715:android:d8ef51ec34fb691e848ece"
};

// Firebase'i initialize et (birden fazla kez başlatmaz)
// if (getApps().length === 0) {
//   initializeApp(firebaseConfig);
// }

// const auth = getAuth();

// Web Client ID'ni buraya gir! Google Cloud Console'dan alınıyor.
const WEB_CLIENT_ID = "494991197461-6ur9gbl6k5su0e4prqhbiilu4g8r4tob.apps.googleusercontent.com";

const LoginScreen = ({value, setValue, placeholder, secureTextEntry, keyboardType, isPassword, navigation }:any) => {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
        const [loaded, setLoaded] = useState(false);
const [password, setPassword] = useState('');
const [isFocusedEmail, setIsFocusedEmail] = useState(false);
const [isFocusedPassword, setIsFocusedPassword] = useState(false);
const [showPassword, setShowPassword] = useState(false);


     useEffect(() => {
            Font.loadAsync({
              'SFUIDisplay-Bold': require('../../../assets/fonts/SFUIDisplay-Bold.ttf'),
                'SFUI': require('../../../assets/fonts/SFUIDisplay-Black.otf'),
            }).then(() => setLoaded(true));
          }, []);


  // Google AuthSession hook'u
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: WEB_CLIENT_ID,
  });

  // useEffect(() => {
  //   const loginWithGoogle = async () => {
  //     if (response?.type === 'success') {
  //       try {
  //         const { id_token, access_token } = response.params;
  //         // Firebase ile Google kimlik doğrulama
  //         const credential = GoogleAuthProvider.credential(id_token);
  //         const userCredential = await signInWithCredential(auth, credential);
  //         const user = userCredential.user;

  //         // Backend'e Google ile giriş yapan kullanıcının bilgilerini gönder
  //         const backendResponse = await fetch("http://192.168.197.88:5000/api/auth/google", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             email: user.email,
  //             name: user.displayName,
  //             profile_image: user.photoURL,
  //             token: id_token,
  //           }),
  //         });
  //         const backendData = await backendResponse.json();

  //         if (backendResponse.status === 200) {
  //           await AsyncStorage.setItem("token", backendData.token);
  //           navigation.navigate("UserProfile");
  //         } else {
  //           Alert.alert("Hata", backendData.message || "Google girişi başarısız oldu");
  //         }
  //       } catch (error) {
  //         console.error("Google giriş hatası:", error);
  //         Alert.alert("Hata", "Google ile giriş yapılırken bir sorun oluştu.");
  //       }
  //     }
  //   };
  //   loginWithGoogle();
  // }, [response, navigation]);

  const handleCheckBox = () => setIsChecked(!isChecked);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.140.88:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        await AsyncStorage.setItem("token", data.token);
        navigation.navigate("Home");
      } else {
        Alert.alert("Hata", data.message);
      }
    } catch (err) {
      Alert.alert("Bağlantı Hatası", "Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#EAEDF4' }}>
      <StatusBar backgroundColor="#EAEDF4" barStyle="dark-content" />

        {/* logo */}
        <View style={{ marginTop: 40 }}>
          
        </View>
        {/* login screen */}
        <View
          style={{
            width: "100%",
            backgroundColor: "#EAEDF4",
            padding: 20,
            height: height ,
          }}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 0 }}>
            <Image
              source={require("../../../assets/login.png")}
              style={{ width: 400, height: 275, marginTop: 0   }}
            />
          </View>

            <View>
            <Text style={{fontFamily:'SFUIDisplay-Bold', fontSize: 27, color: "black", marginTop:0 }}>Sign in</Text>
            <Text style={{fontFamily:'SFUIDisplay-Bold',  fontSize: 12, fontWeight: '500', color: '#adacad' }}>Please login to continue to your account</Text>
            {/* Google login button */}

          </View>
          {/* email,password,rememberme,forgotpassword input and button */}
          <View style={{ marginRight: 'auto', marginLeft: 'auto' }}>
          <View style={{ marginTop: 20 }}>
  {/* Email Field */}
  <View style={{
    position: 'relative',
    borderWidth: isFocusedEmail ? 2 : 1,
    borderColor: isFocusedEmail ? '#407BFF' : '#d7d9dc',
    borderRadius: 10,
    width: width * 0.87,
    height: height * 0.057,
    paddingHorizontal: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
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

  {/* Password Field */}
  <View style={{
    position: 'relative',
    borderWidth: isFocusedPassword ? 2 : 1,
    borderColor: isFocusedPassword ? '#407BFF' : '#d7d9dc',
    borderRadius: 10,
    width: width * 0.87,
    height: height * 0.057,
    paddingHorizontal: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
        flex: 1,
        fontSize: 16,
        color: '#1E293B',
        height: '100%',
        fontFamily:'SFUIDisplay-Bold',
      }}
      placeholder={isFocusedPassword ? '' : 'Password'}
      value={password}
      onChangeText={setPassword}
      onFocus={() => setIsFocusedPassword(true)}
      onBlur={() => setIsFocusedPassword(false)}
      keyboardType="default"
      secureTextEntry={!showPassword}
    />

    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 10 }}>
      <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={22} color="#64748B" />
    </TouchableOpacity>
  </View>
</View>

            {/* remember me and forgot password button */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, }}>
              <View style={{ flexDirection: 'row', marginTop: 10, }}>
                {/* <TouchableOpacity
                  onPress={handleCheckBox}
                  style={{
                    width: 15,
                    height: 15,
                    borderWidth: 1.5,
                    borderColor: isChecked ? '#4d81e7' : 'black',
                    borderRadius: 4,
                    marginRight: 8,
                    marginTop: 0,
                    backgroundColor: isChecked ? '#4d81e7' : '#fff',
                  }}
                >
                  {isChecked && <AntDesign name="check" size={12} style={{ marginTop: 0 }} color="white" />}
                </TouchableOpacity>
                <Text style={{ color: '#535456', fontWeight: '500', fontSize: 10.5 }}>Remember me</Text> */}
              </View>
              <TouchableOpacity>
                <Text style={{ fontFamily:'SFUIDisplay-Bold',color: '#2768e8', marginTop: 10, fontWeight: '500', fontSize: 11 }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            {/* log in and sign up button */}
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={handleLogin}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10,   width: width * 0.87,
    height: height * 0.057, borderRadius: 10, backgroundColor: '#2768e8' }}>
                  <Text style={{fontFamily:'SFUIDisplay-Bold', color: '#e5edfc', fontWeight: '500' }}>Sign in</Text>
                </View>
              </TouchableOpacity>
             
            </View>
             {/* or line */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
              <View style={{ borderWidth: 0.8, borderColor: '#D9D9D9', height: 1, width: 145 }} />
              <Text style={{ marginHorizontal: 10, fontSize: 15,fontWeight:600, color: '#6E6E6E', marginLeft: 15, marginRight: 15 }}>or</Text>
              <View style={{ borderWidth: 0.8, borderColor: '#D9D9D9', height: 1, width: 145 }} />
            </View>
            <TouchableOpacity onPress={() => promptAsync()} disabled={!request}>
              <View style={{  borderRadius: 10, marginTop: 20, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',   width: width * 0.87,
    height: height * 0.057,backgroundColor: '#ffff' ,shadowColor: '#000',shadowOffset: { width: 0, height:7 },shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 4}}>
                <Image
                  source={require('../../../assets/google.png')}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <Text style={{ fontFamily:'SFUIDisplay-Bold',}}>Sign in with Google</Text>
              </View>
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ fontFamily:'SFUIDisplay-Bold',fontWeight: '500' }}>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                  style={{ marginLeft: 8 }}
                ><Text style={{ fontFamily:'SFUIDisplay-Bold',color: '#2768e8', fontWeight: '500',fontSize:15 }}>Create One</Text></TouchableOpacity>
              </View>
            {/* facebook login button */}
            {/* <TouchableOpacity>
              <View style={{ borderWidth: 1.5, borderColor: '#d7d9dc', borderRadius: 10, marginTop: 20, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width * 0.7, height: height * 0.057 }}>
                <Image
                  source={require('../../../assets/facebook.png')}
                  style={{ width: 25, height: 25, marginRight: 10 }}
                />
                <Text style={{ fontSize: 14, fontWeight: '500' }}>Sign in with Facebook</Text>
              </View>
            </TouchableOpacity> */}
           
          </View>
        </View>
    
    </ScrollView>
  );
};

export default LoginScreen;