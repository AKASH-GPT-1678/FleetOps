"use client"
import React from "react";
import { createContext } from "react";
interface RegistrationContextType {
  showRegistrationForm: boolean;
  setShowRegistrationForm: (show: boolean) => void;
  toggleRegistrationForm: () => void;
}

// Create the context with undefined as default (we'll handle this in the hook)
const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

// Props for the provider component
interface RegistrationProviderProps {
  children: React.ReactNode;
}

// Provider component
export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children }) => {
  const [showRegistrationForm, setShowRegistrationForm] = React.useState<boolean>(false);

  // Helper function to toggle the form visibility
  const toggleRegistrationForm = () => {
    setShowRegistrationForm(prev => !prev);
  };

  const value: RegistrationContextType = {
    showRegistrationForm,
    setShowRegistrationForm,
    toggleRegistrationForm,
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = (): RegistrationContextType => {
  const context = React.useContext(RegistrationContext);
  
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  
  return context;
};