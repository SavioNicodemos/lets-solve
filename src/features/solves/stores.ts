import { create } from 'zustand';
import { CreateComplaintDTO } from './types';

type Store = {
  complaint: CreateComplaintDTO | null;
  setComplaint: (complaint: CreateComplaintDTO) => void;
};

export const useCreateMultiStepComplaintStore = create<Store>()(set => ({
  complaint: null,
  setComplaint: complaint => set(() => ({ complaint })),
}));
