import { create } from 'zustand';

import { CreateComplaintDTO } from '@/dtos/ComplaintDTO';

type Store = {
  complaint: CreateComplaintDTO | null;
  setComplaint: (complaint: CreateComplaintDTO) => void;
};

export const useCreateComplaint = create<Store>()(set => ({
  complaint: null,
  setComplaint: complaint => set(() => ({ complaint })),
}));
