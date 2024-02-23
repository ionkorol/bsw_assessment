import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAlbum } from "../../types/album.types";
import { IUser } from "../../types/user.types";

interface IInitialState {
  albums: IAlbum[];
  users: IUser[];
  delete_album_id: number | null;
  photo_preview: string | null;
  search_text: string;
}

const initial_state: IInitialState = {
  albums: [],
  users: [],
  delete_album_id: null,
  photo_preview: null,
  search_text: "",
};

export const main_slice = createSlice({
  name: "main",
  initialState: initial_state,
  reducers: {
    setAlbums: (state, action: PayloadAction<IInitialState["albums"]>) => {
      state.albums = action.payload;
    },
    setUsers: (state, action: PayloadAction<IInitialState["users"]>) => {
      state.users = action.payload;
    },
    setDeleteAlbumId: (state, action: PayloadAction<IInitialState["delete_album_id"]>) => {
      state.delete_album_id = action.payload;
    },
    deleteAlbum: (state) => {
      if (!state.delete_album_id) return;
      state.albums = state.albums.filter((album) => album.id !== state.delete_album_id);
      state.delete_album_id = null;
    },
    setPhotoPreview: (state, action: PayloadAction<IInitialState["photo_preview"]>) => {
      state.photo_preview = action.payload;
    },
    setSearchText: (state, action: PayloadAction<IInitialState["search_text"]>) => {
      state.search_text = action.payload;
    },
  },
});

export const { setAlbums, setUsers, setDeleteAlbumId, deleteAlbum, setPhotoPreview, setSearchText } = main_slice.actions;
