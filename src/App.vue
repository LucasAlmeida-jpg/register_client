<template>
  <div>
    <component
      :is="currentStepComponent"
      :formData="formData"
      @validated="handleStepValidation"
      @back="goToPreviousStep"
      v-if="currentStep !== 'completed'"
    />
    <div v-else>
      <FormStep4
        :formData="formData"
        @back="goToPreviousStep"
        @submit="submitForm"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import FormStep1 from './components/FormStep1.vue';
import FormStep2 from './components/FormStep2.vue';
import FormStep3 from './components/FormStep3.vue';
import FormStep4 from './components/FormStep4.vue';

export default {
  components: {
    FormStep1,
    FormStep2,
    FormStep3,
    FormStep4
  },
  setup() {
    const currentStep = ref('step1');
    const formData = ref({
      email: '',
      registrationType: '',
      name: '',
      cpf: '',
      birthDate: null,
      phone: '',
      companyName: '',
      cnpj: '',
      companyOpeningDate: null,
      companyPhone: '',
      password: ''
    });

    const currentStepComponent = computed(() => {
      return {
        step1: 'FormStep1',
        step2: 'FormStep2',
        step3: 'FormStep3'
      }[currentStep.value] || '';
    });

    const handleStepValidation = (data) => {
      formData.value = { ...formData.value, ...data };
      const nextStepMap = {
        step1: 'step2',
        step2: 'step3',
        step3: 'completed'
      };
      currentStep.value = nextStepMap[currentStep.value] || currentStep.value;
    };

    const goToPreviousStep = () => {
      const previousStepMap = {
        step2: 'step1',
        step3: 'step2',
        completed: 'step3'
      };
      currentStep.value = previousStepMap[currentStep.value] || currentStep.value;
    };

    const submitForm = () => {
      sendFormData();
    };

    const sendFormData = async () => {
        const response = await fetch('/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData.value)
        });

        if (!response.ok) {
          throw new Error(`Erro ao enviar os dados. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    };

    return {
      currentStep,
      formData,
      currentStepComponent,
      handleStepValidation,
      goToPreviousStep,
      submitForm
    };
  }
};
</script>
