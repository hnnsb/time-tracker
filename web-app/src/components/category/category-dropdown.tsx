import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import CategoryCard from '@/components/category/category-card';
import { Category } from '@/lib/model/category';

interface CategoryDropdownProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}

export default function CategoryDropdown({categories, onEdit, onDelete}: Readonly<CategoryDropdownProps>) {
    return (
        <DropdownButton className="m-1" id="dropdown-basic" title="Edit Categories">
            {categories.map((category) => (
                <Dropdown.Item key={category.id}>
                    <div className="d-flex justify-content-between align-items-center">
                        <span>{category.name}</span>
                        <CategoryCard
                            category={category}
                            onEdit={() => onEdit(category)}
                            onDelete={() => onDelete(category)}
                        />
                    </div>
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
};
