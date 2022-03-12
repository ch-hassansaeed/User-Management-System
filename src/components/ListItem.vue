<template>
  <div :class="$style['list-item-container']">
    <div :class="$style['flex-container']">
      <div v-if="matchedValue.toLowerCase() === itemData.value.toLowerCase()">
        <img
          src="https://www.citypng.com/public/uploads/preview/hd-green-double-tick-check-mark-icon-whatsapp-png-31623349676kdqceejolt.png"
          :class="$style['double-tick-image']" />
      </div>
      <div>
        <div>
          <span :class="$style['list-item-name']">{{ itemData.value }}</span>
          <div :class="$style['list-item-sub']">
            <div
              v-if="
                matchedValue.toLowerCase() === itemData.value.toLowerCase()
              ">
              <span :class="$style['exact-match']"> Exact Match </span>,&nbsp;
            </div>
            <span>#{{ order }}</span>
          </div>
        </div>
      </div>
    </div>

    <span :class="$style['elapsed-time']">{{ elapsedTime }} ago</span>
    <IconButton
      :class="$style['trash-button']"
      :icon-name="'trash'"
      @click="$emit('removeItem')" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IListItem } from '../types';
import IconButton from './IconButton.vue';
import { formatDistance } from 'date-fns';

export default defineComponent({
  name: 'ListItem',
  components: {
    IconButton,
  },
  props: {
    itemData: {
      type: Object as () => IListItem,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    matchedValue: {
      type: String,
      required: true,
    },
  },
  emits: ['removeItem'],
  setup(props, { emit }) {
    const elapsedTime = ref('');
    const now = new Date();
    elapsedTime.value = formatDistance(new Date(props.itemData.createdAt), now);
    return { elapsedTime };
  },
});
</script>

<style lang="scss" module>
@import '../sass/_color.scss';
.flex-container {
  display: flex;
  flex-direction: row !important;
}
.flex-container > div {
  margin: 1px;
}
.double-tick-image {
  width: 20px;
  margin: 8px 7px;
}
.list-item-container {
  display: flex;
  width: 800px;
  height: 70px;
  min-height: 70px;
  background-color: $bg-primary;
  border-bottom: solid 1px $gray-light;
  align-items: center;
  padding: 0 16px;
  position: relative;
}
.list-item-container:last-child {
  border: none;
}

.list-item-container > div:first-child {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.list-item-name {
  font-size: 14px;
  color: $text;
  max-width: 600px;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
}

.list-item-sub {
  color: $gray-dark;
  display: flex;
  font-size: 12px;
}

.list-item-container:hover {
  .trash-button {
    width: 50px;
  }
}

.elapsed-time {
  white-space: nowrap;
  font-size: 13px;
  margin-right: 16px;
}

.exact-match {
  color: $success;
}

.trash-button {
  display: flex;
  align-items: center;
  width: 0px;
  transition: width 0.3s;
  margin-right: -16px;
}
</style>
