import { getWebGLContext } from '../lib/cuon-utils';
export default function getGl(element) {
  const canvas = document.getElementById(element);
  const gl = getWebGLContext(canvas);
  return gl;
}
