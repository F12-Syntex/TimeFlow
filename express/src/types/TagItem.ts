import { ObjectId } from "mongodb";

interface TagItem {
  user: ObjectId;
  name: string;
  _id: ObjectId;
}

export default TagItem;
