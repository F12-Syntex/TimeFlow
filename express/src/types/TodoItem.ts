import TagItem from "./TagItem"
interface TodoItem {
    title: string
    description: string
    date: Date
    priority: string
    labels: TagItem[]
    completed: boolean
    id: number
}

export default TodoItem