<script>
import {TableColumn} from "element-ui"
import tableRenderSlot from "./tableRenderSlot.vue";
import config from "./config/config";
export default {
  name: "tableItem",

  components:{TableColumn,tableRenderSlot},

  inject:['tableMain'],

  props:{
    column:Object
  },

  computed:{
    columnConfig(){
      return Object.assign({},config.columnConfig)
    }
  },

  methods:{
    getCellContent({row,column}){
      if (column.formatter) return column.formatter({row,column,vm:this.tableMain.$parent})
      return row[column.property]
    },

  }
}
</script>

<template>
    <TableColumn
        v-bind="column"
        :align="column.align || columnConfig.align"
    >

      <!--多级嵌套表头-->
      <template v-if="column.deep_headers && column.deep_headers.length">
        <template v-for="(item,index) in column.deep_headers">
          <table-item
              :column="item"
              :key="index"
          />
        </template>
      </template>

      <template v-slot:header="scope">
        <tableRenderSlot
            :slotName="`header_${scope.column.property}`"
            :default-content="scope.column.label"
            :column="scope.column"
        />
      </template>

      <template v-slot="scope">
        <tableRenderSlot
            :slotName="`column_${scope.column.property}`"
            :default-content="getCellContent({row:scope.row,column:scope.column})"
            :column="scope.column"
            :row="scope.row"
        />
      </template>
    </TableColumn>
</template>

<style scoped>

</style>
