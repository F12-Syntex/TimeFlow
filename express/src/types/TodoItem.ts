import { ObjectId } from "mongodb";
import TagItem from "./TagItem"

interface TodoItem {
    _id: ObjectId;
    user: ObjectId;
    title: string;
    description: string;
    date: Date;
    priority: string;
    completed: boolean;
    labels: [ObjectId];
}

export default TodoItem;