<style lang="less">
    .zd-tabs{
        &-wrapper{ display: flex; flex-direction: column;}
        &-nav{
            &-wrapper{ flex-shrink: 0; display: flex; height: .96rem; line-height: .96rem;}
            &-item{ flex-basis: 0; flex-grow: 1; height: 100%; border-bottom: .01rem solid #dcdcdc; background-color: #fff; font-size: .28rem; text-align: center; color: #333;
                &-active{ border-bottom-color: #e9be6d; border-bottom-width: .03rem; color: #e9be6d;}
                &-words{ position: relative;}
                &-tips{ position: absolute; top: -.15rem; right: -.15rem; width: .3rem; height: .3rem; border-radius: 50%; background-color: #f94f4f; color: #fff; font-size: .2rem; text-align: center; line-height: .3rem;}
            }
        }
        &-contain{ flex-grow: 1;}
    }
</style>
<template>
    <div class="zd-tabs-wrapper">
        <div class="zd-tabs-nav-wrapper">
            <div 
                class="zd-tabs-nav-item" 
                v-for="item in nav" 
                :key="item.name"
                :class="activeName === item.name 
                    ? 'zd-tabs-nav-item-active' 
                    : ''"
                @click="handleClick(item.name)"
            >
                <span class="zd-tabs-nav-item-words">{{ item.label }}<i v-if="item.tips > 0" class="zd-tabs-nav-item-tips">{{ item.tips <= 99 ? item.tips : 99 }}</i></span>
            </div>
        </div>
        <slot class="zd-tabs-contain"></slot>
    </div>
</template>
<script lang="babel">
    export default {
        // props: {
        //     tips: {
        //         type: Number,
        //     }
        // },
        data() {
            return {
                nav: [],
                // activeName: ''
            }
        },
        computed: {
            activeName() {
                return this.$route.params.tabName
            }
        },
        methods: {
            handleClick(name) {
                this.$emit('changeTabName', [name]);
                // this.activeName = name;
            },
            activeNameChange() {
                let bool = false;
                for (let i = 0; i < this.$slots.default.length; i ++) {
                    if (this.$slots.default[i].elm.nodeType && this.$slots.default[i].elm.nodeType === 1) {
                        if (this.$slots.default[i].componentInstance.active === true) {
                            this.$slots.default[i].componentInstance.active = false;
                            if (bool === false) {
                                bool = true;
                            } else {
                                break;
                            }
                        }
                        if (this.$slots.default[i].componentInstance.name === this.activeName) {
                            this.$slots.default[i].componentInstance.active = true;
                            if (bool === false) {
                                bool = true;
                            } else {
                                break;
                            }
                        }
                    }
                }
            },
            tipsNumberChange(index, n) {
                this.nav[index].tips = n;
            } 
        },
        mounted() {
            for (let i = 0; i < this.$slots.default.length; i ++) {
                if (this.$slots.default[i].elm.nodeType === 1) {
                    this.nav.push({
                        label: this.$slots.default[i].componentInstance.label,
                        name: this.$slots.default[i].componentInstance.name,
                        tips: 0,
                    });
                }
            }
            // this.activeName = this.nav[0].name;
            if (!this.$route.params.tabName) {
                this.handleClick(this.nav[0].name);
            }
        //     console.log('mounted');
            this.activeNameChange();
            this.$watch('activeName', function() {
                this.activeNameChange();
            });
        }
        // watch: {
        //     activeName() {
        //         if (this.$slots.default._rendered === true) {
        //             this.activeNameChange();
        //         }
        //     }
        // }
    }
</script>