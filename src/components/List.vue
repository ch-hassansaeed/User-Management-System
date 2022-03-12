<template>
  <div :class="$style['list-container']">
    <ListItem
      v-for="(item, i) in items"
      :key="item.name"
      :matchedValue="matchedValue"
      :order="item.order"
      :itemData="item"
      @removeItem="$emit('removeItem', i)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import ListItem from './ListItem.vue';
import { IListItem } from '../types';
export default defineComponent({
  name: 'List',
  components: {
    ListItem,
  },
  props: {
    items: {
      type: Array as () => IListItem[],
      required: true,
    },
    matchedValue: {
      type: String,
      required: true,
    },
  },
  emits: ['removeItem'],
  setup(props, { emit }) {
    const onDelete = (id: number) => {
      console.log(id);
    };
    return { onDelete };
  },
});
</script>

<style lang="scss" module>
.list-container {
  display: flex;
  width: 800px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  flex-direction: column;
  position: relative;
}
</style>
