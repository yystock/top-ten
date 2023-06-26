"use client";
import { FC, useEffect } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import { usePathname } from "next/navigation";

const page: FC = () => {
  const pathname = usePathname();
  const loginModal = useLoginModal();

  useEffect(() => {
    if (pathname == "/login" && !loginModal.isOpen) {
      loginModal.onOpen();
    }

    return () => loginModal.onClose();
  }, [pathname]);

  return null;
};

export default page;
