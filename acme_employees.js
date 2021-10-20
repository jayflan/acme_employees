const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
const findEmployeeByName = (strName, arrEmployees) => {
  return arrEmployees.reduce((newObj, currEmployee) => {
    if(currEmployee['name'] === strName) {
      newObj['id'] = currEmployee['id'];
      newObj['name'] = currEmployee['name']; 
    }
    return newObj;
  }, {});
}
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep Jr.')
//given an employee and a list of employees, return the employee who is the manager
const findManagerFor = (callBackFn, arrEmployees) => {
  let findMgrId = arrEmployees.find((currEmployee) => {
    if(currEmployee['name'] === callBackFn['name']) return currEmployee;
  });
  let resultMgr = arrEmployees.find((currEmployee) => {
    if(currEmployee['id'] === findMgrId['managerId']) return currEmployee;
  });
  return resultMgr;
  
}
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
const findCoworkersFor = (callBackFn, arr) => {
  return arr.reduce((accum, currElem) => {
    if(findManagerFor(callBackFn, arr).id === currElem.managerId && callBackFn.name !== currElem.name) accum.push(currElem);
    return accum;
  },[])
}
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
const findManagementChainForEmployee = (callBackFn, arr) => {
  
  let result = [];

  let currEmployeeMgrId =  arr.find((employee) => {
    if(employee.id === callBackFn.id) return employee;
  });
  
  if(!currEmployeeMgrId.managerId) return result;

  result = arr.reduce((accum, currEmployee) => {
    if(currEmployeeMgrId.managerId === currEmployee.id) {
      accum.unshift(currEmployee);
      currEmployeeMgrId = currEmployee;
    }
    return accum;
  },[]);
  
  return findManagementChainForEmployee(currEmployeeMgrId, arr).concat(result);
}
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
const generateManagementTree = (employees) => {
  let result = {};

  const manager = employees.find((currEmployee) => {
    if(!currEmployee.managerId) {
      const reportManager = currEmployee;
      reportManager.reports = [];
      return reportManager;
    } 
  });

  const directReport = employees.find((currEmployee) => {
        if(currEmployee.managerId === manager.id) {
          const reportEmployee = currEmployee;
          reportEmployee.reports = [];
          return reportEmployee;
        }
      });
console.log(manager);
console.log(directReport);




  //   let manager = employees.find((currEmployee) => !currEmployee.managerId);

//   if(!manager) return result;

//   manager.reports = [];

//   const directReport = employees.find((currEmployee) => {
//     if(currEmployee.managerId === manager.id) {
//       let reportEmployee = currEmployee;
//       reportEmployee.reports = [];
//       return reportEmployee;
//     }
//   });

//   manager.reports.push(directReport);

//   result = manager;
//   manager = directReport;

//   // console.log(result)
//   // console.log(manager)

//   // return generateManagementTree(directReport);
//   return result;
  
}
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
const displayManagementTree = (callBackFn) => {

}
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/