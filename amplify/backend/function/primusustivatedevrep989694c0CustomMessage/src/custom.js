exports.handler = async (event, context) => {
    if (event.triggerSource === 'CustomMessage_SignUp') {
      event.response.emailSubject = "Welcome to Sustivate! Confirm Your Account";
  
      event.response.emailMessage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sustivate Email Verification</title>
            <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.2.2/dist/css/bootstrap.css">
            <style>
                body {
                    background-color: #F9F9F9;
                    padding-right: 10px;
                    padding-left: 10px;
                }
                .content {
                    background-color: #FFFFFF;
                    border-color: #E5E5E5;
                    border-style: solid;
                    border-width: 0 1px 1px 1px;
                    max-width: 600px;
                    width: 100%;
                    height: auto;
                    margin-top: 60.5px;
                    margin-bottom: 31px;
                    border-top: solid 3px #773CAA;
                    text-align: center;
                    padding: 30px;
                }
                h1 {
                    padding-bottom: 5px;
                    color: #6A2AA2;
                    font-family: Poppins, Helvetica, Arial, sans-serif;
                    font-size: 28px;
                    font-weight: 400;
                    line-height: 36px;
                    text-align: center;
                }
                h2 {
                    margin-bottom: 20px;
                    color: #999;
                    font-family: Poppins, Helvetica, Arial, sans-serif;
                    font-size: 16px;
                    font-weight: 300;
                    line-height: 24px;
                    text-align: center;
                }
                p {
                    font-size: 14px;
                    margin: 0px 21px;
                    color: #666;
                    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
                    font-weight: 300;
                    line-height: 22px;
                    margin-bottom: 40px;
                }
                a.validate-link {
                    color: #8E2DE2;
                    font-weight: 400;
                    text-decoration: none;
                    font-family: Poppins, Helvetica, Arial, sans-serif;
                }
                .btn-primary {
                    background: #8E2DE2;
                    background: linear-gradient(to right, #8E2DE2, #4A00E0);
                    border: none;
                    font-family: Poppins, Helvetica, Arial, sans-serif;
                    font-weight: 200;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    text-decoration: none;
                }
                footer {
                    max-width: 600px;
                    width: 100%;
                    padding-top: 50px;
                    text-align: center;
                    background-color: #F7F7F7;
                    height: 150px;
                }
                small {
                    color: #bbb;
                    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 20px;
                    margin-bottom: 5px;
                    display: block;
                }
                small:last-child {
                    margin-top: 20px;
                }
                a {
                    color: #bbb;
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="d-flex align-items-center justify-content-center">
                <div class="content">
                    <h1>Sustivate</h1>
                    <h2>Verify Your Email Account</h2>
                    <p>Thank you for creating your account on Sustivate!<br/>
                    Please copy the verification code below to validate your account.</p>
                    <p><b>Your verification code is ${event.request.codeParameter}</b></p>
                    <h2>Validate your account on Sustivate:</h2>
                    <a href="https://sustivate.com/validate" class="validate-link">https://sustivate.com/validate</a>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-center">
                <footer>
                    <small>Sustivate.com | Powered by Prim-U.com</small>
                    <small>If you have any questions, please contact us
                        <a href="mailto:info@sustivate.com" target="_blank">info@sustivate.com</a>
                    </small>
                </footer>
            </div>
        </body>
        </html>
      `;
    }
    
    if (event.triggerSource === 'CustomMessage_InviteUser') {
      const username = event.request.userAttributes['email'];
      const tempPassword = event.request.codeParameter;
  
      event.response.emailSubject = "Welcome to Sustivate! Your Account Invitation";
  
      event.response.emailMessage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sustivate Account Invitation</title>
            <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.2.2/dist/css/bootstrap.css">
            <style>
                body {
                    background-color: #F9F9F9;
                    padding-right: 10px;
                    padding-left: 10px;
                }
                .content {
                    background-color: #FFFFFF;
                    border-color: #E5E5E5;
                    border-style: solid;
                    border-width: 0 1px 1px 1px;
                    max-width: 600px;
                    width: 100%;
                    margin-top: 60.5px;
                    margin-bottom: 31px;
                    border-top: solid 3px #773CAA;
                    text-align: center;
                    padding: 100px 0px 0px;
                }
                h1 {
                    padding-bottom: 5px;
                    color: #6A2AA2;
                    font-family: Poppins, Helvetica, Arial, sans-serif;
                    font-size: 28px;
                    font-weight: 400;
                    line-height: 36px;
                    text-align: center;
                }
                h2 {
                    margin-bottom: 30px;
                    color: #999;
                    font-family: Poppins, Helvetica, Arial, sans-serif;
                    font-size: 16px;
                    font-weight: 300;
                    line-height: 24px;
                    text-align: center;
                }
                p {
                    font-size: 14px;
                    margin: 0px 21px;
                    color: #666;
                    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
                    font-weight: 300;
                    line-height: 22px;
                    margin-bottom: 40px;
                }
                .btn-primary {
                    background: #8E2DE2;
                    background: linear-gradient(to right, #8E2DE2, #4A00E0);
                    border: none;
                    font-family: Poppins, Helvetica, Arial, sans-serif;
                    font-weight: 200;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    text-decoration: none;
                }
                footer {
                    max-width: 600px;
                    width: 100%;
                    padding-top: 50px;
                    text-align: center;
                    background-color: #F7F7F7;
                    height: 150px;
                }
                small {
                    color: #bbb;
                    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 20px;
                    margin-bottom: 5px;
                    display: block;
                }
                small:last-child {
                    margin-top: 20px;
                }
                a {
                    color: #bbb;
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="d-flex align-items-center justify-content-center">
                <div class="content">
                    <h1>Sustivate</h1>
                    <h2>Your Account Invitation</h2>
                    <p>Hi ${username},<br/>We're excited to have you as part of Sustivate!</p>
                    <p>Here are your account details:</p>
                    <ul>
                        <li>Username: ${username}</li>
                        <li>Temporary Password: ${tempPassword}</li>
                    </ul>
                    <p>Please use the above credentials to log in and set up your new password.</p>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-center">
                <footer>
                    <small>Sustivate.com | Powered by Prim-U.com</small>
                    <small>If you have any questions, please contact us
                        <a href="mailto:info@sustivate.com" target="_blank">info@sustivate.com</a>
                    </small>
                </footer>
            </div>
        </body>
        </html>
      `;
    }
  
    return event;
  };
  