import * as types from '../types';

let initialState = {
    currSong: JSON.parse(localStorage.getItem('currSong')),
    songs: [],
    song: {},
    comments: [],
    trending: [],
    category: [],
    loading: false,
    error: null
}

const song = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.GET_SONG: 
            return {
                ...state,
                song: payload.song,
                comments: payload.comments
            }
        case types.GET_ALL_SONGS: 
            return {
                ...state,
                songs: payload
            }
        case types.GET_TOP_TRENDING: 
            return {
                ...state,
                trending: payload
            }
        case types.GET_CATEGORY:
            return {
                ...state,
                category: payload
            }
        case types.ADD_CURRENT_SONG:
            localStorage.setItem('currSong', JSON.stringify(payload));

            return {
                ...state,
            }
        case types.LIKE_SONG: 
            return {
                ...state
            }
        case types.PLAY_PAUSE_SONG: 
            return {
                ...state,
                currSong: payload.currSong,
                isPlaying: payload.isPlaying
            }
        default: 
            return state;
    }
}

export default song;