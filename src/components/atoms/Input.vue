<template>
    <input
        class="uk-input"
        :type="props.type"
        :value="props.value"
        :name="props.name"
        :placeholder="props.placeholder"
        :required="props.required"
        :autocomplete="props.autocomplete" />
</template>

<script setup>

//
// Imports
//
// ========================================================================



//
// Constants
//
// ========================================================================

const props = defineProps({
    type : {
        type: String,
        default: "text"
    },
    name : {
        type: String,
    },
    placeholder : {
        type: String,
    },
    required : {
        type: Boolean,
        default: false
    },
    autocomplete : {
        type: String,
    },
    value : {
        type: String,
        default: ""
    }
})

//
// Functions
//
// ========================================================================

</script>

<style lang='scss'>

</style>