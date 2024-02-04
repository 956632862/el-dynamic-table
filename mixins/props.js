export default {
    props:{
        columns:[], // 表格列
        tableData:[], // 表格数据

        // 序号行
        index:null,

        // 多选框
        selection:false,        // 开启选择框
        selectionMultiple:null, // 最多只能选择多少
        selectable:null,        // 禁用选择框
        // 是否缓存多选的数据
        reserveSelection: {
            type: Boolean,
            default: true
        },

        // 单元格合并规则
        cellMergeRule:[],   // 传入列的prop

        // 按钮组
        operates:{
            type:Object,
           default:() => {
               return {
                   component:null,
                   buttonAttrs:{},
                   buttons:[],
                   slot:false
               }
           }
        },

        // 分页
        isPagination:{
            type:Boolean,
            default:true
        },

        // 分页配置
        pagination:{
            type:Object,
            default:() => ({
                total:0,
                'current-page':1,
                'page-size':10
            })
        }

    }
}
