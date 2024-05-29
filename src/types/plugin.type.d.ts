export { }
declare module 'vue' {
  interface ComponentCustomProperties {
    $apiGet: Function
    $apiPost: Function
  }
}