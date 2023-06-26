"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const router = useRouter();
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    router.back();
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          fixed 
          inset-0 
          z-50 
          flex 
          items-center 
          justify-center 
          overflow-x-hidden 
          bg-neutral-800/70 
          outline-none
          focus:outline-none
        "
      >
        <div
          className="
          relative
          my-6
          mx-auto
          h-auto
          w-4/5
          md:w-2/5
          "
        >
          {/*content*/}
          <div
            className={`
            translate
            h-full
            duration-300
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div
              className="
              translate
              relative
              flex
              h-4/5
              w-full 
              flex-col 
              rounded-lg 
              border-0 
              bg-background
            
              shadow-lg 
              outline-none
              focus:outline-none
              md:h-auto 
              lg:h-auto
    
            "
            >
              {/*body*/}
              <div className="relative flex-auto px-8 py-3">
                <button
                  className="
                    absolute
                    right-7 
                    border-0
                    p-1
                    transition
                    hover:opacity-70
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                {body}
              </div>

              {/*footer*/}
              <div className="flex flex-col gap-2 p-4">
                <div
                  className="
                    flex 
                    w-full 
                    flex-row 
                    items-center 
                    gap-4
                    px-6
                    py-2
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button disabled={disabled} onClick={handleSecondaryAction} className="outline">
                      {secondaryActionLabel}
                    </Button>
                  )}
                  <Button disabled={disabled} onClick={handleSubmit} className="secondary w-full">
                    {actionLabel}
                  </Button>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
