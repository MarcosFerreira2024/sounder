import React, { useContext } from "react";
import { ModalWrapper } from "../ui/ModalWrapper";
import { useUserContext } from "../../contexts/UserContext";
import InputLabel from "../ui/InputLabel";
import useProfileUpdateModal from "../../hooks/useProfileUpdateModal";
import Button from "../ui/Button";

type ProfileUpdateModalProps = {
  onClose: () => void;
};

function ProfileUpdateModal({ onClose }: ProfileUpdateModalProps) {
  const { user } = useUserContext();

  const { fullName, handleSubmit, setFullName, setPhoto } =
    useProfileUpdateModal({
      initialFullName: user!.name + " " + user!.surname,
      initialPhoto: user!.photo,
    });

  return (
    <ModalWrapper onClose={onClose}>
      <div className="flex relative">
        <div className="flex gap-4">
          <div>
            <img
              className="rounded-full hover:opacity-90 object-cover border-neutral-800 border"
              src={user!.photo}
              onClick={() => alert("preciso implementar isso aq ...")}
              alt={user!.name}
            />
          </div>
          <div>
            <InputLabel
              text="Nome"
              name="fullName"
              value={fullName}
              onChange={setFullName}
              placeholder="Digite um novo nome"
              type="text"
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="text-opacity  w-[70px]   absolute right-0 self-end"
          size="sm"
          roundedValue="md"
        >
          Salvar
        </Button>
      </div>
    </ModalWrapper>
  );
}

export default ProfileUpdateModal;
