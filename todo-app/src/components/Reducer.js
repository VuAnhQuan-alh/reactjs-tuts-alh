import axios from 'axios';

let initialStore = {
  isOpen: true,
  list: [
    {
      _id: 1,
      name: "Coding",
      complete: false
    }
  ]
}
var idx = 1;

const axiosClient = axios.create({
  baseURL: "http://localhost:1211/api",
  headers: {
    'Content-type': 'application/json',
  }
});

const todoAPI = {
  list() {
    // const url;
  }
}

const Reducer = (state = initialStore, actions) => {
  switch (actions.type) {
    case "create":
      return {
        ...state,
        list: [
          ...state.list,
          {
            _id: ++idx,
            name: actions.todo.name,
            complete: false
          }
        ]
      };
    case "update":
      const todoU = state.list.map(item => {
        if (item._id === actions.todo.id)
          item.name = actions.todo.name;
        return item;
      });
      return {
        ...state,
        list: todoU
      };
    case "delete":
      const newState = state.list.filter(item => item.complete === false);
      return {
        ...state,
        list: newState
      };
    case 'completed':
      const todoC = state.list.map(item => {
        if (item._id === actions.todo.id)
          item.complete = actions.check;
        return item;
      });
      return {
        ...state,
        list: todoC
      };
    case "completeAll":
      let nState = [];
      if (!actions.check) {
        nState = state.list.map(item => {
          if (item.complete === false)
            item.complete = !actions.check;
          return item;
        });
      } else {
        nState = state.list.map(item => {
          item.complete = false;
          return item;
        });
      }
      return {
        ...state,
        list: nState
      };
    default:
      return state;
  }
}

export default Reducer;