import { ITodoData } from "./js/typings"
import TodoEvent from "./js/TodoEvent"

  ; ((doc) => {

    // 获取 input
    const oInput: HTMLInputElement = document.querySelector('input')
    const oAddBtn: HTMLButtonElement = document.querySelector('button')
    const oTodoList: HTMLElement = document.querySelector('.todo-list')

    // 模拟从后端获取的数据
    const todoData: ITodoData[] = [
      {
        id: 1,
        content: '测试TODO1',
        completed: true
      },
      {
        id: 2,
        content: '测试TODO2',
        completed: false
      },
      {
        id: 3,
        content: '测试TODO3',
        completed: false
      }
    ]

    const todoEvent: TodoEvent = new TodoEvent(todoData, oTodoList)

    // 初始化
    const init = (): void => {
      bindEvent()
    }

    // 事件监听
    function bindEvent(): void {
      oAddBtn.addEventListener('click', handlerAddBtnClick, false)
      oTodoList.addEventListener('click', handlerListClick, false)
    }

    // 添加 todo
    function handlerAddBtnClick(): void {
      const val: string = oInput.value.trim()
      if (val.length) {
        const ret = todoEvent.addTodo(<ITodoData>{
          id: Math.floor(Math.random() * 100000),
          content: val,
          completed: false
        })

        if (ret && ret === 1001) {
          alert('列表项已存在')
          return
        }

        oInput.value = ''
      }

    }

    // todo 列表内的点击事件，包括 checkbox button
    function handlerListClick(e: MouseEvent): void {
      const tar = e.target as HTMLElement
      const tagName = tar.tagName.toLocaleLowerCase() // 注意 tar.tagName 是大写，需要转成小写

      if (tagName === 'input' || tagName === 'button') {
        const id: number = parseInt(tar.dataset.id)
        switch (tagName) {
          case 'input':
            todoEvent.toggleComplete(tar, id)
            break;

          case 'button':
            todoEvent.removeTodo(tar, id)
            break;
        }
      }
    }

    init()
  })(document)