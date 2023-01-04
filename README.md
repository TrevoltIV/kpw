

# Koerner Pressure Washing web app


### End Goal:

A web app which can be used for full customer quoting/checkout experience, as well as an employee portal dashboard for managing jobs and clients.

Clients should be able to sign up, enter their address into the quote estimate system and trace the area they require cleaning at to receive the most accurate quote possible.

They should also have the ability to pay using Stripe within the app upon receiving a quote and scheduling a day for the job to be done. All quotes will show a disclaimer saying that it is not a guaranteed price and may be changed depending on any circumstances.


### TODO Tasks:

1. Fix authentication bugs (user getting logged out after refresh on dashboard page, and getUserData() returning a promise instead of an array)
2. Design client dashboard for quoting, scheduling, and payment.
3. Design employee dashboard for managing jobs and clients.
4. Design admin dashboard for managing employees and all other priveleges