type AddTodo = (input: string) => void;
type DeleteTodo = (id: string) => void;
type EditTodo = (id: string, newTitle: string) => void;
type CompleteTodo = (item: Todo) => void;

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};
type SetTodos = () => void;

type GetTodos = () => void;

type Option = {
  value: string;
  onClick: () => void;
};
