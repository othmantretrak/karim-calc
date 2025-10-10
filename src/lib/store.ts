// lib/store.ts
import { create } from 'zustand'

interface StoreState {
  productSlug: string | null
  answers: Record<string, string | number>
  setProductSlug: (slug: string) => void
  setAnswer: (key: string, value: string | number) => void
  resetAnswers: () => void
  contactInfo: {
    email: string
    telephone: string
    surname: string
    zipCode: string
    street: string
    residence: string
  }
  setContactField: (field: string, value: string) => void
  resetContactInfo: () => void
  uploadedImages: string[]
  setUploadedImages: (images: string[]) => void
  addUploadedImage: (image: string) => void
  comments: string
  setComments: (c: string) => void
  showThankYou: boolean
  setShowThankYou: (v: boolean) => void
}

const useStore = create<StoreState>((set) => ({
  productSlug: null,
  answers: {},
  setProductSlug: (slug) => set({ productSlug: slug, answers: {} }),
  setAnswer: (key, value) =>
    set((state) => ({
      answers: { ...state.answers, [key]: value }
    })),
  resetAnswers: () => set({ answers: {} }),
  contactInfo: {
    email: '',
    telephone: '',
    surname: '',
    zipCode: '',
    street: '',
    residence: '',
  },
  setContactField: (field, value) =>
    set((state) => ({ contactInfo: { ...state.contactInfo, [field]: value } })),
  resetContactInfo: () =>
    set({ contactInfo: { email: '', telephone: '', surname: '', zipCode: '', street: '', residence: '' } }),
  uploadedImages: [],
  setUploadedImages: (images) => set({ uploadedImages: images }),
  addUploadedImage: (image) => set((s) => ({ uploadedImages: [...s.uploadedImages, image] })),
  comments: '',
  setComments: (c) => set({ comments: c }),
  showThankYou: false,
  setShowThankYou: (v) => set({ showThankYou: v }),
}))

export default useStore