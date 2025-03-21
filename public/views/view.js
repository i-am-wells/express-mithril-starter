import m from 'mithril';

export default {
  view: (vnode) => {
    return m('p', 'View ' + vnode.attrs.id);
  }
};