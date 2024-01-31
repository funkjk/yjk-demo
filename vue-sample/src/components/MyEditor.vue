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
      <v-container>
        <v-sheet class="d-flex align-start mb-6 bg-surface-variant">
          {{ data }}
        </v-sheet>

        <v-row justify="start">
          <v-col cols="12" sm="6">
            <v-text-field
              label="My titile"
              :model-value="data.title"
              @update:modelValue="changeValue('title', $event)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          <v-col cols="12" sm="12">
            <div class="d-flex justify-space-around">
              <v-icon
                v-for="icon in [
                  'airplane',
                  'account',
                  'headphones',
                  'bitcoin',
                  'bird',
                ]"
                :key="icon"
                @click="changeIconSelect(icon)"
                :color="
                  data.icons.includes(icon) ? 'primary' : 'indigo-lighten-4'
                "
                >mdi-{{ icon }}</v-icon
              >
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              label="descritpion"
              auto-grow
              @update:modelValue="changeValue('descritpion', $event)"
              :model-value="data.descritpion"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <my-grid
              :model-value="data.desserts"
              @input="changeValue('desserts', $event)"
            ></my-grid>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
  <script>
import useMyEditorStore from "@/store/MyEditor";
import useMyEditorStore2 from "@/store/MyEditor2";
import MyGrid from "./MyGrid.vue";
export default {
  components: { MyGrid },
  setup() {
    const editorStore = useMyEditorStore();
    const { set, setAll } = editorStore;

    return { set, setAll };
  },
  computed: {
    data() {
      const editorStore2 = useMyEditorStore2();
      console.log(editorStore2.data);

      return useMyEditorStore().data;
    },
  },

  data: () => {
    return {};
  },
  methods: {
    changeValue(key, value) {
      this.set(key, value);
    },
    changeIconSelect(icon) {
      let selectedIcons = this.data.icons;
      if (selectedIcons.includes(icon)) {
        selectedIcons = selectedIcons.filter((e) => e != icon);
      } else {
        selectedIcons = selectedIcons.concat(icon);
      }
      this.set("icons", selectedIcons);
    },
  },
};
</script>
  