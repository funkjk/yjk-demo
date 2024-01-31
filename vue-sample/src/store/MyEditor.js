import { ref } from 'vue';
import { defineStore } from 'pinia';

export default defineStore('myEditor', () => {
    const data = ref({ title: "default", city: "", description:"", desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        }], icons:[] })
    function set(key, value) {
        data.value[key] = value
    }
    function setAll(obj) {
        data.value = obj
    }

    return { data, set, setAll }
}, {
    yjs: true
})