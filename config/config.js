/*
 * 表格配置项 可由外部覆盖
 * @author: pjlin
 */
import defaultConfig from './config.json'
function getLocalConfig (){
  // if (typeof process !== 'undefined') {
  //   const path = require('path')
  // }
  // const fileManager = new FileReader()
  // console.log(__dirname)
  // const configFile = require.context("/", true, /\.json$/)
}

function getConfig() {
  getLocalConfig()


  return {
    tableConfig:defaultConfig.table,
    columnConfig:defaultConfig.column,
    operateConfig:defaultConfig.operates,
    paginationConfig:defaultConfig.pagination
  }
}

export default getConfig()
