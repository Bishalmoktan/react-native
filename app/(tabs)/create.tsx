import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { icons } from "../../constants";
import { createVideoPost } from "@/lib/appWrite";
import CustomButton from "@/components/custom-button";
import FormField from "@/components/form-field";
import { useGlobalContext } from "@/context/global-context";

export interface IForm {
  title: string;
  video: ImagePicker.ImagePickerAsset | null;
  thumbnail: ImagePicker.ImagePickerAsset | null;
}

const Create = () => {
  const { currentUser } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<IForm>({
    title: "",
    video: null,
    thumbnail: null,
  });

  const openPicker = async (selectType: "image" | "video") => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ?  ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  console.log("video", form.video)

  const submit = async () => {
    if (
      form.title === "" ||
      !form.thumbnail ||
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: currentUser?.$id!,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView className="px-4 my-6">
          <Text className="text-2xl text-white font-psemibold">
            Upload Video
          </Text>

          <FormField
            title="Video Title"
            value={form.title}
            placeholder="Give your video a catchy title..."
            handleTextChange={(e) => setForm({ ...form, title: e })}
            otherStyles="mt-10"
          />

          <View className="space-y-2 mt-7">
            <Text className="text-base text-gray-100 font-pmedium">
              Upload Video
            </Text>

            <TouchableOpacity onPress={() => openPicker("video")}>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  style={{
                    width: "100%",
                    height: 240,
                    borderRadius: 35,
                    marginTop: 10,
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                />
              ) : (
                <View className="flex items-center justify-center w-full h-40 px-4 border bg-black-100 rounded-2xl border-black-200">
                  <View className="flex items-center justify-center border border-dashed w-14 h-14 border-secondary-100">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      alt="upload"
                      className="w-1/2 h-1/2"
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View className="space-y-2 mt-7">
            <Text className="text-base text-gray-100 font-pmedium">
              Thumbnail Image
            </Text>

            <TouchableOpacity onPress={() => openPicker("image")}>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode="cover"
                  className="w-full h-64 rounded-2xl"
                />
              ) : (
                <View className="flex flex-row items-center justify-center w-full h-16 px-4 space-x-2 border-2 bg-black-100 rounded-2xl border-black-200">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-5 h-5"
                  />
                  <Text className="text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Submit & Publish"
            handlePress={submit}
            containerStyles="mt-7"
            loading={uploading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Create;
