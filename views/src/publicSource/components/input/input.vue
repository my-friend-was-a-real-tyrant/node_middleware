<style lang="less">
    .zd-input{ height: 100%; width: 2.4rem; border: 0 none; outline: 0 none; font-size: .28rem;
        &-noSlot{ width: 4.3rem;}
        &-wrapper{ width: 6.6rem; height: .96rem; border: .01rem solid #dcdcdc; border-radius: .1rem; line-height: .96rem; overflow: hidden; font-size: 0;
            > *{ vertical-align: top;}
        }
        &-icon{ display: inline-block; width: .8rem; height: .94rem; background-size: 100% 100%; background-repeat: no-repeat;
            &-cellphone{ background-image: url(./inputIcon/cellphone.jpg);}
            &-lock{ background-image: url(./inputIcon/lock.jpg);}
            &-person{ background-image: url(./inputIcon/person.jpg);}
            &-identity{ background-image: url(./inputIcon/personV.jpg);}
        }
        &-label{ display: inline-block; height: .94rem; padding-left: .1rem; font-size: .28rem; color: #333; line-height: .96rem;
            &-small{ width: 1.4rem;}
            &-large{ width: 1.95rem;
                + .zd-input-content{ width: 3.8rem;}
            }
        }
        &-content{ display: inline-block; width: 4.35rem; height: .94rem;
            > *{ vertical-align: middle;}
        }
        &-select{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0;
            + input{ width: 100%; background-image: url(./inputIcon/select.jpg); background-repeat: no-repeat; background-size: auto 100%; background-position: center right;}
        }
    }
</style>
<template>
    <div class="zd-input-wrapper">
        <i 
            :class="'zd-input-icon zd-input-icon-' + icon"
        ></i>
        <span 
            class="zd-input-label" 
            :class="'zd-input-label-' + labelSize"
        >{{ label }}</span>
        <div 
            v-if="type === 'select'" 
            class="zd-input-content"
            style="position: relative;"
        >
            <select 
                class="zd-input-select" 
                v-model="selectValue"
            >
                <option value=""></option>
                <option 
                    v-for="item in selectOption" 
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</option>
            </select>
            <input 
                type="text" 
                readonly="readonly"
                :placeholder="placeholder"
                class="zd-input zd-input-noSlot"
                :value="inputValue" />
        </div>
        <div 
            v-else 
            class="zd-input-content"
        >
            <input 
                type="text" 
                :placeholder="placeholder" 
                class="zd-input" 
                :class="$slots.default ? '' : 'zd-input-noSlot'"
                :value="inputValue"
                @input="handleInput" />
            <slot></slot>
        </div>
    </div>
</template>
<script lang="babel">
    export default {
        props: {
            icon: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: 'input'
            },
            label: String,
            labelSize: {
                type: String,
                default: 'small'
            },
            placeholder: String,
            value: {},
            selectOption: {
                type: Array,
                validator(value) {
                    for (let i = 0; i < value.length; i ++) {
                        if (!Object.hasOwnProperty.call(value[i], 'value') || !Object.hasOwnProperty.call(value[i], 'label')) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        },
        data() {
            return {
                inputValue: '',
                selectLabel: '',
                selectValue: ''
            }
        },
        methods: {
            handleInput(e) {
                const value = e.target.value;
                this.inputValue = value;
                this.$emit('input', this.inputValue);
            }
        },
        watch: {
            selectValue(newValue) {
                if (newValue === '') {
                    this.selectLabel = '';
                } else {
                    for (let i = 0; i < this.selectOption.length; i ++) {
                        if (this.selectOption[i].value === newValue) {
                            this.selectLabel = this.selectOption[i].label;
                            break;
                        }
                    }
                }
                this.inputValue = this.selectLabel;
                this.$emit('input', {
                    value: newValue, 
                    label: this.selectLabel
                });
            }
        }
    }
</script>

<!-- 传入icon，label，labelSize，placeholder
value为组件的v-model绑定属性
若是不传type属性，则为input
若为type为select，还需传入一个selectOption -->