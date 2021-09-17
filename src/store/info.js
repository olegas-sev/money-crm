import firebase from 'firebase/app'
export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            // Apply fetched data to our empty state
            state.info = info
        },
        clearInfo(state) {
            // Clear state and its info to prevent bugs when we log out
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({ dispatch, commit }) {
            try {
                // Get uid of logged in user that we defined in auth store
                const uid = await dispatch('getUid')
                // Point to a certain user 
                const info = (await firebase.database().ref(`users/${uid}/info`).once('value')).val()
                // Set info we fetched ˆˆˆˆˆˆˆˆˆ
                commit('setInfo', info)
            } catch (e) {

            }
        }
    },
    getters: {
        info: state => state.info
    }
}