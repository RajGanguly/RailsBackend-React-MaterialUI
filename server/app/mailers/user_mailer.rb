class UserMailer < ApplicationMailer

  def dispatch_email(email)
    subject = "DirectShifts Demo"
    body = "
      <html>
        <head>
        <style>
        table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }
        </style>
        </head>
        <body>
          <table>
            <div>
              Hello, this is an email from DirectShifts
            </div
        </body>
      </html>
    "
    mail(to: email, subject: subject, body: body, content_type: "text/html")
  end 
end
