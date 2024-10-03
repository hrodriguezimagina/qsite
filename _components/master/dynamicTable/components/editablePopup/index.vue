<template>
  <q-popup-edit
    v-if="dynamicField"
    ref="popupEditRef"
    v-model="row[col.name]"
    v-slot="scope"
    no-caps
    :cover="false"
    anchor="bottom start"
    transition-show="fade-in"
    transition-hide="fade-out"
    :max-width="maxWidth"
  >
    <q-form
      autocorrect="off"
      autocomplete="off"
      ref="formContent"
      @submit="runBeforeUpdate(scope)"
      @validation-error="$alert.error($tr('isite.cms.message.formInvalid'))"
    >
      <b class="text-blue-grey">
        {{ $tr('isite.cms.label.edit') }}: ID {{ row.id }} | {{ col.label }}
      </b>
      <q-separator class="q-mt-sm" />
      <div class="q-py-sm">
        <dynamic-field
          v-if="isSelectField"
          v-model="scope.value.id"
          :field="dynamicField"
        />
        <dynamic-field v-else
                       v-model="scope.value"
                       :field="dynamicField"
        />
        <div class="justify-end row q-gutter-sm">
          <q-btn
            :label="$tr('isite.cms.label.cancel')"
            no-caps color="grey" unelevated rounded
            @click.stop.prevent="scope.cancel"
          />
          <q-btn
            :label="$tr('isite.cms.label.save')" color="green"
            no-caps unelevated rounded
            @click="$refs.formContent.submit()"
            :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value"
          />
        </div>
      </div>
    </q-form>
  </q-popup-edit>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import controller from 'modules/qsite/_components/master/dynamicTable/components/editablePopup/controller';

export default defineComponent({
  props: {
    row: { type: Object, default: null },
    col: { type: Object, default: null },
    beforeUpdate: {
      type: Function as PropType<() => void>,
      required: false,
      default: null,
    }
  },
  setup (props, { emit })
  {
    return controller(props, emit);
  },
  components: {}
});
</script>
<style lang="scss">
</style>
