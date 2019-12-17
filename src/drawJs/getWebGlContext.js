import { getWebGLContext } from '../lib/cuon-utils';
export default function getGl(element) {
  const canvas = document.getElementById(element);
  console.log(canvas)
  const gl = getWebGLContext(canvas);
  return gl;
}
