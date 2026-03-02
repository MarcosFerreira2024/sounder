import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppNotifications } from "../contexts/NotificationsContext";
import { useUser } from "./useUser";
import { updateUserData } from "../actions/user/updateUser";
import { userUpdateSchema } from "../libs/schemas/userUpdateSchema";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "../libs/auth/auth";

function useUserUpdateModal(onSubmitCloseFunction: () => void) {
  const authUser = authClient.useSession().data?.user;
  const { user, loading } = useUser(authUser?.id);
  const queryClient = useQueryClient();
  const { handleAppNotificationsError } = useAppNotifications();

  const [fullName, setFullName] = useState<string>("");
  const [about, setAbout] = useState<string>("");

  const aboutPlaceholder = "Escreva uma breve descrição sobre você.";

  useEffect(() => {
    if (!user) return;

    setFullName(user.name ?? "");
    setAbout(user.about ?? "");
  }, [user]);

  const mutation = useMutation({
    mutationFn: async (data: { fullName: string; about: string }) => {
      userUpdateSchema.parse(data);
      return updateUserData({ name: data.fullName, about: data.about });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSubmitCloseFunction();
    },
    onError: (err: any) => {
      handleAppNotificationsError(err);
    },
  });

  function handleSubmit() {
    mutation.mutate({ fullName, about });
  }

  return {
    fullName,
    setFullName,
    about,
    setAbout,
    aboutPlaceholder,
    handleSubmit,
    isSubmitting: mutation.isPending,
    loading,
  };
}

export default useUserUpdateModal;
