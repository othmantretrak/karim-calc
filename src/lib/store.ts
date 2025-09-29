// store.ts
import { create } from 'zustand'

interface Selection {
  productSlug: string
  attributes: Record<string, string>
  variationId?: string
}

interface StoreState {
  selection: Selection
  setSelection: (selection: Selection | ((prev: Selection) => Selection)) => void
  resetStore: () => void
}

const useStore = create<StoreState>((set) => ({
  selection: { productSlug: '', attributes: {}, variationId: undefined },
  setSelection: (selection) =>
    set((state) => ({
      selection:
        typeof selection === 'function'
          ? selection(state.selection)
          : { ...state.selection, ...selection },
    })),
  resetStore: () => set({ selection: { productSlug: '', attributes: {}, variationId: undefined } }),
}))

export default useStore