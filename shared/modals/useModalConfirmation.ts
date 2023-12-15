import type { Ref } from "vue";

export default function useModalConfirmation() {
  let modalConfirmationDialog: Ref<HTMLDialogElement | null> = ref(null);

  const initModal = (modalRef: Ref<HTMLDialogElement>) => {
    console.log("modalRef", modalRef);
    modalConfirmationDialog = modalRef;
  };

  const closeModal = () => {
    if (modalConfirmationDialog.value == null) {
      return false;
    }
    modalConfirmationDialog.value!.close();
    return true;
  };

  const openModal = () => {
    if (modalConfirmationDialog.value == null) {
      return false;
    }
    modalConfirmationDialog.value!.showModal();
    return true;
  };

  onBeforeUnmount(() => {
    closeModal();
    modalConfirmationDialog.value = null;
  });

  return { handleInitModal: initModal, closeModal, openModal };
}
