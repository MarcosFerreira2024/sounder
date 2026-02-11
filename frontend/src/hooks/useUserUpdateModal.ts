import { useEffect, useState } from "react";
import { useAppError } from "../contexts/ErrorContext";
import { useUser } from "./useUser";
import { updateUserData } from "../actions/user/updateUser";
import { userUpdateSchema } from "../libs/schemas/userUpdateSchema";

function useUserUpdateModal(onSubmitCloseFunction: () => void) {
  const { user, loading } = useUser();

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setAbout(user.about || "");
    }
  }, [user, loading]);

  const aboutPlaceholder = "Escreva uma breve descrição sobre você.";

  const [fullName, setFullName] = useState(user?.name || "");
  const [about, setAbout] = useState(user?.about || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleAppErrors } = useAppError();

  async function handleSubmit() {
    try {
      setIsSubmitting(true);
      userUpdateSchema.parse({ fullName, about });
      await updateUserData({ name: fullName, about });
      onSubmitCloseFunction();
    } catch (err: any) {
      handleAppErrors(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    fullName,
    setFullName,
    handleSubmit,
    isSubmitting,
    about,
    setAbout,
    aboutPlaceholder,
  };
}

export default useUserUpdateModal;
