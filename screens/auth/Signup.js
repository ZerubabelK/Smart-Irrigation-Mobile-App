import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {signup} from '../../redux/slices/userSlice';
const Signup = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSignup = () => {
    dispatch(signup({firstName, lastName, username, password}));
  };
  return (
    <View className="relative h-screen mt-12 ">
      <View className="items-center">
        <View className="mt-12">
          <Text className="text-4xl font-sans text-black">Welcome!</Text>
        </View>
        <View>
          <Text className="text-xl text-center mt-1 text-black">
            Please, Signup before
          </Text>
          <Text className="text-xl text-center text-black">
            using our plaftorm
          </Text>
        </View>
      </View>
      <View className="items-center justify-center mt-4">
        <TextInput
          placeholder="Enter First name"
          className="w-3/4 rounded px-2 py-3 mt-3 shadow-sm z-20"
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          placeholder="Enter Last name"
          className="w-3/4 rounded px-2 py-3 mt-3 shadow-sm z-20"
          onChangeText={text => setLastName(text)}
        />
        <TextInput
          placeholder="Enter username"
          className="w-3/4 rounded px-2 py-3 mt-3 shadow-sm z-20"
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          placeholder="Enter Password"
          textContentType="password"
          className="w-3/4 rounded px-2 py-3 mt-4 shadow-sm z-20"
          onChangeText={text => setPassword(text)}
        />
        <View className="w-4/5 h-px bg-gray-300 mt-10"></View>
        <TouchableOpacity
          onPress={handleSignup}
          className="bg-sky-500 px-3 py-3 mt-3 w-3/4 rounded-lg items-center">
          <Text className="text-white text-xl">Sign up</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row self-center mt-12">
        <Text>Already a member?</Text>
        <TouchableOpacity>
          <Text className="text-sky-500"> Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
