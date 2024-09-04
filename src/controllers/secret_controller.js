export function getSecretpage(req, res) {
  const user = req.user[0];
  console.log(user);
  res.render("secret.ejs", { user: user });
}
