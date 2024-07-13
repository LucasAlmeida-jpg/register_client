<!-- FormStep3.vue -->
<template>
    <div>
      <h2>Passo 3: Criar Senha de Acesso</h2>
      <form @submit.prevent="validateStep">
        <label for="password">Senha de acesso:</label>
        <input id="password" type="password" v-model="formData.password" required placeholder="Digite sua senha">
        
        <button @click.prevent="$emit('back')">Voltar</button>
        <button type="submit">Continuar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['formData'],
    methods: {
      validateStep() {
        if (!this.formData.password) {
          alert('Por favor, preencha todos os campos.');
          return;
        }
        
        this.$emit('validated', this.formData);
      }
    }
  };
  </script>
  