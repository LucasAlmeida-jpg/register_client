<template>
  <div class="container">
    <AlertSuccess v-if="showAlert" />
    <div>
      <p>Etapa <span>4</span> de 4</p>
      <h2>Revise suas informações</h2>
      <form @submit.prevent="validateStep">
        <div>
          <div class="form-group">
            <label class="label-text" for="text">Endereço de email</label>
            <input class="input-group" id="text" type="text" v-model="formData.email">
          </div>
        </div>
        <div v-if="isPfRegistration">
          <div class="form-group">
            <label class="label-text" for="text">Nome</label>
            <input class="input-group" id="text" type="text" v-model="formData.name">
          </div>
          <div class="form-group">
            <label class="label-text" for="text">CPF</label>
            <input class="input-group" id="text" type="text" v-model="formData.cpf">
          </div>
          <div class="form-group">
            <label class="label-text" for="text">Data de nascimento</label>
            <input class="input-group" id="text" type="text" v-model="formData.birthDate">
          </div>
          <div class="form-group">
            <label class="label-text" for="text">Telefone</label>
            <input class="input-group" id="text" type="text" v-model="formData.phone">
          </div>
        </div>
        <div v-else-if="isPjRegistration">
          <div class="form-group">
            <label class="label-text" for="text">Nome</label>
            <input class="input-group" id="text" type="text" v-model="formData.companyName">
          </div>
          <div class="form-group">
            <label class="label-text" for="text">CNPJ</label>
            <input class="input-group" id="text" type="text" v-model="formData.cnpj">
          </div>
          <div class="form-group">
            <label class="label-text" for="text">Data de abertura</label>
            <input class="input-group" id="text" type="text" v-model="formData.companyOpeningDate">
          </div>
          <div class="form-group">
            <label class="label-text" for="text">Nome</label>
            <input class="input-group" id="text" type="text" v-model="formData.companyPhone">
          </div>
        </div>
        <div class="button-group">
          <button @click.prevent="$emit('back')" class="btn-outline">Voltar</button>
          <button type="submit" class="btn">Continuar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import AlertSuccess from '../components/AlertSuccess.vue';


export default {
  components: {
    AlertSuccess
  },
  props: ['formData'],
  setup(props) {
    const isPfRegistration = ref(props.formData.registrationType === 'PF');
    const isPjRegistration = ref(props.formData.registrationType === 'PJ');
    const showAlert = ref(false);

    const submitForm = () => {
      showAlert.value = true;
    };

    return {
      isPfRegistration,
      isPjRegistration,
      showAlert,
      submitForm
    };
  }
};
</script>
