<template>
  <div class="container">
    <p>Etapa <span>2</span> de 4</p>
    <h2>Pessoa Física</h2>
    <form @submit.prevent="validateStep">
      <template v-if="formData.registrationType === 'PF'">
        <div class="form-group">
          <label class="label-text" for="name">Nome:</label>
          <input class="input-group" id="name" type="text" v-model="formData.name">
        </div>

        <div class="form-group">
          <label class="label-text" for="cpf">CPF:</label>
          <input class="input-group" id="cpf" type="text" v-model="formData.cpf" @input="applyCpfMask">
        </div>
        
        <div class="form-group">
          <label class="label-text" for="birthDate">Data de nascimento:</label>
          <input class="input-group" id="birthDate" type="text" v-model="formData.birthDate" @input="applyDateMask">
        </div>

        <div class="form-group">
          <label class="label-text" for="phone">Telefone:</label>
          <input class="input-group" id="phone" type="text" v-model="formData.phone" @input="applyPhoneMask">
        </div>
      </template>

      <template v-else-if="formData.registrationType === 'PJ'">
        <div class="form-group">
          <label for="companyName">Razão social:</label>
          <input class="input-group" id="companyName" type="text" v-model="formData.companyName">
        </div>

        <div class="form-group">
          <label for="cnpj">CNPJ:</label>
          <input class="input-group" id="cnpj" type="text" v-model="formData.cnpj" @input="applyCnpjMask">
        </div>

        <div class="form-group">
          <label for="companyOpeningDate">Data de abertura:</label>
          <input class="input-group" id="companyOpeningDate" type="text" v-model="formData.companyOpeningDate" @input="applyDateMask">
        </div>

        <div class="form-group">
          <label for="companyPhone">Telefone:</label>
          <input class="input-group" id="companyPhone" type="text" v-model="formData.companyPhone" @input="applyPhoneMask">
        </div>
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
        if (!isValidName(formData.name)) {
          alert('Formato de nome inválido.');
          return;
        } else if (!isValidCpf(formData.cpf)) {
          alert('Formato de CPF inválido.');
          return;
        } else if (!isValidDate(formData.birthDate)) {
          alert('Formato de Data de nascimento inválido.');
          return;
        }
      } else if (formData.registrationType === 'PJ') {
        if (!isValidName(formData.companyName)) {
          alert('Formato de Razão social inválido.');
          return;
        } else if (!isValidCnpj(formData.cnpj)) {
          alert('Formato de CNPJ inválido.');
          return;
        } else if (!isValidDate(formData.companyOpeningDate)) {
          alert('Formato de Data de abertura da empresa inválido.');
          return;
        }
      }

      emit('validated', formData);
    };

    const isValidName = (name) => {
      return /^[A-Za-z\s]+$/.test(name);
    };

    const isValidCpf = (cpf) => {
      return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
    };

    const isValidCnpj = (cnpj) => {
      return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
    };

    const isValidDate = (date) => {
      return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
    };

    const applyCpfMask = (event) => {
      let cpf = event.target.value.replace(/\D/g, ''); 
      if (cpf.length > 11) {
        cpf = cpf.slice(0, 11);
      }
      if (cpf.length > 9) {
        cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
      }
      if (cpf.length > 6) {
        cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      }
      if (cpf.length > 3) {
        cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
      }
      event.target.value = cpf;
    };

    const applyCnpjMask = (event) => {
      let cnpj = event.target.value.replace(/\D/g, '');
      if (cnpj.length > 14) {
        cnpj = cnpj.slice(0, 14);
      }
      if (cnpj.length > 12) {
        cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
      }
      if (cnpj.length > 8) {
        cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      }
      if (cnpj.length > 5) {
        cnpj = cnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
      }
      if (cnpj.length > 1) {
        cnpj = cnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
      }
      event.target.value = cnpj;
    };

    const applyDateMask = (event) => {
      let date = event.target.value.replace(/\D/g, ''); 
      if (date.length > 8) {
        date = date.slice(0, 8);
      }
      if (date.length > 4) {
        date = date.replace(/^(\d{2})(\d)/, '$1/$2');
      }
      if (date.length > 2) {
        date = date.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
      }
      event.target.value = date;
    };

    const applyPhoneMask = (event) => {
        let phone = event.target.value.replace(/\D/g, '');

        if (phone.length > 0) {
            phone = phone.replace(/^(\d{2})(\d)/, '($1) $2 '); 
        }
        if (phone.length > 10) {
            phone = phone.replace(/(\d{4})(\d)/, '$1-$2');
       
        if (phone.length > 15) {
            phone = phone.slice(0, 16);
        }

        event.target.value = phone;
      };
    }


    return {
      validateStep,
      applyCpfMask,
      applyCnpjMask,
      applyDateMask,
      applyPhoneMask,
      isValidName,
      isValidCpf,
      isValidCnpj,
      isValidDate,
    };
  }
};
</script>

