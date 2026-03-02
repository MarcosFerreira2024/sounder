import { useRef, useState } from "react";
import Input from "../components/ui/Input";

export default function Teste() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [query, setQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAndPlay = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          query,
        )}&country=BR&entity=song&limit=1`,
      );

      const data = await response.json();
      const previewUrl = data.results?.[0]?.previewUrl;

      if (!previewUrl) {
        alert("Música não encontrada.");
        return;
      }

      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.loop = true;
      }

      if (audioRef.current.src !== previewUrl) {
        audioRef.current.src = previewUrl;
        audioRef.current.load();
      }

      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Erro ao buscar música:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) {
      await fetchAndPlay();
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const music = false;

  if (music) {
    return (
      <div className="flex gap-2 items-center max-w-[300px] h-screen">
        <Input
          type="text"
          placeholder="Digite o nome da música..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={togglePlay}
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded"
        >
          {loading ? "Buscando..." : isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    );
  }

  return <></>;
}
