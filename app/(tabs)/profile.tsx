import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "../../constants";
import Empty from "@/components/empty";
import { getUserVideo, signOut } from "@/lib/appWrite";
import { useAppwrite } from "@/lib/useAppwrite";
import VideoCard from "@/components/video-card";
import { Videos } from "@/types";
import { useGlobalContext } from "@/context/global-context";
import InfoBox from "@/components/info-box";
import { router } from "expo-router";
import { Alert } from "react-native";

const Profile = () => {
  const { currentUser, setCurrentUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts } = useAppwrite(() => getUserVideo(currentUser!));

  const logout = async () => {
    try {
      await signOut();
      setCurrentUser(null);
      setIsLoggedIn(false);
      router.replace("/sign-in");
      
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message)
      } else {
        Alert.alert("Error", "Something went wrong")
      }
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }: { item: Videos }) => <VideoCard {...item} />}
        ListHeaderComponent={() => (
          <View className="items-center justify-center w-full px-4 mt-6 mb-12">
            <TouchableOpacity
              className="items-end w-full mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View className="items-center justify-center w-16 h-16 text-center border rounded-lg border-secondary">
              <Image
                source={{ uri: currentUser?.avatar }}
                className="w-[90%] h-[90%] object-contain rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={currentUser?.username!}
              titleStyles={"text-lg"}
              containerStyles={"mt-5"}
            />

            <View className="flex-row mt-5">
              <InfoBox
                // @ts-expect-error
                title={posts?.length || 0}
                subtitle="Posts"
                titleStyles={"text-xl"}
                containerStyles={"mr-5"}
              />

              <InfoBox
                title={"10.2k"}
                titleStyles={"text-xl"}
                subtitle="Followers"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Empty
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};
export default Profile;
