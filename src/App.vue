<template>
  <div>
    <main class="main">
      <form @submit.prevent="onSubmit">
        <!-- Name Input -->
        <input
          type="text"
          placeholder="Enter your name"
          v-model="name"
          
        />
        <!-- CPF Input -->
        <input
          type="text"
          placeholder="Enter your CPF"
          v-model="cpf"
          
        />
        <!-- Birth Date Input -->
        <input
          type="date"
          v-model="birthDate"
          
        />
        <!-- Phone Input -->
        <input
          type="tel"
          placeholder="Enter your phone number"
          v-model="phone"
          
        />
        <!-- Email Input -->
        <input
          type="email"
          placeholder="Enter your email"
          v-model="email"
          
        />
        <!-- Radio Buttons for Registration Type -->
        <div>
          <label>
            <input
              type="radio"
              value="PF"
              v-model="registrationType"
              
            />
            Pessoa Física (PF)
          </label>
          <label>
            <input
              type="radio"
              value="PJ"
              v-model="registrationType"
              
            />
            Pessoa Jurídica (PJ)
          </label>
        </div>
        <!-- Text Input -->
        <input
          type="text"
          placeholder="Enter Anything"
          v-model="testInput"
          
        />
        <!-- Submit Button -->
        <input type="submit" value="Test Server" />
      </form>
      <!-- Result Display -->
      <div class="result">{{ result.name }}</div>
      <div class="result">{{ result.cpf }}</div>
      <div class="result">{{ result.birthDate }}</div>
      <div class="result">{{ result.phone }}</div>
      <div class="result">{{ result.email }}</div>
      <div class="result">{{ result.registrationType }}</div>
      <div class="result">{{ result.testInput }}</div>
    </main>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { onMounted } from 'vue'

export default defineComponent({
  setup() {
    const name = ref("");
    
    const cpf = ref("");
    const birthDate = ref("");
    const phone = ref("");
    const email = ref("");
    const registrationType = ref("");
    const testInput = ref("");
    const result = ref("");

    const onSubmit = async () => {
      try {
        const response = await fetch('/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name.value,
            cpf: cpf.value,
            birthDate: birthDate.value,
            phone: phone.value,
            email: email.value,
            registrationType: registrationType.value,
            text: testInput.value
          })
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        result.value = data.result;

      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };

    // onMounted(() => {
    //  result
    //  console.log(result, 'aqui no mounted');
    // })

    return {
      name,
      cpf,
      birthDate,
      phone,
      email,
      registrationType,
      testInput,
      result,
      onSubmit
    };
  }
});
</script>

