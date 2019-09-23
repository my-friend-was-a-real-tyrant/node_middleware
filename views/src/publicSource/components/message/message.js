import Vue from 'vue';

const MessageConstructor = Vue.extend(require('./message.vue'));

const Message = (options) => {
    if (typeof options === 'string') {
        options = {
            message: [options]
        };
    }
    const instance = new MessageConstructor({
        data: options
    });
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    return instance.vm;
};

export default Message;