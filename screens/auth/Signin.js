import React, {useState} from 'react';
import {Link} from '@react-navigation/native';
import {View, Text, Pressable, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/slices/userSlice';
const Signin = () => {
  const state = useSelector(state => state);
  console.log(state);
  const {user} = state.userReducer;
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleAuth = () => {
    if (username == user.username && password == user.password) {
      dispatch(login({username, password}));
    } else {
      alert('Invalid username or password, Please try again!');
    }
  };
  return (
    <View className="relative h-screen mt-12 ">
      <View className="items-center">
        <View className="mt-12">
          <Text className="text-4xl font-sans text-black">Welcome!</Text>
        </View>
        <View>
          <Text className="text-xl text-center mt-1 text-black">
            Please, Signin before
          </Text>
          <Text className="text-xl text-center text-black">
            using our plaftorm
          </Text>
        </View>
      </View>
      <View className="items-center justify-center mt-4">
        <TextInput
          placeholder="Username"
          className="w-3/4 rounded px-2 py-3 mt-3 shadow-sm z-20"
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          placeholder="Password"
          className="w-3/4 rounded px-2 py-3 mt-4 shadow-sm shadow-red-300 z-20"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <View className="w-4/5 h-px bg-gray-300 mt-10"></View>
        <Pressable
          onPress={handleAuth}
          className="bg-sky-500 px-3 py-3 mt-3 w-3/4 rounded-lg items-center">
          <Text className="text-white text-xl">Sign in</Text>
        </Pressable>
      </View>
      <View className="flex-row self-center mt-12">
        <Text>Not a member?</Text>
        <Pressable>
          <Text className="text-sky-500"> Register now</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signin;
