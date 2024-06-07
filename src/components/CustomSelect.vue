<script setup>
import { ref, onMounted, computed } from 'vue';
import { useCustomSelectStore } from '@/stores/useCustomSelectStore';


// Props
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  default: {
    type: String,
    required: false,
    default: null,
  },
  tabindex: {
    type: Number,
    required: false,
    default: 0,
  },
});

const emit = defineEmits(['input']);

const open = ref(false);
const customSelectStore = useCustomSelectStore();


onMounted(() => {
  customSelectStore.setOptions(props.options);
  customSelectStore.setSelected(props.default || (props.options.length > 0 ? props.options[0] : null));
  emit('input', customSelectStore.selected.value);
});

const selectOption = (option) => {
  customSelectStore.setSelected(option);
  open.value = false;
  emit('input', option);
};

// Expose state from the store
const selected = computed(() => customSelectStore.selected);
const storeOptions = computed(() => customSelectStore.options);

</script>

<template>
    <div class="content__viewPicker" :tabindex="tabindex" @blur="open = false">
      <div class="selected" :class="{ open: open }" @click="open = !open">
        {{ selected }}
      </div>
      <div class="items" :class="{ selectHide: !open }">
        <div
          v-for="(option, i) of storeOptions"
          :key="i"
          @click="selectOption(option)"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </template>