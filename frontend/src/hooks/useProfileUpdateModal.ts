import { useState } from "react";
import { useAppError } from "../contexts/ErrorContext";
import { profileUpdateSchema } from "../libs/schemas/profileSchema";

type UseProfileUpdateModalParams = {
  initialFullName: string;
  initialPhoto: string;
};

function useProfileUpdateModal({
  initialFullName,
  initialPhoto,
}: UseProfileUpdateModalParams) {
  const [fullName, setFullName] = useState(initialFullName);
  const [photo, setPhoto] = useState(initialPhoto);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {handleAppErrors} = useAppError()

async function handleSubmit() {
  try {
    setIsSubmitting(true);

    const schema = profileUpdateSchema(initialFullName, initialPhoto);
    schema.parse({ fullName, photo }); 

    console.log("Submitting profile update:", { fullName, photo });
  } catch (err: any) {
    handleAppErrors(err)
  } finally {
    setIsSubmitting(false);
  }
}

  return {
    fullName,
    photo,
    setFullName,
    setPhoto,
    handleSubmit,
    isSubmitting,
  };
}

export default useProfileUpdateModal;
