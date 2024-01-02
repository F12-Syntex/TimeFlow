import { ObjectId } from 'mongodb';

interface TagItem {
    name: string;
    _id: ObjectId;
}

export default TagItem;