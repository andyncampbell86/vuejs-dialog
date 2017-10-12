/**
 * Created by Emmy on 10/11/2017.
 */

import Vue from 'vue'
import Plugin from '../../../src/plugin/js/index'
import {clickNode} from '../../../src/plugin/js/utilities'
import {getElem} from './helpers'
import {createLocalVue} from 'vue-test-utils'
import Promise from 'promise-polyfill'

export function setupVmWithLocalVue() {
    let LocalVue = createLocalVue()
    LocalVue.config.productionTip = false
    LocalVue.use(Plugin)

    let node = document.createElement("div")
    node.id = 'app'
    document.querySelector('body').appendChild(node)

    return (new LocalVue({
        methods: {
            triggerAlert(){
                return this.$dialog.alert('Simple Alert')
            },
            triggerConfirm(){
                return this.$dialog.confirm('Please confirm')
            },
            clickDialogBtn
        }
    })).$mount(node)
}

function clickDialogBtn(type = 'ok', idx = null) {
    let node, nodes = (type === 'ok') ? getElem('dg-btn--ok') : getElem('dg-btn--cancel')

    if (nodes.length > 0) {
        if (idx === null) {
            // click the last
            clickNode(nodes[nodes.length - 1])
        } else if (idx === true) {
            // click all
            for (let i = 0; i < nodes.length; i++) {
                clickNode(nodes[i])
            }
        } else {
            // click at index
            (node = nodes[parseInt(idx)]) && clickNode(node)
        }
    }
}