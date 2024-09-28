<template>
    <div class="uk-container uk-container-large">
        <div class="uk-flex uk-flex-center">
                <div class="uk-width-large">
                    <h1 class="uk-h3 uk-text-center">Select a Site</h1>
    
                    <div class="uk-button-group">
                        <Button
                            v-for="platform in platforms"
                            @click="updataSelectedPlatform(platform)"
                            htmlClass="uk-button-primary"
                            :text="platform"
                        />
                    </div>
    
                    <div class="uk-width-medium">
                        <AddLeagueForm :platform="selectedPlatform" />
                    </div>
                </div>
        </div>

        <hr>
        <div></div>
    </div>
</template>

<script setup>
//
// Imports
//
// ========================================================================

import { ref } from 'vue';
import AddLeagueForm from '@/components/organisms/forms/AddLeagueForm.vue';
import Button from "@/components/atoms/Button.vue";

//
// Constants
//
// ========================================================================

const platforms = ["Sleeper", "MyFantasyLeague", "Fleaflicker"]
const selectedPlatform = ref("")

//
// Functions
//
// ========================================================================

const updataSelectedPlatform = (platform) => {
    selectedPlatform.value = platform
}

</script>

<style lang='scss'>

</style>