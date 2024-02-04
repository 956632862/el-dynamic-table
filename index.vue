<script>
import {Table,TableColumn,Button} from "element-ui"
import tableRenderSlot from "./tableRenderSlot.vue"
import tableItem from "./tableItem.vue";
import props from "./mixins/props";
import config from "./config/config";
import {debounce, isEmpty} from "./utils";
import tableFn from "./mixins/tableFn";
import pagination from "./pagination.vue";
import buttonComponent from "./buttonComponent.vue"

export default {
  name: "el-dynamic-table",

  mixins:[props,tableFn],

  components:{
    Table,tableItem,
    TableColumn,
    tableRenderSlot,
    Button,
    pagination,
    buttonComponent
  },

  provide:function () {
    return {
      tableMain:this
    }
  },

  directives:{
    bind_directive:{
      bind(el,binding,vnode){
        const {value} = binding
        console.log(vnode,'vnode')
      }
    }
  },

  computed:{
    tableConfig(){
      return Object.assign({},config.tableConfig,this.$attrs)
    },

    columnConfig(){
      return config.columnConfig
    },
    operateConfig(){
      return {
        columnOptions:Object.assign({},config.operateConfig,this.operates || {}), // 操作列
        button:Object.assign({},config.operateConfig.button,this.operates.button || {}) // 按钮的配置
      }
    },
  },


  data(){
    return {
      tableRef:null,
      selectionDebounceControl:null // selection 防抖
    }
  },

  mounted() {
    this.tableRef = this.$refs['dynamic-table']
    this.selectionDebounceControl = debounce()
  },

  methods:{
    isEmpty,

    onSelectionChange(val){
      let value = this.selectionMultiple ? val.slice(0,this.selectionMultiple) : val

      if (this.selectionMultiple && val.length > this.selectionMultiple) {
        for (let i = this.selectionMultiple; i < val.length; i++) {
          this.tableRef.toggleRowSelection(val[i])
        }
      }

      this.selectionDebounceControl(() => this.$emit('onSelectionChange',value),200)
    },




    // 获取单个按钮的配置项，跟操作栏统一的button的配置项合并
    getButtonConfig(button,operateConfigButton){
      return Object.assign({},operateConfigButton,button)
    },

  }

}
</script>

<template>
<div class="dynamic-table-main">

  <Table
      ref="dynamic-table"
      :data="tableData"
      v-bind="tableConfig"
      v-on="$listeners"
      :span-method="cellSpanMethod"
      @selection-change="onSelectionChange"
  >

    <!--多选框-->
    <TableColumn
        v-if="selection"
        type="selection"
        :key="Math.random()"
        :reserve-selection="reserveSelection"
        :align="columnConfig.align"
        :selectable="selectable"
    />


    <!--展开行-->
    <TableColumn v-if="tableConfig.expand" type="expand">
      <template v-slot="scope">
        <tableRenderSlot
            slotName="expand"
            default-content="请使用expand具名插槽自定义样式"
            :row="scope.row"
            :column="scope.column"
        />
      </template>
    </TableColumn>

    <template v-for="(column) in columns" >

      <TableColumn
          v-if="column.type && column.type === 'index'"
          :key="Math.random()"
          :align="column.align || columnConfig.align"
          v-bind="column"
      />

      <tableItem  v-else :key="column.prop" :column="column"/>
    </template>

    <!--操作按钮单独渲染-->
    <TableColumn
      v-if="(operates.buttons && operates.buttons.length) || operates.isSlot"
      v-bind="operateConfig.columnOptions"
    >
      <template v-slot="scope">
        <tableRenderSlot
          v-if="operates.isSlot"
          slotName="operates"
          default-content="请使用operate具名插槽自定义样式"
          :row="scope.row"
          :column="scope.column"
        />

        <component v-else-if="operates.component" :is="operates.component"></component>
        <!--v-bind_directive="button.directive || []"-->

        <template v-else>


          <template v-for="(button,index) in operates.buttons">
            <buttonComponent
                :key="index"
                :button="button"
                :scope="scope"
                :config="getButtonConfig(button,operateConfig.button)"
            />
          </template>

          <!--<Button-->
          <!--    v-for="(button,index) in operates.buttons"-->
          <!--    :key="index"-->
          <!--    :disabled="operateConfig.button.disabled ? operateConfig.button.disabled({row:scope.row,column:scope.column,vm:$parent}) : false"-->
          <!--    v-bind="getButtonConfig(button,operateConfig.button)"-->
          <!--    @click="button.onClick ? button.onClick({row:scope.row,column:scope.column,vm:$parent}) : () => ({})"-->
          <!--&gt;-->
          <!--  <test/>-->

          <!--  {{}-->
          <!--</Button>-->
        </template>

      </template>

    </TableColumn>

  </Table>

  <pagination
      v-if="isPagination"
      :scope_config="pagination"
  />

</div>
</template>

<style scoped>
.dynamic-table-main{
  //height: 100%;
}

</style>
