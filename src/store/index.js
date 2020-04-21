import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import paypal from '@paypal/checkout-components'
import client from 'braintree-web/client'
import paypalCheckout from 'braintree-web/paypal-checkout'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    client_token: undefined,
    order_id: undefined,
    nonce: undefined,
    first: undefined,
    last: undefined,
  },
  mutations: {
    SET_CLIENT_TOKEN(state, token) {
      state.client_token = token
    },
    SET_PAYPAL_ORDER_ID(state, value) {
      state.order_id = value
    },
    SET_PAYPAL_NONCE(state, value) {
      state.nonce = value
    },
    SET_CUSTOMER_FIRST_NAME(state, value) {
      state.first = value
    },
    SET_CUSTOMER_SURNAME(state, value) {
      state.last = value
    },
  },
  actions: {
    getClientToken ({commit, dispatch}) {
      axios.get('http://staging.city-tour-berlin.de/2020//wp-json/warenkorb/v2/paypaltoken')
        .then(result => {
          commit('SET_CLIENT_TOKEN', result.data)
          dispatch('initPaypal')
        })
    },
    initPaypal ({ state, getters, dispatch, commit }) {
      client
        .create({
          authorization: state.client_token,
        })
        .then(function(clientInstance) {
          return paypalCheckout.create({
            client: clientInstance,
          })
        })
        .then(function(paypalCheckoutInstance) {
          return paypal.Button.render(
            {
              env: 'sandbox', // or 'sandbox'
              commit: true,
              style: {
                shape: 'rect',
                size: 'responsive',
                label: 'buynow',
                branding: true,
                tagline: false,
              },
              payment: function() {
                return paypalCheckoutInstance.createPayment({
                  flow: 'checkout',
                  amount: getters.totalPrice,
                  currency: 'EUR',
                  enableShippingAddress: false,
                })
              },
              onAuthorize: function(data) {
                commit('SET_PAYPAL_ORDER_ID', data.orderID)
                return paypalCheckoutInstance
                  .tokenizePayment(data)
                  .then(function(payload) {
                    commit(
                      'SET_PAYPAL_NONCE',
                      payload.nonce
                    )
                    commit(
                      'SET_CUSTOMER_FIRST_NAME',
                      payload.details.firstName
                    )
                    commit(
                      'SET_CUSTOMER_SURNAME',
                      payload.details.lastName
                    )
                  })
              },
              onCancel() {
              },
              onError: function() {
              },
            },
            '#paypal-button'
          )
        })
        .catch(function(err) {
          console.error('Error!', err)
        })
    }
  },
  getters: {
      totalPrice: () => 25.3
  },
  modules: {
  }
})
