import { IAlbum } from "../types/album.types";

export function section_albums(albums: IAlbum[]) {
  const sections: { [key: string]: IAlbum[] } = {};

  albums.forEach((album) => {
    const user_id = album.userId;

    if (!sections[user_id]) {
      sections[user_id] = [];
    }

    sections[user_id].push(album);
  });

  return Object.keys(sections).map((key) => ({ title: key, data: sections[key] })) as {
    title: string;
    data: IAlbum[];
  }[];
}
