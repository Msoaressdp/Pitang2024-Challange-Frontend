export interface Appointment {
    name: string;
    birthDate: Date;
    scheduledDate: Date;
    id?: string;
    situation: string;
    conclusion?: string;
  }

export interface AppointmentItemProps {
    appointment: Appointment;
    editMode: boolean;
    editedConclusion: string;
    onCheckboxChange: (id: string, situation: string) => void;
    onEditClick: (id: string) => void;
    onSaveClick: (id: string) => void;
    onConclusionChange: (id: string, value: string) => void;
    onDeleteClick: (id: string) => void;
  }

export interface AppointmentGroupProps {
  date: string;
  appointments: Appointment[];
  editMode: { [key: string]: boolean };
  editedConclusion: { [key: string]: string };
  onCheckboxChange: (id: string, situation: string) => void;
  onEditClick: (id: string) => void;
  onSaveClick: (id: string) => void;
  onConclusionChange: (id: string, value: string) => void;
  onDeleteClick: (id: string) => void;
  }

export interface ModalContextProps {
  isOpen: boolean;
  message: string;
  showModal: (msg: string) => void;
  closeModal: () => void;
}

import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

export interface UseFormStateReturn {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  birthDate: Date | null;
  setBirthDate: React.Dispatch<React.SetStateAction<Date | null>>;
  scheduledDate: Date | null;
  setScheduledDate: React.Dispatch<React.SetStateAction<Date | null>>;
  resetForm: () => void;
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;  
  control: Control<any>;  
  errors: FieldErrors<any>;  
}

export interface EditMode {
  [key: string]: boolean;
}

export interface EditedConclusion {
  [key: string]: string;
}