<template>
<h1>Les évènements</h1>
<div :id="events" v-for="event in events" :key="event"></div>
</template>

<script setup>
import { useDataEventStore } from "../../stores/dataEvent";

const userData = useDataEventStore();
console.log(userData);
</script>
