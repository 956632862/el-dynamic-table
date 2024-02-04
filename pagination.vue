<script>
import config from "./config/config";
import {Pagination} from "element-ui"
export default {
  name: "pagination",
  inject:['tableMain'],
  components:{Pagination},

  props:{
    scope_config:{
      type:Object,
      default:() => ({
        total:0,
        'current-page':1,
        'page-size':10
      })
    }
  },


  computed:{
    config({scope_config}){
      return Object.assign({},config.paginationConfig,scope_config)
    }
  },

  methods:{

    onCurrentChange(index){
      this.scope_config[this.config.pageField] = index
      this.tableMain.$emit('onCurrentChange',index)
    },

    onSizeChange(size){
      this.scope_config[this.config.pageSizeField] = size
      this.tableMain.$emit('onSizeChange',size)
    }

  }

}
</script>

<template>
<div class="dynamic-table-pagination">
  <Pagination
      v-bind.sync="config"
      :current-page="config[config.pageField]"
      :page-size="config[config.pageSizeField]"
      @current-change="onCurrentChange"
      @size-change="onSizeChange"
  >

  </Pagination>
</div>
</template>

<style scoped>
.dynamic-table-pagination{
  display: flex;
  justify-content: flex-end;
  margin: 15px 0;
}

</style>
