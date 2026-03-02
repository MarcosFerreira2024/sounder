import React, { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useConfetti from "./useConfetti";
import useVisibility from "./useVisibility";
import type { Artist } from "./useSearch";
import { useAppNotifications } from "../contexts/NotificationsContext";
import getArtists from "../actions/artist/getArtists";
import { startSession } from "../actions/game/startSession";
import { getUserGameStats } from "../actions/game/getUserGameStats";
import { getGameState } from "../actions/game/getGameState";
import { sendAnswer } from "../actions/game/answer";

export type GameStats = {
  qtd: number;
  text: string;
}[];

export type GameState = {
  status?: "FINISHED" | "IN_PROGRESS";
  tries?: number;
  image?: string;
  audio?: string;
  correctAnswer?: boolean | string;
  artistName?: string;
  musicName?: string;
};

function useGame() {
  const { close, isVisible } = useVisibility(true);
  const [showResults, setShowResults] = useState(false);
  const { triggerConfetti } = useConfetti();

  const handleClose = () => {
    close();
    setShowResults(false);
  };
  const { setNotification } = useAppNotifications();
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState("");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isSendingAnswer, setIsSendingAnswer] = useState(false);

  const timeRef = useRef<number>(0);
  const mode = "normal";

  const sessionQuery = useQuery({
    queryKey: ["session", mode],
    queryFn: () => startSession(mode),
    retry: 1,
  });

  const statsQuery = useQuery<GameStats, Error>({
    queryKey: ["gameStats", mode],
    queryFn: async () => {
      const stats = await getUserGameStats(mode);
      return [
        { qtd: stats.wins, text: "Vitórias" },
        { qtd: stats.matches, text: "Jogos" },
        { qtd: stats.loses, text: "Derrotas" },
        { qtd: stats.winPercent, text: "%Vitorias" },
      ];
    },
    enabled: sessionQuery.isSuccess,
  });

  const stateQuery = useQuery<GameState, Error>({
    queryKey: ["gameState", mode],
    queryFn: async () => {
      return await getGameState(mode);
    },
    enabled: sessionQuery.isSuccess,
  });

  const correctAnswer = stateQuery.data?.correctAnswer ?? false;
  const sounderLink = window.location.origin + "/daily-game";

  const textWhenLose = `
  🎵 Hoje joguei o Jogo Diário do Sounder e infelizmente errei! 😢

  Será que você consegue fazer melhor? Clique aqui para tentar: [Jogar Agora](${sounderLink})

  📊 Minhas Estatísticas:
  ${statsQuery.data?.map((stat) => `- ${stat.text}: ${stat.qtd}`).join("\n")}

  Boa sorte! Você consegue 💪 ou não 😂! 
  `;

  const textWhenWin = `
  🎉 Hoje joguei o Jogo Diário do Sounder e acertei em ${stateQuery.data?.tries} ${stateQuery.data?.tries === 1 ? "tentativa" : "tentativas"}!  

  Será que você também consegue? Clique aqui para jogar: [Jogar Agora](${sounderLink})

  📊 Minhas Estatísticas:
  ${statsQuery.data?.map((stat) => `- ${stat.text}: ${stat.qtd}`).join("\n")}

  Tente superar meu recorde! 🚀
  `;

  const textToCopy = correctAnswer ? textWhenWin : textWhenLose;
  const handleShare = () => {
    navigator.clipboard.writeText(textToCopy);
    window.alert("Texto copiado para área de transferência");
  };

  const startSessionMutation = useMutation({
    mutationFn: () => startSession(mode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gameState", mode] });
      queryClient.invalidateQueries({ queryKey: ["gameStats", mode] });
    },
  });

  const sendAnswerMutation = useMutation({
    mutationFn: (answer: string) => sendAnswer(answer, mode),
    onSuccess: (data) => {
      if (data.status === "FINISHED") {
        queryClient.invalidateQueries({ queryKey: ["gameStats", mode] });
      }
      queryClient.invalidateQueries({ queryKey: ["gameState", mode] });
    },
  });

  if (statsQuery.error) setNotification(statsQuery.error.message);
  if (stateQuery.error) setNotification(stateQuery.error.message);
  if (sendAnswerMutation.error)
    setNotification((sendAnswerMutation.error as Error).message);
  if (startSessionMutation.error)
    setNotification((startSessionMutation.error as Error).message);

  const handleDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    clearTimeout(timeRef.current);

    if (value.trim() === "") {
      setArtists([]);
      return;
    }

    timeRef.current = window.setTimeout(async () => {
      try {
        const query = `name=${value.trim()}&limit=10&page=1&match=startsWith`;
        const data = await getArtists(query);
        setArtists(data);
      } catch (error: any) {
        setNotification(error.message);
      }
    }, 300);
  };

  const answer = async () => {
    if (!searchValue || stateQuery.data?.status === "FINISHED") return;

    if (artists.length) {
      const filtered = artists.find((artist) =>
        artist.name.toLowerCase().includes(searchValue.trim().toLowerCase()),
      );
      if (filtered) {
        setSearchValue(filtered.name.trim());
      }
      setArtists([]);
      setNotification("Resposta enviada com sucesso");
    }

    setIsSendingAnswer(true);
    try {
      await sendAnswerMutation.mutateAsync(searchValue);
    } finally {
      setSearchValue("");
      setIsSendingAnswer(false);
    }
  };

  const handleKeyboard = (e: React.KeyboardEvent<Element>) => {
    if (
      e.key === "Enter" &&
      !isSendingAnswer &&
      stateQuery.data?.status !== "FINISHED"
    ) {
      answer();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (stateQuery.data?.status === "FINISHED" || isSendingAnswer) return;
    await answer();
  };

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
    setArtists([]);
  };

  const isLoadingState =
    statsQuery.isLoading || stateQuery.isLoading || sessionQuery.isLoading;

  const confettiTriggered = useRef(false);

  React.useEffect(() => {
    if (isLoadingState) return;

    const isFinished = stateQuery.data?.status === "FINISHED";
    const isWin = !!stateQuery.data?.correctAnswer;

    if (isFinished && isWin && !confettiTriggered.current) {
      confettiTriggered.current = true;
      console.log("Confetti triggered!");
      const timeout = setTimeout(() => {
        triggerConfetti();
      }, 1000);
      return () => clearTimeout(timeout);
    }

    if (!isFinished) {
      confettiTriggered.current = false;
    }
  }, [
    isLoadingState,
    stateQuery.data?.status,
    stateQuery.data?.correctAnswer,
    triggerConfetti,
  ]);

  const gameExists = !!!sessionQuery.error?.message.includes(
    "DailyGame not created yet",
  );

  return {
    stats: statsQuery.data ?? null,
    state: stateQuery.data ?? null,
    searchValue,
    artists,
    isLoadingState,
    isSendingAnswer,
    gameExists,
    handleDebounce,
    handleKeyboard,
    handleSearchValue,
    handleSubmit,
    isVisible,
    close: handleClose,
    setShowResults,
    handleShare,
    showResults,

    isLoadingSession: sessionQuery.isLoading,
    isStateLoading: stateQuery.isLoading,
    isStatsLoading: statsQuery.isLoading,
  };
}

export default useGame;
