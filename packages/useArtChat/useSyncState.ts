import { ref } from 'vue';
import type { Ref } from 'vue';

export default function useSyncState<T>(
  defaultValue: (() => T) | T,
): [
  state: Ref<T>,
  setState: (val: ((state: T) => T) | T) => void,
  getState: () => T,
] {
  const state = ref<T>(
    defaultValue instanceof Function ? defaultValue() : defaultValue,
  );

  const stateRef = ref<T>(state.value);
  stateRef.value = state.value;

  const setState = (val: ((state: T) => T) | T) => {
    state.value = val instanceof Function ? val(state.value) : val;
  };

  const getState = () => stateRef.value;

  return [state as Ref<T>, setState, getState] as const;
}
