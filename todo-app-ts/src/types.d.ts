type AddOrEditTodo = (newTitle: string) => void;
type DeleteTodo = (id: string) => void;
type EditTodo = (id: string, newTitle: string) => void;
type CompleteTodo = (todo: Todo) => void;
type SelectOption = (id: string) => void;

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};
type SetTodos = () => void;

type GetTodos = () => void;
