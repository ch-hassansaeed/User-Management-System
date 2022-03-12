<template>
  <div :class="$style['search-bar-container']">
    <input
      v-model="inputText"
      :class="$style['search-input']"
      placeholder="Search or Add..."
      @keyup.esc="clearText"
      @keyup.enter="onAdd" />
    <div v-if="inputText" :class="$style['input-icons']">
      <IconButton
        :class="$style['cancel-button']"
        :icon-name="'cancel'"
        @click="clearText" />
      <IconButton
        :disabled="isMatch"
        :class="$style['add-button']"
        :icon-name="'add'"
        @click="onAdd" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import IconButton from './IconButton.vue';
export default defineComponent({
  name: 'SearchBar',
  components: { IconButton },
  props: {
    isMatch: Boolean,
  },
  emits: ['checkInputText', 'addItem'],
  setup(props, { emit }) {
    const inputText = ref('');
    const clearText = () => {
      inputText.value = '';
    };
    const onAdd = () => {
      emit('addItem', inputText.value);
      !props.isMatch && clearText();
    };
    watch(inputText, (text, prevText) => {
      emit('checkInputText', text);
    });
    return { inputText, clearText, onAdd };
  },
});
</script>

<style lang="scss" module>
@import '../sass/_color.scss';

.search-bar-container {
  width: 800px;
  height: 60px;
  display: flex;
  position: relative;
  margin-bottom: 32px;
  background-color: $bg-secondary;
  border-radius: 8px;
}

.search-input {
  border: none;
  height: 100%;
  width: 700px;
  padding: 16px;
  font-size: 14px;
  background: #f1f3f5 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
}

.search-input:focus {
  outline: none;
}

.input-icons {
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  right: 16px;
}

.cancel-button {
  margin-right: 20px;
}

::placeholder {
  color: $gray;
}
</style>
