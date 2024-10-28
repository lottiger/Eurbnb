import React, { useEffect, useRef } from 'react';
import { SignInButton } from '@clerk/nextjs';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-lg w-[555px] h-[247px] text-center flex items-center justify-center flex-col">
        
        <p className="text-[16px] font-semibold">Du måste vara inloggad för att spara boendet</p>
        
        <SignInButton mode="modal" redirectUrl="/">
          <button className="mt-4 text-[16px] px-[20px] w-[192px] h-[46px] bg-[#1E3E62] text-white rounded-lg hover:bg-[#2A4F7A]">
            Logga in
          </button>
        </SignInButton>
        
       
      </div>
    </div>
  );
};

export default AuthModal;
