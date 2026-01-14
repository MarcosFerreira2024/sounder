import { jojiGlimpseOfUs } from "../data/musicMock";

export function usePlaylist() {
  const playlistName = "Minha Playlist";
  const playlistPhoto = "/playlist.jpg";

  const musics = [
    jojiGlimpseOfUs,
    {
      id: "2",
      name: "Song 2",
      author: "Artist 2",
      url: "/song2.mp3",
      photo: "/music-cover-mock.png",
      duration: "2:45",
      lyrics: [],
    },
    {
      id: "3",
      name: "Song 3",
      author: "Artist 3",
      url: "/song3.mp3",
      photo: "/music-cover-mock.png",
      duration: "4:10",
      lyrics: [],
    },
  ];

  const playListMusicsTotal = musics.length;

  return {
    playlistName,
    playlistPhoto,
    playListMusicsTotal,
    musics,
  };
}
