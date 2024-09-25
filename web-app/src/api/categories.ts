import { Category } from "../lib/model/category";
import { getFromLocalStorage, saveToLocalStorage } from "../lib/localStorage";

const CATEGORIES_KEY = "categories";

export function getCategories(): Category[] {
  let categories: Category[] = getFromLocalStorage<Category>(CATEGORIES_KEY);
  categories = categories.map((category: Category) => Category.fromJSON(category));
  return categories.sort((a: Category, b: Category) => a.name.localeCompare(b.name));
}

export function deleteCategory(categoryId: string) {
  let categories: Category[] = getFromLocalStorage(CATEGORIES_KEY) || [];
  categories = categories.filter((category: Category) => category.id !== categoryId);
  saveToLocalStorage(CATEGORIES_KEY, categories);
}

export function putCategory(updatedCategory: Category): Category {
  let categories = getFromLocalStorage(CATEGORIES_KEY) || [];
  categories = categories.map((category: Category) =>
    category.id === updatedCategory.id ? updatedCategory : category
  );
  saveToLocalStorage(CATEGORIES_KEY, categories);
  return updatedCategory;
}

export function postCategory(newCategory: Category): Category {
  const categories = getFromLocalStorage(CATEGORIES_KEY) || [];
  categories.push(newCategory);
  saveToLocalStorage(CATEGORIES_KEY, categories);
  return newCategory;
}
