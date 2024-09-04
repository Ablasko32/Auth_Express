export function getSecretpage(req, res) {
  const user = req.user[0];
  res.render("secret.ejs", { user: user });
}
