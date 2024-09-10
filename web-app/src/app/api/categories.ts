import { Category } from "@/lib/model/category";

const categoryUrl = "http://localhost:8080/api/categories";

export async function getCategories(email: string): Promise<Category[]> {
    const response = await fetch(`${categoryUrl}?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const categories = await response.json();
        return categories.sort((a: Category, b: Category) => a.name.localeCompare(b.name));
    }
    throw new Error(`HTTP error! status: ${response.status}`);
}

export async function deleteCategory(categoryId: string): Promise<void> {
    const response = await fetch(`${categoryUrl}/${categoryId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

export async function putCategory(updatedCategory: Category): Promise<Category> {
    const response = await fetch(categoryUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategory),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export async function postCategory(newCategory: Category): Promise<Category> {
    const response = await fetch(categoryUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}