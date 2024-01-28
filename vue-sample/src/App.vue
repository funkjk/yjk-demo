<template>
  <v-app>
    <v-main>
      <MyEditor/>
    </v-main>
  </v-app>
</template>

<script>
import MyEditor from './components/MyEditor.vue'

export default {
  name: 'App',

  components: {
    MyEditor
  },

  data: () => ({
    //
  }),
}
</script>
