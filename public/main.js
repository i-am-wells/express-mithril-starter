import m from 'mithril';

import Layout from './views/layout.js';
import Home from './views/home.js';
import View from './views/view.js';

m.route(document.body, '/', {
  '/': {
    render: () => {
      return m(Layout, m(Home));
    }
  },
  '/view/:id': {
    render: (vnode) => {
      return m(Layout, m(View, { id: vnode.attrs.id }));
    }
  },
  '/add/:id': {
    render: () => {
      return m(Layout, m(Add))
    }
  }
});