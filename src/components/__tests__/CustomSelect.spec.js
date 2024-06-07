// CustomSelect.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia';
import { useCustomSelectStore } from '@/stores/useCustomSelectStore';

describe('useCustomSelectStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with default values', () => {
    const store = useCustomSelectStore();
    expect(store.selected).toBe(null);
    expect(store.options).toEqual([]);
  });

  it('sets options correctly', () => {
    const store = useCustomSelectStore();
    const options = ['Option 1', 'Option 2', 'Option 3'];
    store.setOptions(options);
    expect(store.options).toEqual(options);
  });

  it('sets selected option correctly', () => {
    const store = useCustomSelectStore();
    const option = 'Option 1';
    store.setSelected(option);
    expect(store.selected).toBe(option);
  });


});
