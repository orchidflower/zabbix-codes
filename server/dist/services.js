"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("./database");
var log4js = require('log4js');
var redis = require('./cacheservices');
let logger = log4js.getLogger('services');
/////////////////////////// Codes //////////////////////////////////
async function listAllCodes() {
    logger.debug("...................list all codes.................");
    let sql = `select a.id as id, code, a.system as system, b.name as systemname, a.title as title, a.level as level, 
               d.name as levelname, a.description, solution, a.contact as contact, 
               c.name as contactname 
               from ZABBIX_CODES as a, ZABBIX_SYSTEMS as b, ZABBIX_CONTACTS as c, ZABBIX_LEVELS as d
               where a.system=b.system and a.contact=c.contact and a.level=d.level`;
    let rows = await db.query(sql);
    return rows;
}
exports.listAllCodes = listAllCodes;
async function queryByCode(code) {
    let ret = await redis.loadCode(code);
    if (ret != null) {
        logger.debug("Cache is hit. ", code);
        return ret;
    }
    logger.debug('....................code = ' + code + '.................');
    let sql = `select a.id as id, code, a.system as system, b.name as systemname, a.title as title, a.level as level, 
               d.name as levelname, a.description, solution, a.contact as contact, 
               c.name as contactname, d.description as leveldescription, c.qq, c.weixin, c.mobile, 
               b.contact as systemcontact, b.description as systemdescription
               from ZABBIX_CODES as a, ZABBIX_SYSTEMS as b, ZABBIX_CONTACTS as c, ZABBIX_LEVELS as d
               where a.system=b.system and a.contact=c.contact and a.level=d.level and code = ?`;
    let values = [code];
    let rows = await db.query(sql, values);
    if (rows.length >= 1) {
        await redis.storeCode(code, rows[0]);
        logger.debug("Cache is stored.", code);
        return rows[0];
    }
    return null;
}
exports.queryByCode = queryByCode;
async function addCode(record) {
    logger.debug('.....................add Code...........................');
    logger.debug(record);
    let sql = 'insert into ZABBIX_CODES (code, system, title, level, description, solution, contact) values (?, ?, ?, ?, ?, ?, ?)';
    let values = [record.code, record.system, record.title, record.level, record.description, record.solution, record.contact];
    let rows = await db.query(sql, values);
    logger.debug(rows);
    return rows;
}
exports.addCode = addCode;
async function updateByCode(code, record) {
    logger.debug('......................update by Code ' + code + '......................');
    logger.debug(record);
    let sql = 'update ZABBIX_CODES set title=?, level=?, system=?, description=?, solution=?, contact=? where code=?';
    let values = [record.title, record.level, record.system, record.description, record.solution, record.contact, record.code];
    let rows = await db.query(sql, values);
    logger.debug(rows);
    return rows;
}
exports.updateByCode = updateByCode;
async function deleteById(id) {
    logger.debug('...................delete code by id:' + id + '................');
    let sql = 'delete from ZABBIX_CODES where id=?';
    let values = [id];
    let rows = await db.query(sql, values);
    logger.debug(rows);
    return rows;
}
exports.deleteById = deleteById;
////////////////////// Contact //////////////////////////////////
async function listAllContacts() {
    logger.debug("...................list all contacts.................");
    let sql = 'select a.id as id, contact, a.name as name, a.title as title, b.name as titlename, qq, weixin, mobile from ZABBIX_CONTACTS as a, ZABBIX_TITLES as b where a.TITLE=b.TITLE';
    let rows = await db.query(sql);
    return rows;
}
exports.listAllContacts = listAllContacts;
async function queryByContact(contact) {
    logger.debug('....................contact = ' + contact + '.................');
    let sql = 'select id, contact, name, title, qq, weixin, mobile from ZABBIX_CONTACTS where contact = ?';
    let values = [contact];
    let rows = await db.query(sql, values);
    if (rows.length >= 1)
        return rows[0];
    return null;
}
exports.queryByContact = queryByContact;
async function addContact(record) {
    logger.debug('.....................add Contact...........................');
    logger.debug(record);
    let sql = 'insert into ZABBIX_CONTACTS (contact, name, title, qq, weixin, mobile) values (?, ?, ?, ?, ?, ?)';
    let values = [record.contact, record.name, record.title, record.qq, record.weixin, record.mobile];
    let rows = await db.query(sql, values);
    logger.debug(rows);
    return rows;
}
exports.addContact = addContact;
async function updateContactByContact(contact, record) {
    logger.debug('......................update by Contact ' + contact + '......................');
    logger.debug(record);
    let sql = 'update ZABBIX_CONTACTS set name=?, title=?, qq=?, weixin=?, mobile=? where contact=?';
    let values = [record.name, record.title, record.qq, record.weixin, record.mobile, contact];
    let rows = await db.query(sql, values);
    logger.debug(rows);
    return rows;
}
exports.updateContactByContact = updateContactByContact;
async function deleteContactById(id) {
    logger.debug('...................delete contact by id:' + id + '................');
    let sql = 'delete from ZABBIX_CONTACTS where id=?';
    let values = [id];
    let rows = await db.query(sql, values);
    logger.debug(rows);
    return rows;
}
exports.deleteContactById = deleteContactById;
////////////////////// System /////////////////////////////////
async function listAllSystems() {
    logger.debug("...................list all system.................");
    let sql = 'select a.id as id, system, a.name as name, description, a.contact, b.name as contactname from ZABBIX_SYSTEMS as a, ZABBIX_CONTACTS as b where a.contact=b.contact';
    let rows = await db.query(sql);
    return rows;
}
exports.listAllSystems = listAllSystems;
async function queryBySystem(system) {
    logger.debug('....................system = ' + system + '.................');
    let sql = 'select id, system, name, description, contact from ZABBIX_CONTACTS where system = ?';
    let values = [system];
    let rows = await db.query(sql, values);
    if (rows.length >= 1)
        return rows[0];
    return null;
}
exports.queryBySystem = queryBySystem;
async function addSystem(record) {
    logger.debug('.....................add System...........................');
    logger.debug(record);
    let sql = 'insert into ZABBIX_SYSTEMS (system, name, description, contact) values (?, ?, ?, ?)';
    let values = [record.system, record.name, record.description, record.contact];
    let rows = await db.query(sql, values);
    logger.debug(rows);
    return rows;
}
exports.addSystem = addSystem;
async function updateBySystem(system, record) {
    logger.debug('......................update by System ' + system + '......................');
    logger.debug(record);
    let sql = 'update ZABBIX_SYSTEMS set system=?, name=?, description=?, contact=? where system=?';
    let values = [record.system, record.name, record.description, record.contact, system];
    let rows = await db.query(sql, values);
    logger.debug(rows);
    return rows;
}
exports.updateBySystem = updateBySystem;
async function deleteSystemById(id) {
    logger.debug('...................delete system by id:' + id + '................');
    let sql = 'delete from ZABBIX_SYSTEMS where id=?';
    let values = [id];
    let rows = await db.query(sql, values);
    logger.debug(rows);
    return rows;
}
exports.deleteSystemById = deleteSystemById;
/////////////////////////// Titles //////////////////////////////////
async function listAllTitles() {
    logger.debug("...................list all titles.................");
    let sql = 'select id, title, name from ZABBIX_TITLES';
    let rows = await db.query(sql);
    return rows;
}
exports.listAllTitles = listAllTitles;
////////////////////////// Levels ///////////////////////////////////
async function listAllLevels() {
    logger.debug("...................list all levels.................");
    let sql = 'select id, level, name from ZABBIX_LEVELS';
    let rows = await db.query(sql);
    return rows;
}
exports.listAllLevels = listAllLevels;
