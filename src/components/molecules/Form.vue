<template>
  <form @submit.prevent="submitForm">
    <slot v-for="field in props.fields" :name="field.name">
      <Input v-if="field.type !== 'submit'"
        :type="field.type"
        :placeholder="field.placeholder"
        :required="field.required"
        :autocomplete="field.autocomplete"
        :value="formData[field.name]"
        @input="formData[field.name] = $event.target.value"
         />

      <Button v-else :text="field.text" :htmlClass="field.htmlClass" />
    </slot>
    
    <div class="uk-alert uk-alert-danger" v-if="props.error">{{ props.error }}</div>
  </form>
</template>

<script setup>
//
// Imports
//
// ========================================================================

import { ref, toRaw } from "vue";
import Input from "@/components/atoms/Input.vue";
import Button from "@/components/atoms/Button.vue";

//
// Constants
//
// ========================================================================

const formData = ref({});

const emit = defineEmits(['submit'])

const props = defineProps({
  fields: {
    type: Array,
    required: true
  },
  error: {
    type: String,
  }
});

//
// Functions
//
// ========================================================================

const submitForm = () => { 
  // emit formData to parent
  emit('submit', toRaw(formData.value));
}
</script>

<style lang='scss'>
@import "~/uikit/src/scss/components/form.scss";
</style>