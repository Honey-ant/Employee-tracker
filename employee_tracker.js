const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    //The port used locally to listen to it
    port: 3308,

    //The username used for mySQL
    user: 'root',

    //password for mySQL
    password: 'rootroot',
    database: 'employee-tracker',
});

//if the local host is connected without errors, runSearch function will activate
connection.connect((err) => {
    if (err) throw err;
    //Main function used to search through the employees data
    runSearch();
});

const runSearch = () => {
    inquirer
    .prompt({
        name: 'action',
        typ: 'list',
        message: 'What would you like to do?',
        choices: [
            'View employees',
            'View departments',
            'View the roles',
            'Update Employees',
            'Update departments',
            'Update Roles',
            'exit',
        ],
    })
    //All of the options with their functions so they operate
    .then ((answer) => {
        switch (answer.action) {
            case 'View employees':
                employeeSearch();
                break;

            case 'View departments':
                departmentSearch();
                break;
            
            case 'View the roles':
                roleSearch();
                break;

            case 'Update Employees':
                employeeUpdate();
                break;
            
            case 'Update departments':
                departmentUpdate();
                break;

            case 'Update Roles':
                roleUpdate();
                break;

            case 'exit':
                connection.end();
                break;
            //If the action used is invaild a message will appear saying so 
            default:
                console.log(`Invaild action: ${answer.action}`);
                break;
        }
    });
};

const employeeSearch = () => {
    const query = 
    'SELECT employee FROM employee GROUP';
    connection.query(query, (err, res) => {
        res.forEach(({ employee }) => console.log(employee));
        runSearch();
    });
};

const departmentSearch = () => {
    const query = 
    'SELECT department FROM department GROUP';
    connection.query(query, (err, res) => {
        res.forEach(({ department }) => console.log(department));
        runSearch();
    });
};

const roleSearch = () => {
    const query = 
    'SELECT role FROM role GROUP';
    connection.query(query, (err, res) => {
        res.forEach(({ role }) => console.log(department));
        runSearch();
    });
};

const employeeUpdate = () => {
    inquirer
    .prompt({
        name:'employeeUpdate',
        type: 'input',
        message: 'Which employee would you like to Update?',
    })
};

const departmentUpdate = () => {
    inquirer
    .prompt({
        name: 'departmentUpdate',
        type: 'input',
        message: 'Which department would you like to update?',
    })
};

const roleUpdate = () => {
    inquirer
    .prompt({
        name:'roleUpdate',
        type:'input',
        message: 'Which Role woudld you like to add to the database?',
    })
};