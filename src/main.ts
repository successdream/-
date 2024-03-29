import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import iView from 'iview';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

Vue.use(ElementUI, { size: 'mini' });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
