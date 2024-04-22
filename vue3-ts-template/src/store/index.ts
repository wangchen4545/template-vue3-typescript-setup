import { reactive } from "vue";
const store = {
    state: reactive({
        holdData: {}
    }),
    setHoldDataAction(newValue:object) {
        this.state.holdData = newValue
    },
    clearHoldDataAction() {
        this.state.holdData = {}
    },   
}

export default store