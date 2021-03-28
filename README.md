<h1 text-align = "center">THE OFFICE : HUMAN RESOURCE MANAGEMENT APP💼</h1>

<p>
  A solution provided for a fullstack web development hackathon <a href="https://www.hackerearth.com/challenges/hackathon/stackhack-20/">Stack-hack 2.0</a> 
  organised by <a href="https://www.hackerearth.com">Hackerearth</a>. A Human 
  Resource Management App, which covers all the tasks that a corporate might need in their HR app to make their life easier.
</p>

## Tech Stack ⚔
<ul>
  <li>React JS with Semantic UI for Frontend</li>
  <li>Node JS with express for Server</li>
  <li>GraphQL</li>
  <li>Mongo DB as the primary database</li>
</ul>

## To run locally:
### Server
```
  cd server
  npm install 
  nodemon server.js
```

### Client
```
  cd client
  npm install 
  npm start
```
## Application Architecture⛄️:
<p>The application has a client -server model, which handles mutation mostly using REST Api, whereas the read operations/queries are mostly written and handled
using graphQL</p>

## Application Working☸️:
<p>
 The application is wrapped with user-authentication and renders pages based on users role and permissions.
 the admin page is only accessible by admins and also the kanban board of a particular department is accessible by employee of the department.
 Try accessing '/admin' from a regular employee account.
</p>

### Workforce🦾:
<p>
 The workforce is divided into three departments which is further divided into three positions.
 
 departments: 
 
 <ol>
  <li>Finance</li>
  <li>Sales</li>
  <li>Management</li>
 </ol>
 
 Positions: 
 
 <ol>
  <li>Regular</li>
  <li>Manager</li>
  <li>Intern</li>
 </ol>
</p>

User Roles: 
 
 <ol>
  <li>Regular</li>
  <li>Admin</li>
 </ol>
</p>

## Components of Application🐳

### A. Attendance management 📅: 
<p>
Employees can mark their attendance as present and absent from their dashboard, this attendance is stored in database with the current date and the
type as "absent" or "present". The attendance calender is also manipulated by the request handler. Whenever an employees leave request gets accepted,
that employee is automatically marked absent for the requested dates.
</p>

### B. Request Creation 👨🏻‍💻: 
<p>
Employees can create requests for <em>leave</em>, <em>payroll</em> and <em>bonus</em>. Moreover the employee has the control to monitor his/her request status 
at their dashboard and they can also take it back. Only the admins have the privilege of resolving the requests.  
</p>

### C. Request Resolving 💯: 
<p>
Requests Created by employees are sent to the request container in the admin panel where the admin has the privilege to accept/delete the requests.
On accepting the requests it will have direct imapct on the user's data. for eg: if a leave request is accepted the employee is marked absent.
If the bonus request is accepted the employee's salary is increased.
Only the admins have this privilege of resolving request.
</p>

### D. Discussion Page 📣: 
<p>
Any important announcement in the office can be posted in the discussion page accessible by everyone. Only the admin has the right to create/ delete posts
for the discussion page directly from the admin panel. Moreover the admin can create posts with images and rich text(bold, italic, etc..) and can preview 
them before posting them.
</p>

### E. Kanban Board 📝: 
<p>
Kanban Board is extensively used in a corporate world/ offices. It helps in organising tasks and goals for the future. The application provides the employees
with kanban boards for indivisual departments. Each department like finance, management and sales have their own Kanban Board which is accessible only by the
members of that department.
Only the admins have the privilege to read all the kanban boards.
The Kanban Board has three section : todo, doing, done. These sections represents the state of a task, employees can add new task or delete them or they 
can change the status of an existing task in realtime.
</p>

### F. Create a new Employee 👨🏼‍🎓: 
<p>
Admins have the privilege to create a new employee using a form in admin panel. The form provides with complete validation and preview as well.
After an employee is created the credential to login are automatically generated. the email is what is entered by the admin and the password is the 
firstName + lastName.length
</p>

### G. Search page 🔎: 
<p>
You can find or search any employee based on department, name, position in the search page. You can also click on h=show profile to see their attendance and 
basic info.
Admins also get the option to delete the employees from the search page.
</p>

## Deployment 🚀:
<p>Backend is deployed to Heroku</p>
<p>Frontend is deployed to Vercel</p>
<p>Database service : MongoDB atlas</p>

video : <a href="https://www.youtube.com/watch?v=q0KDqRb581o&feature=youtu.be">Youtube</a>
