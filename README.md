## How to run test on local
0. Make sure you have `node > 18` on the host machine

    If you have `nvm` simple run `nvm install` in the project directory

1. Install dependencies
```
npm install
```

3. Setup `.env` file. See `.env.example` to find out which variables you need to define.

2. Run tests locally
```
npm run test
```

By default it runs in Chrome browser. Feel free to change the browser by overriding parameter as the following

```
npm run test -- --browser electron
```

### Run tests on CI
1. Navigate to the [GitHub Action workflow file](https://github.com/tikolakin/photest/actions/workflows/cypress-test.yaml)
1. Chose to "Run workflow" (you can specify parameters as you need)
1. Click "Run workflow"

*Note:* let me know if you might need permissions to run workflow.
![workflow complete](/bugs/content/workflow-complete.png)

## Bugs

1. [First Name and Last Name fields are not displayed as required](./bugs/1-required-fields.md)
1. [Incorrect valid until date in the confirmation email](./bugs/2-invalid-valid-to.md)
1. [Other option constantly displayed as required](./bugs/3-other-option-constantly-displayed-as-required.md)
4. [Incomplete payment validation user friendly message](./bugs/4-payment-validation-message.md)

## Notes
The website under a test has quite friendly HTML semantic to write e2e ui tests. Every element has good selector.

The e2e ui test submitted is quite comprehensive, yet there are different test cases yet to be implemented.With further addition of test cases I would like to make a common test support code more reusable. Maybe usage of Cypress custom command would be a good idea, but it's easier to create those as test coverage evolves.

I guess, there is a space for improvements for the fixtures: users, salons, addresses, card details etc. Some fixtures could be more flexible.

Tests uses https://testmail.app for emails verification. On the submission of this test exercise it still has 60 free mails to be received, means test can still verify emails.

Unfortunately, I couldn't test much of payments as all testing cards of Stripe are accepted, no 3DS, failed transactions happened.