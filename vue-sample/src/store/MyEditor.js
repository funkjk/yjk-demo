import { ref } from 'vue';
import { defineStore } from 'pinia';
// export const useMyEditorStore = defineStore('counter', {
//     state: () => ({data:{ title: "", city: "" }}),
//     actions: {
//         set(key, value) {
//             this.data[key] = value
//         },
//         setAll(obj) {
//             this.data = obj
//         },
//     },
// })

export default defineStore('myEditor', () => {
    const data = ref({title:"default", city:""})
    function set(key, value) {
            data.value[key] = value
            // ymp.setItem(key, value)

    }
    function setAll(obj) {
        console.log("setAll,",obj)
            data.value = obj
    }
  
    return { data, set, setAll }
  })