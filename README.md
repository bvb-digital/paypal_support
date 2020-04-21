# paypal_support

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Instructions

- there are two branches `version4-error` and `version5-no-import`
- after checking out one of the branches run `npm install` and then `npm run serve`.

### version4-error
1.  set your browsers network settings to a slower traffic speed in order to capture the error best
1.  reload the page
1. open the developer console
1. before the 'Buy now' tagline appears click the button. This is likely to happen for users with autofilled e-mail addresses and a slow internet connection.
1. in the console the error `ppxo_button_pre_template_click` appears

### version5-no-import

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
