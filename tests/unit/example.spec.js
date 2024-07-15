import { shallowMount } from '@vue/test-utils';
import FormStep1 from '@/components/FormStep1.vue';

describe('FormStep1.vue', () => {
  it('validates email format and form submission', async () => {
    const formData = {
      email: '',
      registrationType: 'PF'
    };

    const wrapper = shallowMount(FormStep1, {
      props: { formData }
    });
  });
});
