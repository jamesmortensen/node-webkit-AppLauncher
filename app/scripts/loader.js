window.addEventListener("load", function() {
  
  var template = new TemplateLoader();
  console.log(global.config);
  var config = global.config;
  var data = config.launchPanel;
  var content = template.render('app/views/launchPanel.tpl', data);
  var html = document.createElement("html");
  html.innerHTML = content;
  var head = html.getElementsByTagName("head")[0];
  var body = html.getElementsByTagName("body")[0];

  document.getElementsByTagName("head")[0].remove();
  document.body.remove();

  document.getElementsByTagName("html")[0].appendChild(head);
  document.getElementsByTagName("html")[0].appendChild(body);

  nodeWebkitWebsiteLauncher = new NodeWebkitWebsiteLauncher();
  document.querySelector(".header_wrapper img").onclick = function() { nodeWebkitWebsiteLauncher.runLoginAndLaunch(); };
},false);