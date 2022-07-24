import { ApolloServer, gql } from "apollo-server";

let todos = [
  {
    id: "1",
    text: "밀크티 사먹기",
    done: false,
    location: "팔공티",
  },
  {
    id: "2",
    text: "밀크티 한 잔 더먹기",
    done: true,
    location: "공차",
  },
  {
    id: "3",
    text: "밀크티 두 잔 사먹기",
    done: false,
  },
  {
    id: "4",
    text: "진주 추가하기",
    done: true,
  },
];

const typeDefs = gql`
  type Todo {
    id: String!
    text: String!
    done: Boolean!
    location: String
  }

  type Query {
    allTodos: [Todo]!
    todo(id: String!): Todo
  }
  type Mutation {
    deleteTodo(id: String!): Boolean
    addTodo(text: String!): Todo
    updateTodo(id: String!, done: Boolean!): Todo
  }
`;

const resolvers = {
  Query: {
    allTodos: () => {
      return todos;
    },
    todo: (_, { id }) => {
      return todos.find((todo) => todo.id === id);
    },
  },
  Mutation: {
    deleteTodo: (_, { id }) => {
      const todo = todos.find((todo) => todo.id === id);
      todos = todos.filter((todo) => todo.id !== id);
    },
    addTodo: (_, { text }) => {
      let newId = String(todos.length + 1);
      const newTodo = {
        id: newId,
        text: text,
        done: false,
      };
      todos.push(newTodo);
      return newTodo;
    },
    updateTodo: (_, { id, done }) => {
      let todo = todos.find((todo) => todo.id === id);
      let filteredTodo = todos.filter((todo) => todo.id !== id);
      todo = {
        ...todo,
        done: !done,
      };
      todos = filteredTodo.concat(todo);
      return todo;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
