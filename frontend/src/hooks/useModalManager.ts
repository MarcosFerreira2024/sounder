import { useState } from "react";

type ModalKey = string;

function useModalManager<T extends ModalKey>() {
  const [activeModal, setActiveModal] = useState<T | null>(null);

  function open(modal: T) {
    setActiveModal(modal);
  }

  function close() {
    setActiveModal(null);
  }

  function isOpen(modal: T) {
    return activeModal === modal;
  }

  

  return {
    activeModal,
    open,
    close,
    isOpen,
  };
}

export default useModalManager;
