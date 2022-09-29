export let debounce = false;
export function setDebounce(bool) {
  if(bool) {
    debounce = true;
  } else {
    debounce = false;
  }
}
