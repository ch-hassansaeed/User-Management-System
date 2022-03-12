<template>
  <div :class="$style['icon-container']">
    <img
      :class="{ [$style['button-disabled']]: disabled }"
      :src="getImgUrl(iconName)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IconButton',
  components: {},
  props: {
    iconName: String,
    disabled: Boolean,
  },
  emits: [],
  setup(props, { emit }) {
    const getImgUrl = (name: string) => {
      var images = require.context('../assets/', false, /\.svg$/);
      return images(`./${name}.svg`);
    };
    return { getImgUrl };
  },
});
</script>

<style lang="scss" module>
.icon-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.button-disabled {
  filter: grayscale(1) opacity(0.5);
  cursor: not-allowed;
}
</style>
