export function getSecretpage(req, res) {
  const user = req.user;
  res.render("secret.ejs", { user: user });
}
