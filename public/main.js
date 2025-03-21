import m from 'mithril';

import Layout from './views/layout.js';
import Home from './views/home.js';

m.route(document.body, '/', {
  '/': {
    render: () => {
      return m(Layout, m(Home));
    }
  },
});