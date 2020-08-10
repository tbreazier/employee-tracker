const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require('dotenv').config();
const sqlConnect = require('./../db/config.js');

var all = {
    displayAllDepart: (callback = () => {}) => {
        var connection = mysql.createConnection(sqlConnect);

        let query = `SELECT name FROM departments`;
        connection.query(query, function (err, res){
            if (err) throw (err);
            
            consoleTable(res);

            callback();
        });
        connection.end;
    },
};