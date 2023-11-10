import { mount } from '@vue/test-utils';
import SimpleImageClassifier from '@/components/SimpleImageClassifier.vue';

describe('SimpleImageClassifier', () => {
  it('should render the input element', () => {
    const wrapper = mount(SimpleImageClassifier);
    expect(wrapper.find('input[type="file"]').exists()).toBe(true);
  });

  it('should display an image when a file is uploaded', async () => {
    const wrapper = mount(SimpleImageClassifier);
    const file = new File([''], 'image.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } };
    await wrapper.vm.classifyImage(event);
    expect(wrapper.find('img').exists()).toBeTruthy();
    expect(wrapper.find('img').attributes('src')).toContain('image.jpg');
  });

  it('should display a classification result after an image is uploaded', async () => {
    const wrapper = mount(SimpleImageClassifier);
    const file = new File([''], 'image.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } };
    await wrapper.vm.classifyImage(event);
    expect(wrapper.find('p').exists()).toBeTruthy();
    expect(wrapper.find('p').text()).toContain('cat' || 'dog');
  });
});