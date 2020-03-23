import { createSlice } from "@reduxjs/toolkit";
import { getUserFolder } from "@/utils/fs";

export const DOMAIN = "platformFolders";

const slice = createSlice({
  name: DOMAIN,
  initialState: {
    home: getUserFolder("home"),
    desktop: getUserFolder("desktop"),
    downloads: getUserFolder("downloads"),
    music: getUserFolder("music"),
    pictures: getUserFolder("pictures"),
    videos: getUserFolder("videos")
  },
  reducers: {}
});

export default slice.reducer;
