import { ref } from 'vue';
import { defineStore } from 'pinia';

export default defineStore('myEditor2', () => {
    const data = ref({ title: "default", city: "" })
    function set(key, value) {
        data.value[key] = value
    }
    function setAll(obj) {
        data.value = obj
    }

    return { data, set, setAll }
}, {
    yjs: false, persist:true
})