import { shallowMount } from '@vue/test-utils';
import FormStep2 from '@/components/FormStep2.vue';

describe('FormStep2.vue', () => {
  let wrapper;
  let formData;

  beforeEach(() => {
    formData = {
      registrationType: 'PF',
      name: '',
      cpf: '',
      birthDate: '',
      phone: '',
      companyName: '',
      cnpj: '',
      companyOpeningDate: '',
      companyPhone: ''
    };

    wrapper = shallowMount(FormStep2, {
      props: { formData }
    });

    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('validates PF form fields', async () => {
    formData.registrationType = 'PF';

   
    formData.name = '123';
    await wrapper.find('form').trigger('submit.prevent');
    expect(window.alert).toHaveBeenCalledWith('Formato de nome inválido.');

    jest.clearAllMocks();

  
    formData.name = 'Lucas Almeida';
    formData.cpf = '12345678900';
    await wrapper.find('form').trigger('submit.prevent');
    expect(window.alert).toHaveBeenCalledWith('Formato de CPF inválido.');

    jest.clearAllMocks();


    formData.cpf = '123.456.789-00';
    formData.birthDate = '01-01-2000';
    await wrapper.find('form').trigger('submit.prevent');
    expect(window.alert).toHaveBeenCalledWith('Formato de Data de nascimento inválido.');

    jest.clearAllMocks();

    formData.birthDate = '01/01/2000';
    formData.phone = '(12) 34567-8901';
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted().validated).toBeTruthy();
    expect(wrapper.emitted().validated[0]).toEqual([formData]);
  });

  it('validates PJ form fields', async () => {
    formData.registrationType = 'PJ';

    formData.companyName = '123';
    await wrapper.find('form').trigger('submit.prevent');
    expect(window.alert).toHaveBeenCalledWith('Formato de Razão social inválido.');

    jest.clearAllMocks();

    formData.companyName = 'Empresa XYZ';
    formData.cnpj = '12345678000100';
    await wrapper.find('form').trigger('submit.prevent');
    expect(window.alert).toHaveBeenCalledWith('Formato de CNPJ inválido.');

    jest.clearAllMocks();

    formData.cnpj = '12.345.678/0001-00';
    formData.companyOpeningDate = '01-01-2000';
    await wrapper.find('form').trigger('submit.prevent');
    expect(window.alert).toHaveBeenCalledWith('Formato de Data de abertura da empresa inválido.');

    jest.clearAllMocks();

    formData.companyOpeningDate = '01/01/2000';
    formData.companyPhone = '(12) 34567-8901';
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted().validated).toBeTruthy();
    expect(wrapper.emitted().validated[0]).toEqual([formData]);
  });

  it('applies CPF mask correctly', async () => {
    const input = wrapper.find('#cpf');
    await input.setValue('12345678900');
    input.trigger('input');
    await wrapper.vm.$nextTick();
  
    expect(input.element.value).toBe('123.456.789-00');
  });
  
  
// Para testar o campo de CNPJ, faça mudança no escopo do formData para PJ;
//   it('applies CNPJ mask correctly', async () => {
//     formData.registrationType = 'PJ';
//     await wrapper.setProps({ formData });
//     await wrapper.vm.$nextTick();
//     const input = wrapper.find('#cnpj');
//     expect(input.exists()).toBe(true);
//     await input.setValue('12345678000100');
//     input.trigger('input');
//     await wrapper.vm.$nextTick();
//     expect(input.element.value).toBe('12.345.678/0001-00');
//   });
  
});
