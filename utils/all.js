const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require('dotenv').config();
const sqlConnect = require('./../db/config.js');

var all = {
    displayAll: (callback = () => {}) => {
        var connection = mysql.createConnection(sqlConnect);

        let query = `SELECT * FROM employees`;
        connection.query(query, function (err, res){
            if (err) throw (err);
            
            consoleTable(res);

            callback();
        });
        connection.end;
    },
};

module.exports = all;


