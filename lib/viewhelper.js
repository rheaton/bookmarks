var linkToUnlessCurrent = function(path, text, current) {
  if(path != current) {
    return "<a href=\"" + path + "\">" + text + "</a>";
  } else {
    return text;
  }
};

var navLink = function(path, text, current) {
  cssClass = (path != current) ? "" : "current"
  return "<li class=\"" +  cssClass + "\">" + linkToUnlessCurrent(path, text, current) + "</li>";
}
currentPath = function(req, res, next) {
  // console.log("saving url", req.url);
  res.locals.current = req.url;
  res.locals.linkToUnlessCurrent = linkToUnlessCurrent;
  res.locals.navLink = navLink;
  next();
};

exports.currentPath = currentPath;
