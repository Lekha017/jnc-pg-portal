const sendEmail = async (to, subject, html) => {
  try {
    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name:
              process.env.BREVO_SENDER_NAME ||
              "Jyoti Nivas College Autonomous",
            email: process.env.BREVO_SENDER_EMAIL,
          },
          to: [
            {
              email: to,
            },
          ],
          subject,
          htmlContent: html,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();

      console.error(
        "Brevo email error:",
        response.status,
        errorData
      );

      throw new Error(
        `Brevo email failed with status ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Send email error:", error);
    throw error;
  }
};

export default sendEmail;