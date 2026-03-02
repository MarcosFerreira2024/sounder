import { ModalWrapper } from "../ui/ModalWrapper";
import InputLabel from "../ui/InputLabel";
import Button from "../ui/Button";
import useUserUpdateModal from "../../hooks/useUserUpdateModal";
import Image from "../ui/Image";

type UserUpdateModalProps = {
  onClose: () => void;
  photo: string;
  open: (modal: "photo") => void;
};

function UserUpdateModal({ onClose, photo, open }: UserUpdateModalProps) {
  const {
    fullName,
    handleSubmit,
    setFullName,
    setAbout,
    aboutPlaceholder,
    about,
    loading,
    isSubmitting,
  } = useUserUpdateModal(onClose);

  if (loading || isSubmitting) return null;

  return (
    <>
      <ModalWrapper className={`w-full max-w-[800px] `} onClose={onClose}>
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-1 gap-4 ">
            <div>
              <Image
                className="rounded-full max-w-[100px] max-h-[100px] min-w-[100px] min-h-[100px] md:max-w-[150px] md:max-h-[150px] md:min-w-[150px] md:min-h-[150px]  hover:opacity-90 object-cover border-neutral-800 border"
                src={photo}
                onClick={() => open("photo")}
                alt={fullName}
              />
            </div>
            <InputLabel
              text="Nome"
              name="fullName"
              value={fullName}
              onChange={setFullName}
              placeholder="Digite um novo nome"
              type="text"
            />
          </div>
          <label className="flex flex-col gap-2" htmlFor="about">
            <h1 className="text-main text-xl md:text-2xl ">Sobre</h1>
            <div className="p-2 bg-neutral-950 rounded-2xl w-full border border-neutral-900 flex flex-1 ">
              <textarea
                value={about}
                id="about"
                name="about"
                contentEditable={false}
                placeholder={aboutPlaceholder}
                onChange={(e) => setAbout(e.target.value)}
                className="text-opacity flex-1 p-2  bg-neutral-900 min-h-[140px] max-h-[140px] md:min-h-[200px] md:max-h-[300px] scrollbar-hide border border-neutral-800 outline-none  rounded-2xl"
              />
            </div>
          </label>
          <Button
            onClick={handleSubmit}
            variant="opacity"
            className="text-lg"
            size="lg"
            roundedValue="md"
          >
            Salvar
          </Button>
        </div>
      </ModalWrapper>
    </>
  );
}

export default UserUpdateModal;
