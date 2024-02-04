<script>
export default {
  name: "tableRenderSlot",
  inject:['tableMain'],
  functional:true,

  props:{
    slotName:String,
    defaultContent:[String,Number],
    column:Object,
    row:Object,
  },

  render(h,{injections,props}){
    const {$scopedSlots} = injections.tableMain
    const {slotName,defaultContent} = props

    if (slotName in $scopedSlots) {
      return $scopedSlots[slotName]({
        column:props.column,
        row:props.row
      })
    }
    return h('span', defaultContent)

  }

}
</script>


