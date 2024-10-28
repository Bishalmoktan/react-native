
export interface Creator {
  $id: string;
  username: string;
  avatar: string;
}

export interface Videos {
    $id: string;
    title: string;
    prompt: string;
    video: string;
    thumbnail: string;
    creator: Creator
}