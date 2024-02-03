<template>
  <v-container>
    <v-row justify="start">
      <v-col cols="12" sm="12">
        text:
        <v-sheet class="d-flex align-start mb-6 bg-surface-variant">
          {{ text }}
        </v-sheet>
      </v-col>
    </v-row>
    <v-row justify="start">
      <v-col cols="12" sm="12">
        <v-textarea
          label="My Text"
          auto-grow
          :model-value="text"
          @update:modelValue="update($event)"
        >
        </v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>
  <script>
import yjsUtil from "@/utils/yjsUtil";

import yjs from "@/middleware/yjs";
export default {
  mounted() {
    const ytext = yjs.ydoc.getText("my text");
    this.ytext = ytext;
    ytext.observe(() => {
      this.text = ytext.toString();
    });
  },
  components: {},

  data: () => {
    return {
      text: "",
      ytext: null,
    };
  },
  methods: {
    update(value) {
      const delta = yjsUtil.toDeltaText(this.text, value);
      console.log("update delta:",delta)
      this.ytext.applyDelta(delta);
    },
  },
};
</script>
  