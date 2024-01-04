import { ObjectId } from 'mongodb';
import TagItem from './TagItem';

interface TodoItemWithTags {
    _id: ObjectId;
    user: string;
    title: string;
    description: string;
    date: Date;
    priority: string;
    completed: boolean;
    labels: TagItem[];
}

export default TodoItemWithTags;