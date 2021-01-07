module.exports = ({ fullName, phoneNumber, email, message }) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css?family=PT+Serif:400,400i,700,700i|Poppins:400,400i,700,700i"
      rel="stylesheet"
    />
    <!--<![endif]-->
    <title>Email Template</title>
    <!--[if gte mso 9]>
      <style type="text/css" media="all">
        sup {
          font-size: 100% !important;
        }
      </style>
    <![endif]-->

    <style type="text/css" media="screen">
      /* Linked Styles */
      body {
        padding: 0 !important;
        margin: 0 !important;
        display: block !important;
        min-width: 100% !important;
        width: 100% !important;
        background: #ffffff;
        -webkit-text-size-adjust: none;
      }
      a {
        color: #0000ee;
        text-decoration: none;
      }
      p {
        padding: 0 !important;
        margin: 0 !important;
      }
      img {
        -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */
      }
      .mcnPreviewText {
        display: none !important;
      }

      /* Mobile styles */
      @media only screen and (max-device-width: 480px),
        only screen and (max-width: 480px) {
        .mobile-shell {
          width: 100% !important;
          min-width: 100% !important;
        }
        .bg {
          background-size: 100% auto !important;
          -webkit-background-size: 100% auto !important;
        }

        .text-header,
        .m-center {
          text-align: center !important;
        }

        .center {
          margin: 0 auto !important;
        }
        .container {
          padding: 20px 10px !important;
        }

        .td {
          width: 100% !important;
          min-width: 100% !important;
        }

        .m-br-15 {
          height: 15px !important;
        }
        .p30-15 {
          padding: 30px 15px !important;
        }
        .p0-15-30 {
          padding: 0px 15px 30px 15px !important;
        }
        .p0-15 {
          padding: 0px 15px !important;
        }
        .mpb30 {
          padding-bottom: 30px !important;
        }
        .mpb15 {
          padding-bottom: 15px !important;
        }

        .m-td,
        .m-hide {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          font-size: 0 !important;
          line-height: 0 !important;
          min-height: 0 !important;
        }

        .m-block {
          display: block !important;
        }

        .fluid-img img {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
        }

        .column,
        .column-dir,
        .column-top,
        .column-empty,
        .column-empty2,
        .column-dir-top {
          float: left !important;
          width: 100% !important;
          display: block !important;
        }

        .column-empty {
          padding-bottom: 30px !important;
        }
        .column-empty2 {
          padding-bottom: 10px !important;
        }

        .content-spacing {
          width: 15px !important;
        }
      }
    </style>
  </head>
  <body
    class="body"
    style="
      padding: 0 !important;
      margin: 0 !important;
      display: block !important;
      min-width: 100% !important;
      width: 100% !important;
      background: #ffffff;
      -webkit-text-size-adjust: none;
    "
  >
    <table
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
      bgcolor="#ffffff"
    >
      <tr>
        <td align="center" valign="top">
          <!-- Header -->
          <table
            width="100%"
            bgcolor="#e7f6fb"
            border="0"
            cellspacing="0"
            cellpadding="0"
          >
            <tr>
              <td align="center">
                <table
                  width="650"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  class="mobile-shell"
                >
                  <tr>
                    <td
                      class="td"
                      style="
                        width: 650px;
                        min-width: 650px;
                        font-size: 0pt;
                        line-height: 0pt;
                        padding: 0;
                        margin: 0;
                        font-weight: normal;
                      "
                    >
                      <!-- Header -->
                      <table
                        width="100%"
                        border="0"
                        cellspacing="0"
                        cellpadding="0"
                      >
                        <tr>
                          <td
                            class="p30-15 tbrr"
                            style="
                              padding: 30px 0px 40px 0px;
                              border-radius: 12px 12px 0px 0px;
                            "
                          >
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                            >
                              <tr>
                                <th
                                  class="column-top"
                                  width="145"
                                  style="
                                    font-size: 0pt;
                                    line-height: 0pt;
                                    padding: 0;
                                    margin: 0;
                                    font-weight: normal;
                                    vertical-align: top;
                                  "
                                >
                                  <table
                                    width="100%"
                                    border="0"
                                    cellspacing="0"
                                    cellpadding="0"
                                  >
                                    <tr>
                                      <td
                                        class="text center pb15"
                                        style="
                                          color: #00263e;
                                          font-family: 'Lucida Sans',
                                          'Lucida Sans Regular', Arial, sans-serif;
                                          font-size: 40px;
                                          line-height: 28px;
                                          text-align: center;
                                          padding-bottom: 15px;
                                        "
                                      >
                                        Angelopolis
                                      </td>
                                    </tr>
                                  </table>
                                </th>
                                <th
                                  class="column-empty2"
                                  width="1"
                                  style="
                                    font-size: 0pt;
                                    line-height: 0pt;
                                    padding: 0;
                                    margin: 0;
                                    font-weight: normal;
                                    vertical-align: top;
                                  "
                                ></th>
                                <th
                                  class="column"
                                  style="
                                    font-size: 0pt;
                                    line-height: 0pt;
                                    padding: 0;
                                    margin: 0;
                                    font-weight: normal;
                                  "
                                ></th>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!-- END Header -->

                      <!-- CTA -->
                      <table
                        width="100%"
                        border="0"
                        cellspacing="0"
                        cellpadding="0"
                      >
                        <tr>
                          <td
                            class="p30-15"
                            style="padding: 60px 40px 60px 40px"
                            bgcolor="#00263e"
                          >
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                            >
                              <tr>
                                <td
                                  class="h3 center pb15"
                                  style="
                                    color: #fff;
                                    font-family: 'Lucida Sans',
                                      'Lucida Sans Regular', Arial, sans-serif;
                                    font-size: 22px;
                                    line-height: 32px;
                                    text-align: center;
                                    padding-bottom: 25px;
                                  "
                                >
                                  ${fullName} the mando este mensaje:
                                </td>
                              </tr>
                              <tr>
                                <td
                                  class="text center pb15"
                                  style="
                                    color: #fff;
                                    font-family: 'Lucida Sans',
                                      'Lucida Sans Regular', Arial, sans-serif;
                                    font-size: 15px;
                                    line-height: 28px;
                                    text-align: center;
                                    padding-bottom: 15px;
                                  "
                                >
                                ${message}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td class="pb40" style="padding-bottom: 40px"></td>
                        </tr>
                      </table>
                      <!-- END CTA -->

                      <!-- CTA / Secondary -->
                      <table
                        width="100%"
                        border="0"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#cedc00"
                      >
                        <tr>
                          <td
                            class="p0-15-30"
                            style="padding: 20px 40px 50px 40px"
                          >
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                            >
                              <tr>
                                <td
                                  class="h3 center pb15"
                                  style="
                                    color: #00263e;
                                    font-family: 'Lucida Sans',
                                      'Lucida Sans Regular', Arial, sans-serif;
                                    font-size: 22px;
                                    line-height: 32px;
                                    text-align: center;
                                    padding-bottom: 15px;
                                  "
                                >
                                  Los detalles de contacto son los siguientes:
                                </td>
                              </tr>
                              <tr>
                                <td
                                  class="text center pb15"
                                  style="
                                    color: #00263e;
                                    font-family: 'Lucida Sans',
                                      'Lucida Sans Regular', Arial, sans-serif;
                                    font-size: 25px;
                                    line-height: 28px;
                                    text-align: center;
                                    padding-bottom: 15px;
                                  "
                                >
                                  ${email}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  class="center"
                                  style="
                                    font-family: 'Lucida Sans',
                                      'Lucida Sans Regular', Arial, sans-serif;
                                    font-size: 25px;
                                    line-height: 28px;
                                    text-align: center;
                                    color: #00263e;
                                  "
                                >
                                  ${phoneNumber}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            class="h3 center pb15"
                            style="
                              color: #00263e;
                              font-family: 'Lucida Sans', 'Lucida Sans Regular',
                                Arial, sans-serif;
                              font-size: 32px;
                              line-height: 32px;
                              text-align: center;
                              padding-bottom: 15px;
                            "
                          >
                            Contactalos!
                          </td>
                        </tr>
                        <tr>
                          <td
                            height="1"
                            bgcolor="#00263e"
                            class="img"
                            style="
                              font-size: 0pt;
                              line-height: 0pt;
                              text-align: left;
                            "
                          >
                            &nbsp;
                          </td>
                        </tr>

                        <tr>
                          <td style="padding-top: 40px"></td>
                        </tr>
                      </table>
                      <!-- END CTA / Secondary -->
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!-- END Header -->
        </td>
      </tr>
    </table>
  </body>
</html>

  `;
};
