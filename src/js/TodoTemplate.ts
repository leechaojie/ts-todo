import { ITodoData } from "./typings";

class TodoTemplate {
  protected todoView(todo: ITodoData): string {
    const { id, content, completed } = todo
    return `
      <input type="checkbox" ${completed ? 'checked' : ''} data-id="${id}" />
      <span style="text-decoration: ${completed ? 'line-through' : 'none'}">${content}</span>
      <button data-id="${id}">删除</button>
    `
  }
}

export default TodoTemplate