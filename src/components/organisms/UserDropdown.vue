<template>
    <span data-uk-icon="user"></span>
    <div class="uk-width-large" data-uk-dropdown="pos: top-right">
        <div class="uk-drop-grid uk-child-width-1-2@m" uk-grid>
            <div>
                <!-- <ul class="uk-nav uk-dropdown-nav">
                    <li class="uk-active"><a href="#">Active</a></li>
                    <li><a href="#">Item</a></li>
                    <li class="uk-nav-header">Header</li>
                    <li><a href="#">Item</a></li>
                    <li><a href="#">Item</a></li>
                    <li class="uk-nav-divider"></li>
                    <li><a href="#">Item</a></li>
                </ul> -->

                <router-link :to="{ name: 'manageLeagues' }">Manage Leagues</router-link>
            </div>
            <div>
                <ul class="uk-nav uk-dropdown-nav">
                    <li class="uk-active"><a href="#">Active</a></li>
                    <li><a href="#">Item</a></li>
                    <li class="uk-nav-header">Header</li>
                    <li><a href="#">Item</a></li>
                    <li><a href="#">Item</a></li>
                    <li class="uk-nav-divider"></li>
                    <li><a href="#">Item</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
//
// Imports
//
// ========================================================================

import Button from "@/components/atoms/Button.vue";

//
// Constants
//
// ========================================================================

//
// Functions
//
// ========================================================================

</script>

<style lang='scss'>

</style>