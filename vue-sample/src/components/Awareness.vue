<template>
  <div :class="`awareness-target`" ref="target">
    <slot></slot>
    <div class="notify">
      <div v-for="(userState, userId) in otherUsers" :key="userId">
        <v-tooltip
          location="top center"
          origin="auto"
          v-if="userState.focus && userState.focus.target == name"
        >
          <template v-slot:activator="{ props }">
            <div>
              <v-icon v-bind="props" :color="userState.user.color"
                >mdi-face</v-icon
              >
            </div>
          </template>
          <div>User {{ userState.user.name }} edit {{ name }}</div>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>
  
  <script>
import yjs from "@/middleware/yjs";
const awareness = yjs.awareness;

import useAwarenessStateStore from "@/store/AwarenessState";

export default {
  props: ["name"],
  name: "Awareness",
  mounted() {
    const el = this.$refs.target;
    const targets = el.querySelectorAll(
      "a[href], button, input, textarea, select, details, [tabindex]"
    );
    targets.forEach((element) => {
      element.addEventListener("focus", () => {
        awareness.setLocalStateField("focus", { target: this.name });
      });
      element.addEventListener("blur", () => {
        // awareness.setLocalStateField("focus", undefined);
      });
    });
  },
  computed: {
    awarenessState() {
      const awarenessState = useAwarenessStateStore().data;
      return awarenessState;
    },
    otherUsers() {
      return useAwarenessStateStore().otherUsers;
    },
  },
};
</script>
  <style scoped>
.awareness-target {
  position: relative;
}
.notify {
  position: absolute;
  top: 5px;
  right: 0;
  display: flex;
  justify-content: flex-end;
}
</style>