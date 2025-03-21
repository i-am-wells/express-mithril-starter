import m from 'mithril';
import '../style.css';

export default {
  view: (vnode) => {
    return m('.container', [
      m('h1.title', 'Photo Party'),
      vnode.children
    ]);
  }
}