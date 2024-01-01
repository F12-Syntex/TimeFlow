interface TodoItem {
    title: string
    description: string
    date: Date
    priority: string
    labels: string[]
    completed: boolean
    id: number
}

export default TodoItem