<template>
  <div class="container">
    <p>Etapa <span>2</span> de 4</p>
    <h2>Pessoa Física</h2>
    <form @submit.prevent="validateStep">
      <template v-if="formData.registrationType === 'PF'">
        <div class="form-group">
          <label class="label-text" for="name">Nome:</label>
          <input class="input-group" id="name" type="text" v-model="formData.name" required>
        </div>

        <div class="form-group">
          <label class="label-text" for="cpf">CPF:</label>
          <input class="input-group" id="cpf" type="text" v-model="formData.cpf" required>
        </div>
        <div class="form-group">
          <label class="label-text" for="birthDate">Data de nascimento:</label>
          <input class="input-group" id="birthDate" type="date" v-model="formData.birthDate" required>
        </div>
        <div class="form-group">
          <label class="label-text" for="phone">Número de telefone:</label>
          <input class="input-group" id="phone" type="text" v-model="formData.phone" required>
        </div>
      </template>

      <template v-else-if="formData.registrationType === 'PJ'">
        <label for="companyName">Razão social:</label>
        <input class="input-group" id="companyName" type="text" v-model="formData.companyName" required placeholder="Digite a razão social">

        <label for="cnpj">CNPJ:</label>
        <input class="input-group" id="cnpj" type="text" v-model="formData.cnpj" required placeholder="Digite o CNPJ">

        <label for="companyOpeningDate">Data de abertura da empresa:</label>
        <input class="input-group" id="companyOpeningDate" type="date" v-model="formData.companyOpeningDate" required>

        <label for="companyPhone">Telefone da empresa:</label>
        <input class="input-group" id="companyPhone" type="text" v-model="formData.companyPhone" required
          placeholder="Digite o telefone da empresa">
      </template>

    <div class="button-group">
      <button @click.prevent="$emit('back')" class="btn-outline">Voltar</button>
      <button type="submit" class="btn">Continuar</button>
    </div>
    </form>
  </div>
</template>

<script>

export default {
  props: ['formData'],
  setup(props, { emit }) {
    const validateStep = () => {
      const formData = props.formData;

      if (formData.registrationType === 'PF') {
        if (!formData.name || !formData.cpf || !formData.birthDate || !formData.phone) {
          alert('Por favor, preencha todos os campos.');
          return;
        }
      } else if (formData.registrationType === 'PJ') {
        if (!formData.companyName || !formData.cnpj || !formData.companyOpeningDate || !formData.companyPhone) {
          alert('Por favor, preencha todos os campos.');
          return;
        }
      }

      if (formData.registrationType === 'PF' && !isValidDate(formData.birthDate)) {
        alert('Data de nascimento inválida.');
        return;
      }
      if (formData.registrationType === 'PJ' && !isValidDate(formData.companyOpeningDate)) {
        alert('Data de abertura inválida.');
        return;
      }

      emit('validated', formData);
    };

    const isValidDate = (date) => {
      return !isNaN(Date.parse(date));
    };

    return {
      validateStep,
      isValidDate
    };
  }
};
</script>

