import { getLibs } from '../../scripts/utils.js';

export default async function init(el) {
  const { textContent } = el;
  el.innerHTML = '';
  const textArr = textContent.trim().split(',');
  const hello = textArr[0] || 'Hello';
  const name = textArr[1] || 'World';
  const { createTag, loadScript } = await import(`${getLibs()}/utils/utils.js`);
  const helloEl = createTag('h2', { class: 'hello-title' }, `${hello},`);
  const nameEl = createTag('p', { class: 'hello-name' }, name.trim());
  el.append(helloEl, nameEl);
  if (textArr[0] || textArr[1]) {
    await loadScript('/deps/gsap.min.js');
    if (textArr[0]) window.gsap.to(helloEl, { x: 200 });
    if (textArr[1]) window.gsap.to(nameEl, { x: 400 });
  }
  const qResp = await fetch('/blog/query-index.json');
  const qJson = await qResp.json();
  console.log(qJson);
  const list = createTag('ul', { class: 'blog-list-container' });
  for (const post of qJson.data) {
    //const resp = await fetch(`${post.path}.plain.html`);
    //if (!resp.ok) return;
    const li = createTag('li', { class: 'blog-list-item' }, post.description);
    list.append(li);
  }
  el.append(list);
}
