<template>
    <header class="flex justify-between item">
      <h1 class="text-xl font-bold m-4"> {{ props.title }} </h1>
      <slot name="header-right"></slot>
    </header>
    <main>
      <h2 class="m-2 text-l"> {{ props.secondTitle }}</h2>
      <slot name="description">
        
      </slot>
      <slot name="detail">

      </slot>
      <slot name="footer">

      </slot>
    </main>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  secondTitle: {
    type: String
  },
  headerFunction: {
    type: Function
  },
  description: {
    type: String
  }
});

</script>

<style scoped></style>