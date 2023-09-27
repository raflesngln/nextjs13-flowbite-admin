adapter: Adapters.Prisma.Adapter({
  prisma,
  modelMapping: {
    User: 'user',
    Account: 'account',
    Session: 'session',
    VerificationRequest: 'verificationRequest'
  }
})