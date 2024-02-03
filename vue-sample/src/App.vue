/<template>
  <v-app>
    <v-main>
      <v-layout class="rounded rounded-md">
        <v-app-bar>
          <template #title>
            <div>
              <v-btn icon="mdi-menu" @click="drawer = !drawer" />
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

        <v-navigation-drawer v-model="drawer">
          <v-list>
            <v-list-item>
              <a href="/simple"> Simple Text Sample</a>
            </v-list-item>
            <v-list-item>
              <a href="/editor"> Editor</a>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main
          class="d-flex align-center justify-center"
          style="min-height: 300px"
        >
          <component :is="currentPageComponent"></component>
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
import HelloWorld from "./pages/HelloWorld.vue";
import MyEditor from "./pages/MyEditor.vue";
import SimpleText from "./pages/SimpleText.vue";
import useAwarenessStateStore from "@/store/AwarenessState";

export default {
  name: "App",

  components: {
    HelloWorld,
    MyEditor,
    SimpleText,
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
    currentPageComponent() {
      const path = document.location.pathname;
      if (path == "/editor") {
        return MyEditor;
      } else if (path == "/simple") {
        return SimpleText;
      } else {
        return HelloWorld;
      }
    },
  },

  data: () => ({
    drawer: null,
  }),
};
</script>
