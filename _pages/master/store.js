import defineStore from "./defineStore"
import { reactive, watch } from "vue";
import cache from '@imagina/qsite/_plugins/cache'

const _store = {
	count: 0, 
	user: { name: 'pepito', lastname: 'perez'},
	getCount: (state) => state.count,
	getName: (state) => 'my name is :'+ state.user.name,
	getFullName: (args, state) => state.user.name + args.separator + args.lastname,	
	//reset: (state) => Object.assign(state, reactive({...store}))
}

const store = defineStore(_store)

/* methods */
/* with computed function*/
store.state.add = (number) => store.getCount() * number  

/* with store.state */
//store.add = (number) => store.state.count * number 

/* with state*/
//store.add = (number, state) => state.count * number 



watch(
  () => store,
  (count) => {
    console.dir(count)
  }
)



export default store