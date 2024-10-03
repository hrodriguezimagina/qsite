import {computed, reactive, ref, onMounted, toRefs, watch, markRaw, shallowRef} from "vue";


export default function controller(props, emit) {

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
  }

  // States
  const state = reactive({
    // Key: Default Value
    dynamicModel: null,
  })

  // Computed
  const computeds = {
    dynamicField: computed(() => {
      let field = props.col.dynamicField ?? null;
      if (!field || !props.col.isEditable) return null;
      // Validate if field is a function and format it
      if (typeof field == 'function') field = field(props.row);
      // Return field
      return { name: props.col.name, maxWidth: '300px', ...field };
    }),
    maxWidth: computed(() => computeds.dynamicField?.value.maxWidth ?? ''),
    isSelectField: computed(() => {
      return computeds.dynamicField.value.type == 'select' && !computeds.dynamicField.value.props?.multiple
    })
  };

  // Methods
  const methods = {
    // methodKey: () => {}
    async runBeforeUpdate(scope){
      let response = true

      const value = computeds.isSelectField.value ? scope.value.id : scope.value //if selectField
      const tempRow = {...props.row}
      tempRow[computeds.dynamicField.value.name] = value

      if(props.beforeUpdate){
        await props.beforeUpdate({val: value, row: tempRow }).then((val) => {
          if(val){
            //replaces the value by returned on resolve(val)
            scope.value = val
            tempRow[computeds.dynamicField.value.name] = val
          } else {
            scope.set()
          }
          emit('updateRow', tempRow)
        }).catch((val) => {
          //replaces the value by returned on reject(val) or into its inital state
          scope.value =  val ? val : scope.initialValue
          response = false
        })
      } else {
        scope.set()
        emit('updateRow', tempRow)
      }
      return response
    }
  }

  // Mounted
  onMounted(() => {
  })

  // Watch
  // watch(key, (newField, oldField): void => {
  //
  // }, {deep: true})

  return {...refs, ...(toRefs(state)), ...computeds, ...methods}
}
