import type { Song } from "../types/songs";

const songs: Song[] = []


export const addSong = (song: Song) : Song | undefined => {
    songs.push(song)
    return song
}
export const getSongs = () : Song[] => {
    return songs
}