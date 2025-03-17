import m from 'mithril';
import '../style.css';

export default {
  view: (vnode) => {
    return m('.container', vnode.children);
  }
}