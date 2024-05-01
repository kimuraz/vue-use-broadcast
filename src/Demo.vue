<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useBroadcast } from "./main.ts";

const { subscribeToChannel, receivedMessages, postMessage, closeChannel } = useBroadcast();
const msg = ref<string>("");

onMounted(() => {
  subscribeToChannel();
});

const sendMessage = () => {
  postMessage(msg.value);
  msg.value = "";
};

onBeforeUnmount(() => {
  closeChannel();
});
</script>

<template>
  <div>
    <input type="text" v-model="msg"/>
    <button @click="sendMessage">Send</button>

    <p v-for="(message, idx) in receivedMessages" :key="idx">
      {{ message }}
    </p>
  </div>
</template>

<style scoped>

</style>