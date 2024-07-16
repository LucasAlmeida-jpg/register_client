<template>
  <Transition name="bounce">
    <p v-if="show">
      Usúario cadastrado com sucesso!
    </p>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)

</script>

<style scoped>
p{
  margin-top: 20px;
  text-align: center;
  position: absolute;
  top: 0;
  background: green;
  color: white;
  padding: 10px;
  border-radius: 12px;
  opacity: 0.8;
}
</style>