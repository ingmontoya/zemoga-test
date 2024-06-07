<script setup>
import { onMounted, ref } from 'vue';
import CustomSelect from '../CustomSelect.vue';
import useMobileDetection  from '@/composables/useMobileDetection';
import { useCustomSelectStore } from '@/stores/useCustomSelectStore';

const customSelectStore = useCustomSelectStore();
const { isMobile } = useMobileDetection();
const viewPicker = ref(['List', 'Grid']);
const selectedView = ref('');

function handleSelected(param) {
    selectedView.value = param;
}
</script>

<template>
    <aside class="content content-previous-rulings" role="doc-tip" aria-label="Previous Rulings">
        <h1 class="content__title"> Previous Rulings </h1>
        <CustomSelect v-if="!isMobile" :options="viewPicker" :default="selectedView || customSelectStore.selected" @input="handleSelected" class="content__viewPicker" />
    </aside>
</template>
