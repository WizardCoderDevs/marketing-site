'use client';

import ContactFormModal from '@/components/ContactFormModal';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface ContactFormContextValue {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

const ContactFormContext = createContext<ContactFormContextValue | undefined>(undefined);

export function ContactFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      openForm,
      closeForm,
    }),
    [closeForm, isOpen, openForm],
  );

  return (
    <ContactFormContext.Provider value={value}>
      {children}
      <ContactFormModal isOpen={isOpen} onClose={closeForm} />
    </ContactFormContext.Provider>
  );
}

export function useContactForm() {
  return useContext(ContactFormContext);
}

