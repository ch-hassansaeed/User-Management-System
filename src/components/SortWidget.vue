<template>
  <div :class="$style['sort-widget-container']">
    <div
      v-for="t in sortTypes"
      :key="t.type"
      :class="[
        { [$style['active-sort']]: selectedSortType === t.type },
        $style['sort-widget-item'],
      ]"
      @click="$emit(t.method)">
      <span :class="$style['sort-widget-prefix']">Sort by </span> {{ t.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const sortTypes = [
  { type: 'value', label: 'Value', method: 'sortByValue' },
  { type: 'date', label: 'Added Date', method: 'sortByDate' },
];

export default defineComponent({
  name: 'SortWidget',
  components: {},
  props: {
    selectedSortType: {
      type: String,
      required: true,
    },
  },
  emits: [...sortTypes.map((t) => t.method)],
  setup(props, { emit }) {
    return { sortTypes };
  },
});
</script>

<style lang="scss" module>
@import '../sass/_color.scss';

.sort-widget-container {
  display: flex;
  flex-direction: column;
  padding: 64px;
}
.sort-widget-item {
  width: 200px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 16px;
  font-size: 13px;
  position: relative;
  cursor: pointer;
}

.active-sort {
  background: $white;
}

.active-sort::after {
  content: '•';
  font-size: 24px;
  margin-left: 16px;
  position: absolute;
  right: 16px;
  color: $success;
}

.sort-widget-prefix {
  color: $gray-dark;
  margin-right: 5px;
}
</style>
