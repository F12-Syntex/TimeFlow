import { ObjectId } from "mongodb";
import TagItem from "./TagItem"

interface TodoItem {
    _id: ObjectId;
    user: string;
    title: string;
    description: string;
    date: Date;
    priority: string;
    completed: boolean;
    labels: [ObjectId];
}

export default TodoItem;