import { Category } from "@/lib/model/category";
import { FaPen, FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";

interface CategoryCardProps {
    category: Category;
    onDelete: any;
    onEdit: any;
}

export default function CategoryCard({ category, onDelete, onEdit }: Readonly<CategoryCardProps>) {
    return (
        <div className="flex justify-between category-card">
            <div className="flex mx-1 my-auto">
                <div className="m-auto rounded-circle w-6 h-6" style={{ backgroundColor: category.color }}></div>
                <p className="m-auto p-1 font-semibold">{category.name}</p>
            </div>
            <div className="flex my-auto category-card-buttons">
                <Button className="p-2 m-1" onClick={onEdit}><FaPen /></Button>
                <Button variant="danger" className="p-2 m-1" onClick={onDelete}><FaTrash /></Button>
            </div>
        </div>
    );
}