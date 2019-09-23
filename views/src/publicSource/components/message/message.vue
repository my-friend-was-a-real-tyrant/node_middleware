<style lang="less">
    .zd-message{ padding: .36rem; border-radius: .1rem; background-color: rgba(0, 0, 0, .4); color: #fff; font-size: .3rem;
        // &-fade{
        //     &-enter, &-leave-active{ opacity: 0; transform: translate(-50%, -100%);}
        // }
        &-wrapper{ position: absolute; top: 0; left: 0; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; text-align: center;}
    }
    .zd-message-fade-enter-active, .zd-message-fade-leave-active{ transition: all .5s cubic-bezier(.55,0,.1,1);}
    .zd-message-fade-enter, .zd-message-fade-leave-active{ opacity: 0;}
</style>
<template>
    <transition appear name="zd-message-fade">
        <div class="zd-message-wrapper">
            <div class="zd-message">
                <p class="zd-message-word" v-for="word in message">{{ word }}</p>
            </div>
        </div>
    </transition>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                message: [],
                closed: false,
                timer: null
            }
        },
        watch: {
            closed(newValue) {
                if (newValue) {
                    // this.$el.addEventListener('transitionend', this.destroyElement);
                    this.destroyElement();
                }
            }
        },
        methods: {
            destroyElement() {
                // this.$el.removeEventListener('transitionend', this.destroyElement);
                this.$destroy();
                this.$el.parentNode.removeChild(this.$el);
            },
            startTimer() {
                this.timer = setTimeout(() => {
                    if (!this.closed) {
                        this.closed = true;
                    }
                }, 2000);
            }
        },
        mounted() {
            this.startTimer();
        }
    }
</script>