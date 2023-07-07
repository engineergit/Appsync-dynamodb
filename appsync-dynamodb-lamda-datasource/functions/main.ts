import Todo from './Todo'
import addTodo from './addTodo'
import deleteTodo from './deleteTodo'
import getTodoById from './getTodoById'
import getTodos from './getTodos'
import updateTodo from './updateTodo'
// https://youtube.com/shorts/tmOHtEHekXQ?feature=share

type AppsyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        todoId: string,
        todo: Todo
    }
}

exports.handler = async (event: AppsyncEvent) => {
    console.log('event handler: ',event)
    switch (event.info.fieldName) {
        case 'addTodo':
            return await addTodo(event.arguments.todo);
        case "getTodos":
            return await getTodos();
        case "getTodoById":
            console.log('getTodoById', event.arguments);
            return await getTodoById(event.arguments.todoId);
        case "deleteTodo":
            return await deleteTodo(event.arguments.todoId);
        case "updateTodo":
            return await updateTodo(event.arguments.todo);
        default:
            return null;
    }
}