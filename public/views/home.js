import m from 'mithril';

export default {
  view: () => {
    const create = async (e) => {
      // Don't navigate the page when submitting the form
      e.preventDefault();

      const statusElement = document.getElementById('status');

      try {
        const res = await m.request({
          method: 'POST',
          url: 'api/slideshow',
          body: { name: document.getElementById('slideshowName') },
        });
        statusElement.innerText = 'Got response: ' + JSON.stringify(res);

        m.route.set('/view/:slideshowId', { slideshowId: res.id });
      } catch (err) {
        statusElement.innerText = 'Got error: ' + err;
      }
    };

    return m('form#createSlideshowForm',
      m('',
        m('label[for=name]', 'Slideshow name'), m('input#slideshowName')
      ),
      m('button', { onclick: create }, 'Create'),
      m('#status')
    );
  }
};