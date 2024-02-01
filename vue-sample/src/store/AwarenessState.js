import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export default defineStore('awarenessState', () => {
    const data = ref({})
    const currentClientID = ref(0)
    function setCurrentClientID(clientID) {
        currentClientID.value = clientID
    }
    function set(key, value) {
        data.value[key] = value
    }
    function setAll(obj) {
        data.value = obj
    }

    const currentUser = computed(() => data.value[currentClientID.value])
    const otherUsers = computed(() => {
        const ret = {}
        for (let key in data.value) {
            if (key != currentClientID.value) {
                ret[key] = data.value[key]
            }
        }
        return ret
    })

    return { data, set, setAll, setCurrentClientID, currentUser, currentClientID, otherUsers }
}, {
    yjs: false, persist: true
})