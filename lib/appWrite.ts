import { IForm } from "@/app/(tabs)/create";
import { User } from "@/context/global-context";
import { ImagePickerAsset } from "expo-image-picker";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.bishal.aura",
  projectId: "671caccf0011a9a8b52f",
  databaseId: "671caea60026f5e82e27",
  userCollectionId: "671caebe0026a9b622b3",
  videoCollectionId: "671caed90029cc08f41a",
  storageId: "671cb085000ed62d72d3",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      throw new Error(
        "Account creation failed: No account returned from service."
      );
    }

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    throw error;
  }
};

export const getAllVideos = async () => {
  const videos = await databases.listDocuments(databaseId, videoCollectionId);

  return videos.documents;
};

export const getLatestVideos = async () => {
  const videos = await databases.listDocuments(databaseId, videoCollectionId, [
    Query.orderDesc("$createdAt"),
    Query.limit(7),
  ]);

  return videos.documents;
};

export const searchVideoTopics = async (query: string) => {
  const videos = await databases.listDocuments(databaseId, videoCollectionId, [
    Query.search("title", query),
  ]);

  return videos.documents;
};

export const getUserVideo = async (user: User) => {
  const videos = await databases.listDocuments(databaseId, videoCollectionId, [
    Query.orderDesc("$createdAt"),
    Query.equal("creator", user.$id),
  ]);

  return videos.documents;
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
};

// Upload File
export async function uploadFile(file: ImagePickerAsset, type: string) {
  if (!file) return;

  const asset = {
    name: file.fileName!,
    type: file.mimeType!,
    size: file.fileSize!,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
}

// Get File Preview
export async function getFilePreview(fileId: string, type: string) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
}

interface CreateVideoPostType extends IForm {
  userId: string;
}

// Create Video Post
export async function createVideoPost(form: CreateVideoPostType) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail!, "image"),
      uploadFile(form.video!, "video"),
    ]);

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
}
