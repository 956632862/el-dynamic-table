import {isEmpty} from "../utils";

export default {


    computed:{

        /**
         * @description 构建出合并单元格的规则,无法跨行合并，也无法跨列合并
         * @return {*[]}
         */
        cellMergeData () {
            const { cellMergeRule } = this
            if (cellMergeRule instanceof Array) {
                const { columns, tableData:list } = this
                // 行合并 {name:'名称',columnIndex:'所在列',rowStart:'开始行',maxRow:'最大行数',maxColumn:'最大列数'}
                const rules = []

                for (let i = 0; i < cellMergeRule.length; i++) {
                    const item = cellMergeRule[i]

                    // 合并行
                    if (!(item instanceof Array)) {
                        // 找到所在列
                        const columnIndex = columns.findIndex(column => column.prop === item)

                        // 合并相同的数据，并且找到对应的行开始，结束时间
                        for (let j = 0; j < list.length; j++) {
                            const name = list[j][item]
                            const findIndex = rules.findIndex(rule => rule.name === name)
                            // 找不到对应的数据，则添加,并且保持不变
                            if (findIndex === -1) {
                                rules.push({ type: 'row', name, columnIndex, rowStart: j, maxRow: 1, maxColumn: 1 })
                            } else {
                                // 设置最大行数加1
                                const cells = rules[findIndex]
                                cells.maxRow += 1
                                rules[findIndex] = cells
                            }
                        }
                    }

                    // 合并列
                    if (item instanceof Array) {
                        const columnIndex = columns.findIndex(column => column.prop === item[0])
                        if (columnIndex !== -1) {
                            rules.push({ type: 'column', columnIndex, maxColumn: item.length, rowStart: 1, maxRow: 0 })
                        }
                    }
                }

                return rules
            }
        },

    },


    methods:{
        cellSpanMethod (cell) {
            // 未设置合并规则的不返回
            if (isEmpty(this.cellMergeRule)) return void (0)
            // 函数返回去处理
            if (typeof this.cellMergeRule === 'function') return this.cellMergeRule(cell)
            const { columnIndex, rowIndex, row, column } = cell

            const cellMergeData = this.cellMergeData
            // 实际上需要的数据，行，列，需要删除单元格的行/列
            let result

            cellMergeData.forEach((item, index) => {
                // 相同列下进行操作
                if (columnIndex === item.columnIndex) {
                    // 合并行
                    if (item.type === 'row') {
                        if (rowIndex === item.rowStart) {
                            result = [item.maxRow, item.maxColumn]
                        }

                        // 在合并行的中间部分要删除最前面的单元格
                        if (rowIndex > item.rowStart && rowIndex <= item.maxRow + item.rowStart) {
                            result = [0, 0]
                        }
                    }
                    // 合并列
                    if (item.type === 'column') {
                        result = [1, item.maxColumn]
                    }
                }

                // 当合并列的时候
                if (item.type === 'column') {
                    // 如果在列区间内，删除单元格
                    if (columnIndex > item.columnIndex && columnIndex < item.columnIndex + item.maxColumn) {
                        result = [0, 0]
                    }
                }
            })

            return result
        },

    }
}
