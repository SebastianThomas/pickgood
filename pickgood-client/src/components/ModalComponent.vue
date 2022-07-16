<script setup lang="ts">
// Props and emits
defineProps<{ show: boolean, modalwidth: number | string }>()
defineEmits(['close'])
</script>

<template>
  <!-- Idea: https://vuejs.org/examples/#modal -->
  <Transition name="modal">
    <div v-if="show" class="modal-mask" @pointerdown="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" :style="`width: ${modalwidth}px`"
          @pointerdown.prevent="(e) => { e.stopPropagation(); e.preventDefault() }">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">Close</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  height: 100%;
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 80vw;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: var(--modal-background-color);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
