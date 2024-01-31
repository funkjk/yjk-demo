<template>
  <v-app>
    <v-main>
      <MyEditor />
    </v-main>
    <notifications position="bottom right">
      <template #body="props">
        <div
          class="vue-notification"
          :style="{ background: props.item.data.color }"
          @click="props.close"
        >
          <p class="notification-title">
            {{ props.item.title }}
          </p>
          <div v-html="props.item.text"></div>
        </div>
      </template>
    </notifications>
  </v-app>
</template>

<script>
import MyEditor from "./components/MyEditor.vue";

export default {
  name: "App",

  components: {
    MyEditor,
  },

  data: () => ({
    //
  }),
};
</script>
