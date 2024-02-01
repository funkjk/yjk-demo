<template>
  <v-app>
    <v-main>
      <v-layout class="rounded rounded-md">
        <v-app-bar>
          <template #title>
            <div>
              Application :
              <span
                v-if="currentUser"
                :style="{ color: currentUser.user.color }"
              >
                User={{ currentUser.user.name }}
              </span>
            </div>
          </template>
          ({{ currentClientID }})
        </v-app-bar>

        <!-- <v-navigation-drawer>
          <v-list>
            <v-list-item title="Navigation drawer"></v-list-item>
          </v-list>
        </v-navigation-drawer> -->

        <v-main
          class="d-flex align-center justify-center"
          style="min-height: 300px"
        >
          <MyEditor />
        </v-main>
      </v-layout>
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
import useAwarenessStateStore from "@/store/AwarenessState";

export default {
  name: "App",

  components: {
    MyEditor,
  },

  computed: {
    currentClientID() {
      const awarenessState = useAwarenessStateStore();
      return awarenessState.currentClientID;
    },
    currentUser() {
      const awarenessState = useAwarenessStateStore();
      return awarenessState.currentUser;
    },
  },

  data: () => ({
    //
  }),
};
</script>
