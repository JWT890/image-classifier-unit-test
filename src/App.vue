<template>
  <div id="app">
    <header>
      <h1>Image Classifier App</h1>
    </header>
    <main>
      <SimpleImageClassifier />
    </main>
  </div>
</template>

<script>
import SimpleImageClassifier from './components/SimpleImageClassifier.vue';

export default {
  components: {
    SimpleImageClassifier,
  },
};
</script>