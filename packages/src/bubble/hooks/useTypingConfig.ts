import type { TypingOption } from '../interface'

import { computed } from 'vue'

function useTypingConfig(typing: boolean | TypingOption) {
  const typingConfig = computed(() => {
    if (!typing) {
      return [false, 0, 0]
    }

    let baseConfig = {
      step: 1,
      interval: 50,
    }

    if (typeof typing === 'object') {
      baseConfig = { ...baseConfig, ...typing }
    }

    return [true, baseConfig.step, baseConfig.interval]
  })
  return typingConfig.value
}

export default useTypingConfig
