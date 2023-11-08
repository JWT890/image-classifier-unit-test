<template>
  <div>
    <input type="file" accept="image/*" @change="classifyImage" />
    <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" style="max-width: 300px;" />
    <p v-if="result">{{ result }}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      imageUrl: null,
      result: null,
    };
  },
  methods: {
    classifyImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      axios.get('/data.json')
        .then((response) => {
          const data = response.data;
          const labels = data.labels;
          const prediction = Math.random() < 0.5 ? "cat" : "dog";
          this.result = labels[prediction];
        });
    },
  }, 
};
</script>