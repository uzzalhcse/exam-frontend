const getters = {
  // Auth User
  token: state => state.auth.token,
  name: state => state.auth.name,
  roles: state => state.auth.roles,
  auth: state => state.auth.info,
  // Accessed Routes
  private_routes: state => state.permission.routes,
  //  Application
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device
}
export default getters
