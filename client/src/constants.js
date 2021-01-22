const development = false;
export const URL = {
  dev: "http://localhost:5000",
  prod: "https://human-resource-backend.herokuapp.com",
  use: development ? "http://localhost:5000" : "https://human-resource-backend.herokuapp.com",
};

export const USER_REQUESTS_TYPE = {
  BONUS: "bonus",
  PAYROLL: "payroll",
  LEAVE: "leave",
};

export const TodoItemStatus = {
  TODO : "Todo",
  DOING: "Doing",
  DONE: "Done"
}
