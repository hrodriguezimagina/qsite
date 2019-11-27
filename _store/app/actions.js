//Plugins
import config from '@imagina/qsite/_config/master/index'
import cache from '@imagina/qhelper/_plugins/cache'
import {Loading} from 'quasar'

export const REFRESH_PAGE = ({state, commit, dispatch, getters}) => {
  return new Promise(async (resolve, reject) => {
    let currentRoute = state.currentRoute
    Loading.show()
    commit('LOAD_PAGE', false)
    await cache.restore(config('app.saveCache.refresh'))//Reset cache
    await dispatch('quserAuth/AUTH_UPDATE', null, {root: true}).catch(error => {})//Update user data
    /*//==== validate permissions of route
    if(currentRoute &&  currentRoute.meta && currentRoute.meta.permission)
      if(!getters['quserAuth/hasAccess'](currentRoute.meta.permission))*/
    commit('LOAD_PAGE', true)
    Loading.hide()
    resolve(true)
  })
}

//Reset values form Store
export const RESET_STORE = ({commit, dispatch}) => {
  return new Promise((resolve, reject) => {
    let stores = config('app.resetStores') || []
    stores.forEach(name => commit(name, null, {root: true}))
    resolve(true)
  })
}