<template>
  <div class="container">
    <div>
      <p>Etapa <span>1</span> de 4</p>
      <h2>Seja bem vindo(a)</h2>
      <form @submit.prevent="validateStep">
        <div class="form-group">
          <label class="label-text" for="email">Endereço de email:</label>
          <input class="input-group" id="email" type="email" v-model="formData.email" >
        </div>

        <div class="radio-group">
         <div>
          <input type="radio" id="registrationTypePF" value="PF" v-model="formData.registrationType" required>
          <label class="label-text" for="registrationTypePF">Pessoa física</label>
         </div>

          <div>
            <input type="radio" id="registrationTypePJ" value="PJ" v-model="formData.registrationType" required>
          <label class="label-text" for="registrationTypePJ">Pessoa jurídica</label>
          </div>
        </div>
        <button class="btn" type="submit">Continuar</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    formData: Object
  },
  setup(props, { emit }) {
    const validateStep = () => {
      if (props.formData.email && props.formData.registrationType) {
        if (!isValidEmail(props.formData.email)) {
          alert('Formato de e-mail inválido.');
          return;
        }
        emit('validated', props.formData);
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    };

    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return {
      validateStep,
      isValidEmail
    };
  }
};
</script>

<style scoped>
.btn{
  width: 100%;
}
</style>