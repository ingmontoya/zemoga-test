<script setup>
import HomeHeaderCardVote from './HomeHeaderCardVote.vue'
</script>

<template>
    <header class="hero">
        <img class="hero__background" srcset="../../assets/img/pope-francis.png 750w, ../../assets/img/pope-francis.@2x.png 1440w"
            sizes="(min-width: 750px) 1440px, 100vw" src="../../assets/img/pope-francis.png" alt="Pope Francis">
        <div class="max-centered">
            <div class="hero__featured-card">
                <div class="featured-card__glass-background"></div>
                <HomeHeaderCardVote />
            </div>
        </div>
        <div class="hero__closing-gauge">
            <div class="closing-gauge__left">
                <span class="closing-gauge__title">closing in</span>
            </div>
            <div class="closing-gauge__right">
                <span class="closing-gauge__number">22</span>
                <span class="closing-gauge__desc">days</span>
            </div>
        </div>
    </header>
</template>
