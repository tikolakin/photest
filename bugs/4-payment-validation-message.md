**Summary**
Incomplete payment validation user friendly message

**Steps to reproduce**
Navigate to payment step
Fill in 1111 in the zip code field (it's shorter then expected value)
Fill in rest of the payment fields with valid entries
4111 1111 1111 1111, 10/23, 999
Submit form

**Actual**
The payment error message contains useless information to the end user
![Alt text](./content/4-payment-validation-message.png)

**Actual**
Remove technical terms in the user error message.