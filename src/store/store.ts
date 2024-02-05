import { create } from 'zustand'
import { IApifilters } from "../api/api";

interface Recipe {
  id: string;
  label: string;
  calories: string;
  image: string;
  healthLabels: Array<string>;
  dietLabels: Array<string>;
}

interface BookmarkStore {
  recipes: Recipe[]
  addRecipe: (item: Recipe) => void
  removeRecipe: (item: Recipe) => void
}

interface FilterStore {
  value: string;
  filters: IApifilters
  updateStore: (filters: IApifilters, value: string) => void
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  recipes: [],
  addRecipe: (item: Recipe) => set((state) => ({ recipes: [...state.recipes, item] })),
  removeRecipe: (item: Recipe) => set((state) => ({ recipes: state.recipes.filter((i) => i.label !== item.label) })),
}));

export const usefilterStore = create<FilterStore>((set) => ({
  filters: {},
  value: '',
  updateStore: (filters: IApifilters, value: string) => set(() => ({ filters, value })),
}));

