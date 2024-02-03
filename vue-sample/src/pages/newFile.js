/* __placeholder__ */
export default (await import('vue')).defineComponent({
components: {},

data: () => {
return {
title: "",
};
},
methods: {
update(value) {
this.title = value;
},
},
});
