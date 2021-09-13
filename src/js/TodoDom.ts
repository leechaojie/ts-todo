import TodoTemplate from "./TodoTemplate"
import { ITodoData } from "./typings"
import { createItem, findParentNode } from "./utils"

class TodoDom extends TodoTemplate {
  private todoWrapper: HTMLElement

  constructor(todoWrapper: HTMLElement) {
    super()
    this.todoWrapper = todoWrapper
  }

  protected initList(todoData: ITodoData[]) {
    if (todoData.length) {
      // 生命文档碎片
      const oFrag: DocumentFragment = document.createDocumentFragment();
      todoData.map((todo: ITodoData) => {
        const oItem: HTMLElement = createItem('div', 'todo-item', this.todoView(todo))
        oFrag.appendChild(oItem)
      })
      this.todoWrapper.appendChild(oFrag)
    }
  }

  protected addItem(todo: ITodoData) {
    const oItem: HTMLElement = createItem('div', 'todo-item', this.todoView(todo))
    this.todoWrapper.appendChild(oItem)
    console.log(this.todoWrapper);
    
  }

  protected removeItem(target: HTMLElement) {
    const oParentNode: HTMLElement = findParentNode(target, 'todo-item')
    oParentNode.remove()
  }

  protected changeCompleted(target: HTMLElement, completed: boolean) {
    const oParentNode: HTMLElement = findParentNode(target, 'todo-item')
    const oContent: HTMLElement = oParentNode.querySelector('span')
    oContent.style.textDecoration = completed ? 'line-through' : 'none'
  }
}

export default TodoDom