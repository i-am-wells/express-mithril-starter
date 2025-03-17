import m from 'mithril';

import Layout from './views/layout';
import Home from './views/home';

m.route(document.body, '/', {
  '/': {
    render: () => { 
      return m(Layout, m(Home));
    },
  }
});