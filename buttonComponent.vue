<script>
export default {
  functional:true,

  inject:['tableMain'],

  props:{
    // 作用域插槽的参数
    scope:{
      type:Object,
      default:() => ({})
    },
    button:{
      type:Object,
      default:() => ({})
    },
    config:{
      type:Object,
      default:() => ({})
    }
  },

  render(createElement, context) {

    const renderButtonText = (button,scope) => {
      const {row,column} = scope
      if (typeof button.text === 'function'){
        return button.text({row,button,column})
      }else{
        return button.text
      }
    }

    const directives = context.props.button.directives ?
        context.props.button.directives.map(directive => ({name:directive}))
        : []

    // 组件的选项
    const props = {
      ...context.props.config,
      disabled:context.props.config.disabled
          ? context.props.config.disabled({
            row:context.props.scope.row,
            column:context.props.scope.column,
            vm:context.injections.tableMain.$parent,
            button:context.props.button
          })
          : false
    }

    // 监听的事件
    const on = {
      click:() => {
        context.props.button.onClick
        && context.props.button.onClick(
            {
              row:context.props.scope.row,
              column:context.props.scope.column,
              vm:context.injections.tableMain.$parent
            })
      }
    }

    return createElement('el-button',{

      props,
      on,
      directives
    },[
      renderButtonText(context.props.button,context.props.scope)
    ])
  }
}
</script>

<style scoped>

</style>
