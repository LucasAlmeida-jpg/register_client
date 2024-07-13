<template>
  <div>
    <p>Etapa <span>4</span> de 4</p>
    <h2>Revise suas informações</h2>
    <div v-if="isPfRegistration">
      <p><strong>Nome:</strong> {{ formData.name }}</p>
      <p><strong>CPF:</strong> {{ formData.cpf }}</p>
      <p><strong>Data de Nascimento:</strong> {{ formData.birthDate }}</p>
      <p><strong>Telefone:</strong> {{ formData.phone }}</p>
    </div>
    <div v-else-if="isPjRegistration">
      <p><strong>Razão Social:</strong> {{ formData.companyName }}</p>
      <p><strong>CNPJ:</strong> {{ formData.cnpj }}</p>
      <p><strong>Data de Abertura:</strong> {{ formData.companyOpeningDate }}</p>
      <p><strong>Telefone:</strong> {{ formData.companyPhone }}</p>
    </div>
    <p><strong>E-mail:</strong> {{ formData.email }}</p>
    <p><strong>Senha:</strong> {{ formData.password }}</p>
    
    <button @click.prevent="$emit('back')">Voltar</button>
    <button @click.prevent="submitForm">Cadastrar</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['formData'],
  setup(props) {
    const isPfRegistration = ref(props.formData.registrationType === 'PF');
    const isPjRegistration = ref(props.formData.registrationType === 'PJ');

    const submitForm = () => {
      alert('Dados submetidos com sucesso!');
    };

    return {
      isPfRegistration,
      isPjRegistration,
      submitForm
    };
  }
};
</script>
