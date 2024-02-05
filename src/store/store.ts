import { create } from 'zustand'
import { IApifilters } from "../api/api";

export interface IRecipe {
  id: string;
  label: string;
  calories: string;
  image: string;
  healthLabels: Array<string>;
  dietLabels: Array<string>;
  ingredientLines: Array<string>;
}

interface BookmarkStore {
  recipes: IRecipe[]
  addRecipe: (item: IRecipe) => void
  removeRecipe: (item: IRecipe) => void
}

interface FilterStore {
  value: string;
  filters: IApifilters
  updateStore: (filters: IApifilters, value: string) => void
}

/** Used to Store Bookmarked Recipes */
export const useBookmarkStore = create<BookmarkStore>((set) => ({
  recipes: [],
  addRecipe: (item: IRecipe) => set((state) => ({ recipes: [...state.recipes, item] })),
  removeRecipe: (item: IRecipe) => set((state) => ({ recipes: state.recipes.filter((i) => i.label !== item.label) })),
}));

/** Used to Store Recipes Filters */
export const usefilterStore = create<FilterStore>((set) => ({
  filters: {},
  value: '',
  updateStore: (filters: IApifilters, value: string) => set(() => ({ filters, value })),
}));

