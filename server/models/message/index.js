"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mysql_1 = tslib_1.__importDefault(require("../user/mysql"));
const mysql_2 = tslib_1.__importDefault(require("./mysql"));
async function addMessages(datas) {
    const captains = await mysql_2.default.bulkCreate([...datas]);
    return captains;
}
async function getMessages({ page, page_size }, where) {
    // mysql_2.default.belongsTo(mysql_1.default, { foreignKey: 'user_id', targetKey: 'id' });
    const find = await mysql_2.default.findAndCountAll({
        where,
        // include: [
        //     {
        //         model: mysql_1.default,
        //         required: false,
        //     }
        // ],
        order: [['create_time', 'DESC']],
        offset: page < 1 ? page * page_size : (page - 1) * page_size,
        limit: page_size
    });
    return find;
}

async function getAdminMessages({ page, page_size }, where) {
    mysql_2.default.belongsTo(mysql_1.default, { foreignKey: 'user_id', targetKey: 'id' });
    const find = await mysql_2.default.findAndCountAll({
        where,
        include: [
            {
                model: mysql_1.default,
                required: false,
            }
        ],
        order: [['create_time', 'DESC']],
        offset: page < 1 ? page * page_size : (page - 1) * page_size,
        limit: page_size
    });
    return find;
}

async function getRoomMessages(where) {
    const find = await mysql_2.default.findAndCountAll({
        where,
        order: [['create_time', 'ASC']],
    });
    return find;
}

async function updateMessages(data, where) {
    const update = await mysql_2.default.update(data, {
        where: {
            ...where
        }
    });
    return update;
}

exports.default = {
    addMessages,
    getMessages,
    updateMessages,
    getRoomMessages,
    getAdminMessages
};
//# sourceMappingURL=index.js.map