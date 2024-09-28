<template>
    <input v-if="props.input" type="submit" class="uk-button" :class="props.htmlClass" :value="props.text" />

	<button v-else :type="props.type" class="uk-button" :class="props.htmlClass">
		{{ props.text }}
	</button>
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
	input: {
		type: Boolean,
		default: false,
	},
	text: {
		type: String,
		default: "Button",
	},
	htmlClass: {
		type: String,
	},
});

//
// Functions
//
// ========================================================================
</script>

<style lang="scss"></style>
