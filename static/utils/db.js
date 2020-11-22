import Nedb from 'nedb'


/**
* 创建数据库对象
*
* @param {*} dbPath
* @returns
*/
export const dataset = function (dbPath) {
  return new Nedb({
    filename: dbPath,
    autoload: true
  })
}

/**
* 找到一个值
*
* @param {*} dict_
* @returns
*/
export const datasetFind = function (db, dict_) {
  return new Promise((resolve) => {
    db.findOne(dict_, (err, docs) => {
      resolve(docs)
    })
  })
}