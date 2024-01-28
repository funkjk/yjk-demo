<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      {{ data }}
      <v-text-field
        label="My titile"
        :model-value="data.title"
        @update:modelValue="changeValue('title', $event)"
      ></v-text-field>
      <v-select
        label="Select City"
        :model-value="data.city"
        @update:modelValue="changeValue('city', $event)"
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
      ></v-select>
    </v-main>
  </v-layout>
</template>
  <script>

import useMyEditorStore from "@/store/MyEditor";
export default {
  inject: ["ymap"],
  setup() {
    const editorStore = useMyEditorStore();
    const { set, setAll } = editorStore;

    return { set, setAll };
  },
  computed: {
    data() {
        return useMyEditorStore().data
    },
  },

  data: () => {

    return {};
  },
  methods: {
    changeValue(key, value) {
      this.ymap.set(key, value);
    },
  },
};
</script>
  