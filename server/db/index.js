const mysql = require('mysql');
const config = require('../config');


const pool =  mysql.createPool(config.mysqlInfo);


let SQLstate = {};
SQLstate.tableName = "";

SQLstate.all = () => {
    if( SQLstate.tableName != ""){
        return new Promise((resolve, reject) => {
            pool.query('Select * from ' + SQLstate.tableName + ';', (err, results) => {
                if(err){
                    return reject(err);
                }
    
                return resolve(results);
            });
        })
    }

    throw "ERROR Table Name is null " +  SQLstate.tableName;
    
};

SQLstate.getById = (id) => {
    if( SQLstate.tableName != null){
        
        return new Promise((resolve, reject) => {
            pool.query('Select * From ' +  SQLstate.tableName + " WHERE id = " + id, (err, results) => {
                if(err){
                    return reject(err);
                }
    
                return resolve(results);
            });
        })
        
    }
    throw "ERROR Table Name is null GetById " + SQLstate.tableName; 
}

SQLstate.getMany = (columnName, searchWord) => {
    if( SQLstate.tableName != null){
        return new Promise((resolve, reject) =>{
            pool.query("Select * From " + SQLstate.tableName + " Where " + columnName +
            " = '" + searchWord + "'", (err, results) => {
                if(err){
                    return reject(err);
                }
    
                return resolve(results);
            });
        });
    }
    throw "ERROR Table Name is null " + SQLstate.tableName;
}

SQLstate.insert = ( ModelData ) => {
    if( SQLstate.tableName != null){
        return new Promise((resolve, reject) =>{
            pool.query("INSERT INTO " + SQLstate.tableName + " SET ? ", ModelData, 
            (err, results) => {
                if(err){
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }
    throw "ERROR Table Name is null " + SQLstate.tableName;
}

//Test
SQLstate.delete = ( columnName, searchWord ) => {
    if( SQLstate.tableName != null){
        return new Promise((resolve, reject) =>{
            pool.query("Delete From " + SQLstate.tableName + " Where " + columnName 
            + " = '" + searchWord + "'", (err, results) => {
                if(err){
                    return reject(err);
                }
    
                return resolve(results);
            });
        });
    }
    throw "ERROR Table Name is null " + SQLstate.tableName;
}


//Test
SQLstate.update = ( Model, id ) => {
    let sets = "";
    for (let [key, value] of Object.entries(Model)) {
        if(sets == ""){
            sets = sets + key  + "=" +  JSON.stringify(value) + " ";
        }else{
            sets = sets + ", " + key  + "=" +  JSON.stringify(value) + " ";
        }
        
      }
      console.log(sets);
    if( SQLstate.tableName != null){
        return new Promise((resolve, reject) =>{
            pool.query("Update " + SQLstate.tableName + " Set "
             + sets
              + " Where id =" +
            id ,(err, results) => {
                if(err){
                    return reject(err);
                }
                
                return resolve(results);
            });
        });
    }
    throw "ERROR Table Name is null " + SQLstate.tableName;
}


module.exports = {
    SQLstate: SQLstate,
};