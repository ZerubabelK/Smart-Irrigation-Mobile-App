import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import {logout} from '../redux/slices/userSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TopBar from '../components/TopBar';
import {useDispatch, useSelector} from 'react-redux';
const Profile = ({setIsConnected}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer);
  const {firstName, lastName} = user;
  return (
    <View className="relative h-full py-2">
      <TopBar setIsConnected={setIsConnected} />
      <ScrollView>
        <View>
          <View className="items-center bg-fixed">
            <Image
              className="w-full object-contain h-52"
              source={require('../assets/profile_cover.jpg')}
            />
          </View>
          <View className="flex-row justify-between mt-3 px-5">
            <Text className="text-xl text-black">
              {firstName} {lastName}
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(logout());
              }}
              className="bg-sky-500 px-3 py-2 rounded-xl">
              <Text className="text-white">Log out</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View className="flex-row justify-evenly">
              <View className="p-5 mt-5 w-max h-42 items-center bg-cyan-300 rounded-xl">
                <View className="border-2 rounded-xl w-1/2 py-4 items-center justify-center">
                  <Text className="text-2xl">26</Text>
                </View>
                <Text className="mt-3">Total Number of use</Text>
              </View>
              <View className="p-5 mt-5 w-max h-42 items-center bg-cyan-300 rounded-xl">
                <View className="border-2 rounded-xl w-1/2 py-4 items-center justify-center">
                  <Text className="text-2xl">40%</Text>
                </View>
                <Text className="mt-3">Last Moisture Level</Text>
              </View>
            </View>
            <View className="items-center">
              <View className="p-5 mt-5 w-1/2 h-42 items-center bg-cyan-300 rounded-xl">
                <View className="border-2 rounded-xl w-1/2 py-4 items-center justify-center">
                  <Text className="text-2xl">550</Text>
                </View>
                <Text className="mt-3">Amount of water used</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
