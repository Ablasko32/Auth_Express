import csrf from "csrf-token";

// Generate csrf middlewere
export function CsrfMiddlewere(req, res, next) {
  csrf.create(req.session.id).then((token) => {
    res.locals.csrfToken = token;
    res.csrfToken = () => token;
    next();
  });
}

// Verify middlewere
export function CSRFProtected(req, res, next) {
  const token = req.body._csrf || req.query._csrf || req.headers["csrf-token"];
  csrf.verify(req.session.id, token, (matches) => {
    if (matches) {
      next();
    } else {
      res.status(403).send("CSRF TOKEN VALIDATION FAILED");
    }
  });
}
