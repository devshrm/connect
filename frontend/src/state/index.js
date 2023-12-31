import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    token:null,
    posts:[]
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFollowers: (state, action) => {
            if(state.user) {
                state.user.followers = action.payload.followers;
            }else{
                console.log("user doesn't have any follower");
            }
        },
        setFollowing: (state, action) => {
            if(state.user) {
                state.user.following = action.payload.following;
            }else{
                console.log("user is not following anybody");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post;
                else return post;
            });
            state.posts = updatedPosts;
        }
    }
});

export const { setLogin, setLogout, setFollowers, setFollowing, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;