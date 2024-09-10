import {Category} from "@/lib/model/category";
import {FaPen, FaTrash} from "react-icons/fa";

interface CategoryCardProps {
    category: Category;
    onDelete: any;
    onEdit: any;

}

export default function CategoryCard({category, onDelete, onEdit}: Readonly<CategoryCardProps>) {
    return (<div>
        <div style={{backgroundColor: category.color, width: '20px', height: '20px'}}></div>
        <button onClick={onEdit}><FaPen/></button>
        <button onClick={onDelete}><FaTrash/></button>
    </div>);
}