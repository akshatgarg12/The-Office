const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const Employee = require("../model/employee");
const Attendance = require("../model/attendance");
const Request = require("../model/request");
const Post = require("../model/post");
const KanbanBoard = require("../model/kanbanBoard");

const dateConverter = (time) => {
  let date_ob = new Date(time);

  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();
  return date + "/" + month + "/" + year;
};

// user/employee types

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: {
      type: GraphQLString,
      resolve(parent, _) {
        return parent.firstName + " " + parent.lastName;
      },
    },
    email: { type: GraphQLString },
    department: { type: GraphQLString },
    position: { type: GraphQLString },
    branch: { type: GraphQLString },
    salary: { type: GraphQLString },
    img: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    dob: {
      type: GraphQLString,
      resolve(parent, _) {
        return parent.dob.toLocaleDateString();
      },
    },
    presentDates: {
      type: GraphQLList(AttendanceType),
      async resolve(parent, _) {
        const { _id } = parent;
        const data = await Attendance.find({
          employee_id: _id,
          type: "present",
        });
        return data;
      },
    },
    absentDates: {
      type: GraphQLList(AttendanceType),
      async resolve(parent, _) {
        const { _id } = parent;
        const data = await Attendance.find({
          employee_id: _id,
          type: "absent",
        });
        return data;
      },
    },
  }),
});

// attendance types
const AttendanceType = new GraphQLObjectType({
  name: "Attendance",
  fields: () => ({
    _id: { type: GraphQLID },
    employee: {
      type: UserType,
      async resolve(parent, _) {
        const { employee_id } = parent;
        const data = await Employee.findOne({ _id: employee_id });
        return data;
      },
    },
    date: {
      type: GraphQLString,
      resolve(parent, _) {
        return parent.date.toLocaleDateString();
      },
    },
    type: {
      type: GraphQLString,
    },
  }),
});
// request types
const LeaveRequestDateType = new GraphQLObjectType({
  name: "dates",
  fields: () => ({
    startDate: {
      type: GraphQLString,
      resolve(parent, _) {
        if (parent && parent.length) {
          return dateConverter(parent[0]);
        }
        return null;
      },
    },
    endDate: {
      type: GraphQLString,
      resolve(parent, _) {
        if (parent && parent.length) {
          return dateConverter(parent[parent.length - 1]);
        }
        return null;
      },
    },
  }),
});
const RequestDataType = new GraphQLObjectType({
  name: "RequestData",
  fields: () => ({
    amount: {
      type: GraphQLInt,
    },
    dates: {
      type: LeaveRequestDateType,
    },
    message: {
      type: GraphQLNonNull(GraphQLString),
    },
  }),
});

const RequestType = new GraphQLObjectType({
  name: "Request",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLNonNull(GraphQLString) },
    employee: {
      type: UserType,
      async resolve(parent, _) {
        const user = await Employee.findOne({ _id: parent.employee_id });
        return user;
      },
    },
    data: {
      type: RequestDataType,
    },
    type: { type: GraphQLNonNull(GraphQLString) },
    resolved_by: {
      type: UserType,
      async resolve(parent, _) {
        const { resolved_by } = parent;
        if (resolved_by) {
          const data = await Employee.findOne({ _id: resolved_by });
          return data;
        }
        return null;
      },
    },
  }),
});

// posts
const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    _id: {
      type: GraphQLString,
    },
    html: {
      type: GraphQLString,
    },
    img: {
      type: GraphQLString,
    },
    created_by: {
      type: UserType,
      async resolve(parent, _) {
        const { created_by } = parent;
        const employee = await Employee.findOne({ _id: created_by });
        return employee;
      },
    },
  }),
});

// Kanban Board Types
const KanbanItemType = new GraphQLObjectType({
  name:'KanbanItem',
  fields:() => ({
    _id: {
      type: GraphQLString,
    },
    text: {
      type: GraphQLString,
    },
    employee: {
      type: UserType,
      async resolve(parent, _){
        const { employee_id } = parent;
        const employee = await Employee.findOne({ _id: employee_id });
        return employee;
      }
    },
    section: {
      type:GraphQLString
    },
    status:{
      type:GraphQLString
    }
  })
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    employee: {
      name: "Employee",
      type: UserType,
      args: {
        _id: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        const { _id } = args;
        const data = await Employee.findOne({ _id });
        return data;
      },
    },
    employees: {
      name: "Employees",
      type: GraphQLList(UserType),
      async resolve(_, __) {
        const data = await Employee.find({});
        return data;
      },
    },
    requests: {
      name: "Requests",
      type: GraphQLList(RequestType),
      args: {
        _id: { type: GraphQLString },
        employee_id: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      async resolve(_, args) {
        const data = await Request.find({ ...args }).sort({
          createdAt: "descending",
        });
        return data;
      },
    },
    posts: {
      name: "Posts",
      type: GraphQLList(PostType),
      args: {
        _id: { type: GraphQLString },
      },
      async resolve(_, args) {
        const data = await Post.find({ ...args }).sort({
          createdAt: "descending",
        });
        return data;
      },
    },
    kanbanItems:{
      name:'Kanban',
      type:GraphQLList(KanbanItemType),
      args:{
        section: {type:GraphQLNonNull(GraphQLString)},
      },
      async resolve(_, args){
        const data = await KanbanBoard.find({ ...args }).sort({
          createdAt:"descending",
        })
        return data;
      }
    }
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
