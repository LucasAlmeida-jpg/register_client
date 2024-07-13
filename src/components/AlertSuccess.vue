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

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>