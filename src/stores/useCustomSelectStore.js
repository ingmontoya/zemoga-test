// src/stores/useCustomSelectStore.js
import { defineStore } from 'pinia';
import { useStorage } from "@vueuse/core"

export const useCustomSelectStore = defineStore('customSelect', () => {
  // State
  const options = useStorage('customSelectOptions', []);
  const selected = useStorage('customSelectSelected', null);

  // Actions
  function setSelected(value) {
    selected.value = value;
  }

  function setOptions(newOptions) {
    options.value = newOptions;
  }

  return {
    selected,
    options,
    setSelected,
    setOptions,
  };
});
