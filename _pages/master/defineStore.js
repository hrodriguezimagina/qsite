import { reactive } from "vue";

let state, store;

function returnFunction(target, prop, args = false){
	return args ? target[prop](args, state) : target[prop](state)
}

function returnProp(target, prop){
	return ( prop == 'state' ? state : target[prop])
}

function getValue(target, prop){	
	return (typeof target[prop] === 'function') ? (args) =>  returnFunction(target, prop, args) : returnProp(target, prop)
}


export default function defineStore (data) {
	state = reactive(data)

	store = new Proxy(state, {
		get: (target, prop) => getValue(target, prop),
		set: function (target, prop, value) {
			return target[prop] = value  
		} 		
	});	

	return new Proxy(store, {
		apply: function(store, thisArg, argumentList) {
		 return store['thisArg'](argumentList, state)
		}
	})
}



 