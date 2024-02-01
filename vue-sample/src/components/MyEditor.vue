<template>
  <v-container>
    <v-row justify="start">
      <v-col cols="12" sm="12">
        data:
        <v-sheet class="d-flex align-start mb-6 bg-surface-variant">
          {{ data }}
        </v-sheet>
      </v-col>
    </v-row>
    <v-row justify="start">
      <v-col cols="12" sm="12">
        awarenessState:
        <v-sheet class="d-flex align-start mb-6 bg-surface-variant">
          {{ awarenessState }}
        </v-sheet>
      </v-col>
    </v-row>
    <v-row justify="start">
      <v-col cols="12" sm="6">
        <awareness name="title">
          <v-text-field
            label="My titile"
            :model-value="data.title"
            @update:modelValue="changeValue('title', $event)"
          ></v-text-field>
        </awareness>
      </v-col>
      <v-col cols="12" sm="6">
        <awareness name="city">
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
        </awareness>
      </v-col>
      <v-col cols="12" sm="12">
        <div class="d-flex justify-space-around">
          <span
            v-for="icon in [
              'airplane',
              'account',
              'headphones',
              'bitcoin',
              'bird',
            ]"
            :key="icon"
          >
            <awareness :name="'icon-' + icon">
              <v-btn
                :icon="`mdi-${icon}`"
                @click="changeIconSelect(icon)"
                :color="
                  data.icons.includes(icon) ? 'primary' : 'indigo-lighten-4'
                "
              />
            </awareness>
          </span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <awareness name="descritpion">
          <v-textarea
            label="descritpion"
            auto-grow
            @update:modelValue="changeValue('descritpion', $event)"
            :model-value="data.descritpion"
          >
          </v-textarea>
        </awareness>
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
</template>
  <script>
import useMyEditorStore from "@/store/MyEditor";
import useAwarenessStateStore from "@/store/AwarenessState";
import MyGrid from "./MyGrid.vue";
import Awareness from "./Awareness.vue";
export default {
  components: { MyGrid, Awareness },
  setup() {
    const editorStore = useMyEditorStore();
    const { set, setAll } = editorStore;

    return { set, setAll };
  },
  computed: {
    data() {
      return useMyEditorStore().data;
    },
    awarenessState() {
      return useAwarenessStateStore().data;
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
  