import { mount } from '@vue/test-utils';
import SimpleImageClassifier from '@/components/SimpleImageClassifier.vue';

describe('SimpleImageClassifier', () => {
  test('classifyImage sets the imageUrl and result correctly', () => {
    // Create a mock file object
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });

    // Create a wrapper for the component
    const wrapper = mount(SimpleImageClassifier);

    // Mock the FileReader and axios
    const readerMock = {
      readAsDataURL: jest.fn(),
      onload: null
    };
    global.FileReader = jest.fn(() => readerMock);
    global.axios = {
      get: jest.fn(() => Promise.resolve({ data: { labels: { dog: 'Dog', cat: 'Cat' } } }))
    };

    // Trigger the classifyImage method
    wrapper.vm.classifyImage({ target: { files: [file] } });

    // Simulate the FileReader.onload event
    readerMock.onload({ target: { result: 'test-image-url' } });

    // Check that the imageUrl and result have been set correctly
    expect(wrapper.vm.imageUrl).toBe('test-image-url');
    expect(wrapper.vm.result).toBe(null);
  });
});