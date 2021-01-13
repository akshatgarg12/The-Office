const {
  GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean,GraphQLNonNull, GraphQLList, GraphQLInputObjectType, GraphQLInt
} = require('graphql')
const Employee = require('../model/employee')
const Attendance = require('../model/attendance')
const Request = require('../model/request')

const UserType = new GraphQLObjectType({
  name:'User',
  fields:()=>({
    _id:{type:GraphQLID},
    name:{
      type:GraphQLString,
      resolve(parent, _){
        return parent.firstName + " " + parent.lastName;
      }
    },
    email:{type:GraphQLString},
    department:{type:GraphQLString},
    position:{type:GraphQLString},
    branch:{type:GraphQLString},
    salary:{type:GraphQLString},
    img:{type:GraphQLString},
    isAdmin:{type:GraphQLBoolean},
    dob:{
      type:GraphQLString,
      resolve(parent, _){
        return parent.dob.toLocaleDateString();
      }
    },
    presentDates:{
      type:GraphQLList(AttendanceType),
      async resolve(parent, _){
        const {_id} = parent
        const data = await Attendance.find({employee_id : _id, type:'present'})
        return data
      }
    },
    absentDates:{
      type:GraphQLList(AttendanceType),
      async resolve(parent, _){
        const {_id} = parent
        const data = await Attendance.find({employee_id : _id, type:'absent'})
        return data
      }
    }
  })
})


const AttendanceType = new GraphQLObjectType({
  name:'Attendance',
  fields: () => ({
    _id:{type:GraphQLID},
    employee:{
      type:UserType,
      async resolve(parent, _){
        const {employee_id} = parent;
        const data = await Employee.findOne({_id:employee_id});
        return data;
      }
    },
    date:{
      type:GraphQLString,
      resolve(parent, _){
        return parent.date.toLocaleDateString();
      }
    },
    type:{
      type:GraphQLString
    }
  })
});

const RequestDataType = new GraphQLObjectType({
  name:'RequestData',
  fields: () => ({
    amount:{
      type:GraphQLInt
    },
    dates:{
      type:GraphQLList(GraphQLString)
    },
    message:{
      type:GraphQLNonNull(GraphQLString)
    }
  })
})


const RequestType = new GraphQLObjectType({
  name:'Request',
  fields:() => ({
    _id:{type:GraphQLNonNull(GraphQLString)},
    status:{type:GraphQLNonNull(GraphQLString)},
    employee:{
      type:UserType,
      async resolve(parent, _){
        const user = await Employee.findOne({_id: parent.employee_id})
        return user
      }
    },
    data:{
      type:RequestDataType
    },
    type:{type:GraphQLNonNull(GraphQLString)},
  })
})


const RootQuery = new GraphQLObjectType({
  name:"RootQuery",
  fields:() => ({
    employee:{
      name:'Employee',
      type:UserType,
      args:{
        _id:{type:GraphQLNonNull(GraphQLString)},
      },
      async resolve(_, args){
        const {_id} = args;
        const data = await Employee.findOne({_id});
        return data;
      }
    },
    requests:{
      name:'Requests',
      type:GraphQLList(RequestType),
      args:{
        _id:{type:GraphQLString},
        employee_id:{type:GraphQLString},
        status:{type:GraphQLString},
      },
      async resolve(_, args){
        // const {_id, employee_id, status} = args
        var data = await Request.find({...args});
        return data;
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query:RootQuery
})