const {
  GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean,GraphQLNonNull, GraphQLList
} = require('graphql')
const Employee = require('../model/employee')
const Attendance = require('../model/attendance')

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
        const data = await Employee.findOne({employee_id});
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

const RootQuery = new GraphQLObjectType({
  name:"RootQuery",
  fields:() => ({
    employee:{
      name:'Employee',
      type:UserType,
      args:{
        _id:{type:GraphQLNonNull(GraphQLID)},
      },
      async resolve(_, args){
        const {_id} = args;
        const data = await Employee.findOne({_id});
        return data;
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query:RootQuery
})