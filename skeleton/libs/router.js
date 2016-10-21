function Router(node, routes) {
  this.node = node;
  this.routes = routes;
}

Router.prototype.start = function () {
  window.addEventListener("hashchange",() => this.render() )
  this.render()
};

Router.prototype.render = function () {
  this.node.innerHTML = ""
  let component = this.activeRoute()
  if (component) {
    let node = component.render();
    // let p = document.createElement("p")
    // p.innerHTML = currentRoute;
    this.node.appendChild(node)
  }
};


Router.prototype.activeRoute = function () {
  let frag = window.location.hash
  return this.routes[frag.slice(1)]
};

module.exports = Router;
